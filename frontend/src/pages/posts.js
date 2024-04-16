import React, { useState, useEffect } from "react";

<<<<<<< Updated upstream

function AddPost({socket}) {

=======
function AddPost(socket) {
>>>>>>> Stashed changes
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [selectedPostId, setSelectedPostId] = useState("");
  const [selectedPostId2, setSelectedPostId2] = useState("");

<<<<<<< Updated upstream

 
  
=======
  socket = io("http://localhost:3001", { transports: ["websocket"] });
  const allpostsfunction = () => {
    socket.emit("allposts");
  };

>>>>>>> Stashed changes
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      //socket = io('http://localhost:3001',{ transports: ["websocket"] });
      //alert(content)
      socket.emit("posts", content);
      setContent("");
      setSelectedPostId2("");
      setSelectedPostId("");
      socket.emit("allposts");
    } catch (error) {
      setMessage("There was an error posting it.");
      setTimeout(() => setMessage(""), 10000);
    }
  };

  socket.on("posts", (status) => {
    if (status === "success") {
      setMessage("Post submitted");
      setTimeout(() => window.location.reload(), 3000);
    } else {
      setMessage("There was an error posting it.");
      setTimeout(() => setMessage(""), 1);
      setTimeout(() => window.location.reload(), 3000);
    }
  });

  const handleLike = (postId) => {
    socket.emit("like", postId);
    socket.emit("allposts");
    window.location.reload();
  };

  const handleViewReplies = (postId) => {
    setReplies([]);
    setSelectedPostId2(postId);
    socket.emit("viewReplies", postId);
  };

<<<<<<< Updated upstream
  
=======
  socket.on("viewReplies", (data) => {
    if (data === "Noreplies") {
      window.location.href = "/posts";
      setReplies([]);
    } else {
      setReplies(data);
    }
  });
>>>>>>> Stashed changes

  useEffect(() => {
    socket.on("allposts", (data) => {
      setPosts(data);
    });
<<<<<<< Updated upstream
    socket.on("viewReplies",(data)=>{
      if(data === "Noreplies"){
          window.location.href = '/posts'
          setReplies([])
      }
      else{
          setReplies(data);
      }
      
  });
    return ()=>{
        socket.off("allposts")
        socket.off("viewReplies")
    }
},[socket]);

useEffect(()=>{
  socket.emit("allposts")
},[])


const handleReply = (postId) => {
=======
    return () => {
      socket.off("allposts");
    };
  }, [socket]);

  const handleReply = (postId) => {
>>>>>>> Stashed changes
    setShowReplyBox(true);
    setSelectedPostId(postId);
  };

  const handleSendReply = () => {
    try {
      socket.emit("posts2", replyContent, selectedPostId);
      setReplyContent("");
      setShowReplyBox(false);
      socket.emit("allposts");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      setMessage("There was an error in replying");
      setTimeout(() => setReplyContent(""), 1000);
    }
  };

<<<<<<< Updated upstream


=======
  allpostsfunction();
>>>>>>> Stashed changes

  return (
    <div className="">
      <nav className="flex justify-between bg-teal-600 text-black w-screen">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
          <a className="text-3xl font-bold font-heading" href="/ ">
            {/* <!-- <img className="h-9" src="logo.png" alt="logo"> --> */}
            CloudCar
          </a>
          {/* <!-- Nav Links --> */}
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            <li>
              <a className="hover:text-gray-200" href="how-it-works">
                How it Works
              </a>
            </li>

            <li>
              <a className="hover:text-gray-200" href="locations">
                Locations
              </a>
            </li>

            <li>
              <a className="hover:text-gray-200" href="about-us">
                About Us
              </a>
            </li>

            <li>
              <a className="hover:text-gray-200" href="posts">
                Disucssion Forum
              </a>
            </li>

            {/* <li><a className="hover:text-gray-200" href="#">Contact Us</a></li> */}
          </ul>
          {/* <!-- Header Icons --> */}
          <div className="hidden xl:flex items-center space-x-3 items-center">
            <a className="hover:text-gray-200" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </a>
            <a className="flex items-center hover:text-gray-200" href="#"></a>
            {/* <!-- View-my-profile      --> */}
            <a className="flex items-center hover:text-gray-200" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </div>
        </div>
        {/* <!-- Responsive navbar --> */}
        <a className="xl:hidden flex mr-6 items-center" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="flex absolute -mt-5 ml-4">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        </a>
        <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </a>
      </nav>

      <div className="dark-background relative w-screen min-h-screen bg-fixed bg-cover bg-center bg-gradient-to-b from-gray-900 to-black flex flex-col items-left">
        <div className="relative ml-10 mt-5">
          <form onSubmit={handleSubmit}>
            <textarea
              rows="4"
              className="block p-2.5 w-1/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post..."
            />
            <button
              type="submit"
              className="relative mt-5 hover:bg-teal-600 text-teal-600 font-semibold hover:text-white py-2 px-4 border border-teal-600 hover:border-transparent rounded"
            >
              Post
            </button>
          </form>
          {message && <p style={{ color: "green" }}>{message}</p>}
          <div style={{ marginBottom: "2em" }}></div>
          {posts.map((post) => (
            <div className="text-white" key={post.postId}>
              <p className="block p-2.5 w-1/6 text-sm text-black bg-teal-600 rounded-lg border border-black font-semibold">
                {post.userName}: {post.messageContent}
              </p>
              <p className="mt-5">Likes #: {post.likes}</p>
              <p className="mt-2.5 mb-5">Time: {new Date(post.dateTime).toLocaleString()}</p>

              {/* LIKE BUTTON */}
              <button
                onClick={() => handleLike(post.postId)}
                type="button"
                class="text-teal-600 border border-teal-600 hover:bg-teal-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-teal-600 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-teal-600 dark:text-teal-600 dark:hover:text-white dark:focus:ring-teal-600 dark:hover:bg-teal-600"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                </svg>
              </button>

        

              <button onClick={() => handleViewReplies(post.postId)} className="relative ml-5 mr-5 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  View Replies {' '}
                </span>
              </button>
              <button onClick={() => handleReply(post.postId)}>Reply </button>
              <div style={{ marginBottom: "2em" }}></div>
              {selectedPostId2 === post.postId &&
                replies &&
                replies.map((reply) => (
                  <div key={reply.postId} style={{ paddingLeft: "50px" }}>
                    <p>
                      {reply.userName}: {reply.messageContent}
                    </p>
                    <p>Likes: {reply.likes}</p>
                    <p>Time: {new Date(reply.dateTime).toLocaleString()}</p>
                    <button onClick={() => handleLike(reply.postId)}>
                      {" "}
                      {post.likedByCurrentUser ? "Unlike" : "Like"}{" "}
                    </button>
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
      </div>
    </div>
  );
}
export default AddPost;
