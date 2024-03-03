import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001");
const Socket = () => {
  const [message, setMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceiveMessage(data.message);
    });
  }, [socket]);

  return (
    <div>
      <h1>Socket</h1>
      <input
        type="text"
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h2>Message: {receiveMessage}</h2>
    </div>
  );
};

export default Socket;
