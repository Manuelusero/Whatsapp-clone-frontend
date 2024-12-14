import React from "react";
import "./Message.css";

const Message = ({ memoryMsg }) => {

  if (!memoryMsg || memoryMsg.length === 0) {
    return <p>No hay mensajes todavía.</p>;
  }

  return (
    <div className="message-container">
      {memoryMsg.map((msg) => (
        <div
          key={msg._id}
          className={msg.author === "yo" ? "message-right" : "message-left"}
        >
          <p>{msg.content}</p>
          <p className="message-hour">{msg.hour}</p>
        </div>
      ))}
    </div>
  );
};

export default Message;
