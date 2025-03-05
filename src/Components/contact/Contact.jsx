import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact = ({ contact = {} }) => {
  const { name, ultima_conexion, thumbnail } = contact;

  const imageSrc = thumbnail
    ? (thumbnail.startsWith('data:image') ? thumbnail : `data:image/jpeg;base64,${thumbnail}`)
    : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2NjYyI+PC9yZWN0Pjwvc3ZnPg==";

  console.log("Thumbnail:", imageSrc);

  return (
    <div className="contact-item">
      <Link
        to={`/chat/${contact.id}`}
        className="contact-link"
        onClick={() => console.log("ID seleccionado:", contact.id)}>
        <div className="contact-info">
          <img src={imageSrc} alt={name || "Contacto"} className="contact-thumbnail" />
          <div className="contact-name">{name}</div>
        </div>
      </Link>
      <div className="last-seen">{ultima_conexion} </div>
    </div>
  );
};

export default Contact;
