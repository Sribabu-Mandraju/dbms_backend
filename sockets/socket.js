// sockets/socketHandler.js

import { Server } from 'socket.io';

let players = [];
const socketHandler = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // console.log("a user ff connected");

    socket.on("scores", (scores) => {
      players.push(scores);
      console.log(players);
      // Broadcast the updated players list to all clients
      io.emit("updatePlayers", players);
    });

    // Example: Handle custom events logic here if needed
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  console.log(players)

  return io;
};

export default socketHandler;
