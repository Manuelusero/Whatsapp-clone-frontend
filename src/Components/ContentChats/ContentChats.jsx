import React from "react";
import "./ContentChats.css";
import { Link } from "react-router-dom";

const ContentChats = ({ name, thumbnail, contactId }) => {
  console.log("contactId en ContentChats:", contactId);

  const imageSrc = thumbnail
    ? (thumbnail.startsWith('data:image') ? thumbnail : `data:image/jpeg;base64,${thumbnail}`)
    : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2NjYyI+PC9yZWN0Pjwvc3ZnPg==";

  return (
    <div className="content-chats">
      <div className="info-contact">
        <Link to="/home">
          <i className="bi bi-arrow-left"></i>
        </Link>
        <div className="img-container">
          <img src={imageSrc} alt="user-pic" className="user-pic" />
        </div>
        <Link className="user-name-link" to={`/info-contact/${contactId}`}>
          <span className="user-name">{name}</span>
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
