
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Header from "../../components/header";
import Message from "../../components/message/Message";
import { io } from "socket.io-client";
import "./messenger.css";
import { ArrowDown } from "../../svg";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [messages, setMessages] = useState(null);
  const socket = useRef(io(process.env.SOCKET_URL));
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notification, setNotification] = useState([]);

  const scrollRef = useRef();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    socket.current = io(process.env.SOCKET_URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  console.log(arrivalMessage);
  useEffect(() => {
    arrivalMessage && currentChat?.members?.includes(arrivalMessage.sender)
      ? setMessages((prev) => [...prev, arrivalMessage])
      : setNotification("new message recieved....");
  }, [arrivalMessage, currentChat]);
  console.log(notification);
  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings?.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getConversation/${user.id}`
        );

        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getMessage/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const recieverId = currentChat.members.find((member) => member !== user.id);

    socket.current.emit("sendMessage", {
      senderId: user.id,
      recieverId,
      text: newMessage,
    });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/message`,
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const enterKey = (event) => {
    if (event.key === "Enter" && event.code !== "ShiftRight") {
      event.preventDefault();
      handleSubmit();
    }
  };
  return (
    <>
      <Header
        page={"messenger"}
        notification={notification}
        setNotification={setNotification}
      />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="search your friend"
              className="chatMenuInput"
            />
            {conversations.map((c, i) => (
              <div key={i} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                {/* <div className="chatHeader">
                  <img
                    className="messageImg"
                    src="https://www.menshairstyletrends.com/wp-content/uploads/2020/12/thebarbercole-medium-length-pompadour-haircut-for-men-998x1024.jpg"
                    alt=""
                  />
                  <span>hhh</span>
                  <div className="circle_icon">
                    <ArrowDown />
                  </div>
                </div> */}
                <div className="chatBoxTop">
                  {messages.map((m, i) => (
                    <div key={i} ref={scrollRef}>
                      <Message message={m} own={m.sender === user.id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="type someting...."
                    className="chatMessageInput"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    onKeyPress={(e) => enterKey(e)}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <img src="../images/robot.gif" alt="" />
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user.id}
              // onClick={(id) => getChat(id)}
              setCurrentChat={setCurrentChat}
              user={user}
            />
          </div>
        </div>
      </div>
    </>
  );
}
