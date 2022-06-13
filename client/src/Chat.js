import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

// Chat UI
function Chat({socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    // asynchronous function because we want function to wait until message is sent to update array
    const sendMessage = async () => {
        if (currentMessage !== "") {
            // message data gets passed to socket server
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date().toLocaleTimeString({hour: '2-digit', minute:'2-digit'})
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    useEffect(() => { 
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                        // sets the correct author of messages sent in chatroom
                        <div 
                            className="message" 
                            id={username === messageContent.author ? "you" : "other"}>
                            
                            <div>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div> 
                            {/* Adds timestamp and author to sent messages */}
                                <div className="message-meta">
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </div>
                            </div>
                        </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input 
                    type="text"
                    value={currentMessage}
                    placeholder="Type here"
                    onChange={(event) => { 
                        setCurrentMessage(event.target.value);
                    }} 
                    // allows user to press 'enter' to send message instead of clicking it
                    onKeyPress={(event) => {event.key === "Enter" && sendMessage();
                }}
                />
                <button onClick={sendMessage}>&#9658;</button> 
            </div>
        </div>
    );
}

export default Chat;