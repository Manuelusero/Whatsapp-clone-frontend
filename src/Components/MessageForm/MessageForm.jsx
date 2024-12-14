import React, { useState } from "react";
import "./MessageForm.css";

const MessageForm = ({ handleSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      handleSubmit(event, inputValue);
      setInputValue("");
    }
  };
  return (
    <form className="write-message" onSubmit={onSubmit}>
      <div className="content-input">
        <i className="bi bi-emoji-smile icono-emoji"></i>

        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Mensaje"
        ></input>

        <button className="btn-adjunt" type="button">
          <i className="bi bi-paperclip"></i>
          <i className="bi bi-camera"></i>
        </button>
      </div>
      <button className="btn-send" type="submit">
        <i className="bi bi-send-fill icono-enviar"></i>
      </button>
    </form>
  );
};

export default MessageForm;
