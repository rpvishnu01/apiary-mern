
require('dotenv').config()

const io = require("socket.io")(9000, {
    cors: {
      origin:process.env.BASE_URL_SOCKET ,
    },
  });

 
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
     
      addUser(userId, socket.id);
      console.log("user connected");
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, recieverId, text }) => {
      const user = getUser(recieverId);
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });