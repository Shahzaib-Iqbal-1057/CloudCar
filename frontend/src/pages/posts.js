import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

function AddPost(socket) {

  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [selectedPostId, setSelectedPostId] = useState("");
  const [selectedPostId2, setSelectedPostId2] = useState("");


  socket = io('http://localhost:3001',{ transports: ["websocket"] });
  const allpostsfunction = () => {
    socket.emit("allposts")
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        //socket = io('http://localhost:3001',{ transports: ["websocket"] });
        //alert(content)
        socket.emit("posts", content);
        setContent("");
        setSelectedPostId2("")
        setSelectedPostId("")
        socket.emit("allposts")
    } catch (error) {
        setMessage("There was an error posting it.");
        setTimeout(() => setMessage(""), 10000); 
    }
    };


    socket.on("posts",(status)=>{
        if (status=== "success") {
            setMessage("Post submitted");
            setTimeout(() => window.location.reload(), 3000);  
        }
        else {
            setMessage("There was an error posting it.");
            setTimeout(() => setMessage(""), 1); 
            setTimeout(() => window.location.reload(), 3000);  
        }
    })


  const handleLike = (postId) => {
    socket.emit("like", postId);
    socket.emit("allposts");
    window.location.reload();

  };


  const handleViewReplies = (postId) => {
    setReplies([])
    setSelectedPostId2(postId);
    socket.emit("viewReplies", postId);
  };

  
    socket.on("viewReplies",(data)=>{
        if(data === "Noreplies"){
            window.location.href = '/posts'
            setReplies([])
        }
        else{
            setReplies(data);
        }
        
    });

  useEffect(() => {
    socket.on("allposts",(data)=>{
        setPosts(data);
    });
    return ()=>{
        socket.off("allposts")
    }
},[socket]);


const handleReply = (postId) => {
    setShowReplyBox(true);
    setSelectedPostId(postId);
  };

  const handleSendReply = () => {
    try {
        socket.emit("posts2", replyContent, selectedPostId);
        setReplyContent("");
        setShowReplyBox(false);
        socket.emit("allposts")
        setTimeout(() => window.location.reload(), 1000); 
    } catch (error) {
        setMessage("There was an error in replying");
        setTimeout(() => setReplyContent(""), 1000); 
    }
  };

allpostsfunction()


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post..."
        />
        <button type="submit">Post</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <div style={{ marginBottom: "2em" }}></div>
      {posts.map(post => (
        <div key={post.postId}>
          <p>{post.userName}: {post.messageContent}</p>
          <p>Likes: {post.likes}</p>
          <p>Time: {new Date(post.dateTime).toLocaleString()}</p>
          <button onClick={() => handleLike(post.postId)}> like </button>
          <button onClick={() => handleViewReplies(post.postId)}>View Replies </button>
          <button onClick={() => handleReply(post.postId)}>Reply </button>
          <div style={{ marginBottom: "2em" }}></div>
          {selectedPostId2 === post.postId && replies && replies.map(reply => (
            <div key={reply.postId} style={{ paddingLeft: "50px" }}>
              <p>{reply.userName}: {reply.messageContent}</p>
              <p>Likes: {reply.likes}</p>
              <p>Time: {new Date(reply.dateTime).toLocaleString()}</p>
              <button onClick={() => handleLike(reply.postId)}> {post.likedByCurrentUser ? 'Unlike' : 'Like' } </button>
              <div style={{ marginBottom: "2em" }}></div>
              <div style={{ marginBottom: "2em" }}></div>
            </div>
          ))}
        {showReplyBox && selectedPostId === post.postId && (
            <div>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
              />
              <button onClick={handleSendReply}>Send Reply</button>
              <div style={{ marginBottom: "2em" }}></div>
              <div style={{ marginBottom: "2em" }}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default AddPost;

