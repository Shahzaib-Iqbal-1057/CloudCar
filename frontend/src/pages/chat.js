import React from 'react'
import '../styles/chat.css'


const Chat = ({socket}) => {

    const [messages, setMessages] = React.useState([])
    const [message, setMessage] = React.useState("")
    const person_to_chat = window.location.href.split('=')[1];

    const handleChange = (event) => {
        setMessage(event.target.value);
    }
    const handleKeyDown = (event) => {
        if(event.key === "Enter")
        {
            socket.emit("sendMessage", {to: person_to_chat, message: message});
            setMessage("");
            setMessages([...messages, {to: person_to_chat, message: message}]);
        }
    }

    React.useEffect(() => {
        socket.on("sendMessage", (data) => {
            setMessages([...messages, data]);
        })
    },[socket])

    React.useEffect(() => {
        socket.emit("getMessages", person_to_chat);
    },[])


  return (
    <div className = "right-side-container messages-container mt-5">
    <div className = "message-box ">
        
    </div>
    <input className="message-input-container border-none focus:outline-none bg-transparent" placeholder="Enter Message Here to Chat" value={message} onChange = {handleChange} onKeyDown = {handleKeyDown}>
    </input>
    </div>

  )
}

export default Chat