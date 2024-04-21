import React from 'react'
import '../styles/chat.css'
import  getCookieValue from '../helpers.js'

const Chat = ({socket}) => {

    const [messages, setMessages] = React.useState([])
    const [message, setMessage] = React.useState("")
    const person_to_chat = window.location.href.split('=')[1];
    const myself = getCookieValue("email");

    const handleChange = (event) => {
        setMessage(event.target.value);
    }
    const handleKeyDown = (event) => {
        if(event.key === "Enter")
        {
            socket.emit("sendMessage", {sender: myself,receiver: person_to_chat, message: message});
            setMessage("");
            setMessages([...messages, {sender: myself,receiver: person_to_chat, message: message}]);
        }
    }
    console.log("person_to_chat", person_to_chat)
    console.log("myself", myself)
    React.useEffect(() => {
        const handleMessageReceive = (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        };
        socket.on("sendMessage", handleMessageReceive);
        socket.on("getMessages", (data) => {
            console.log("intial messages received : ", data)
            setMessages(data);
        });
        return () => {
            socket.off("sendMessage");
            socket.off("getMessages");
        }
    },[socket])
    React.useEffect(() => {
        console.log("getting messages : ", window.location.href.split('=')[1])
        socket.emit("getMessages", {user1 : window.location.href.split('=')[1], user2 : myself});
    },[])


  return (
    <div className='h-screen w-screen bg-gradient-to-br from-teal-900 to-teal-500'>
        <div className="flex flex-col items-center justify-center h-full w-full px-4">
            <div className="message-box w-full overflow-y-auto bg-teal bg-opacity-80 rounded-lg shadow p-4">
                {messages.slice().reverse().map((msg, index) => (
                    <div 
                    key={index} 
                    className={`text-white message-content-container ${msg.sender === myself ? "ml-auto float-right" : "mr-auto"} whitespace-normal max-w-full`}>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <input
                className="message-input-container w-full mt-4 p-3 rounded border-none focus:outline-none bg-transparent shadow text-white placeholder-white"
                placeholder="Enter Message Here to Chat"
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}>
            </input>
        </div>
    </div>


  )
}

export default Chat