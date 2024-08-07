// socket.js
import io from "socket.io-client";

let socket;

export const connectSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      withCredentials: true,
      secure: true,
    });
    console.log("Connecting socket...");
  }
};

export const getSocket = () => {
  if (!socket) {
    console.log("Socket not connected");
    connectSocket();
  }
  return socket;
};
