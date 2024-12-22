import React from "react";
import "./ContentChats.css";
import { Link, useParams } from "react-router-dom";

const ContentChats = ({ contact, id }) => {
  const { contactId } = useParams();
  return (
    <div className="content-chats">
      <div className="info-contact">
        <Link to="/home">
          <i className="bi bi-arrow-left"></i>
        </Link>
        <div className="img-container">
          <img src={contact.thumbnail} alt="user-pic" className="user-pic" />
        </div>
        <Link className="user-name-link" to={`/info-contact/${id}`}>
          <span className="user-name">{contact.name}</span>
        </Link>
        <div className="icons">
          <i className="bi bi-camera-video"></i>
          <i className="bi bi-telephone"></i>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>
    </div>
  );
};

export default ContentChats;
