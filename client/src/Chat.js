import React, { useState } from 'react';

// Chat UI
function Chat({socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");

    // asynchronous function because we want function to wait until message is sent to update array
    const sendMessage = async () => {
        if (currentMessage !== "") {
            // msg data gets passed to socket server
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + 
                ":" + 
                new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
        }
    }

    return (
        <div>
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">

            </div>
            <div className="chat-footer">
                <input 
                    type="text" 
                    placeholder="Type here"
                    onChange={(event) => { 
                        setCurrentMessage(event.target.value);
                    }} 
                />
                {/* Potentially use Material UI for buttons and other components??? */}
                <button onClick={sendMessage}>&#9658;</button> 
            </div>
        </div>
    );
}

export default Chat;