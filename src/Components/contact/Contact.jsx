import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact = ({ contact = {} }) => {
  const { name, ultima_conexion, thumbnail } = contact;

  const imageSrc = thumbnail
    ? (thumbnail.startsWith('data:image') ? thumbnail : `data:image/jpeg;base64,${thumbnail}`)
    : "iconoguardado.avif";

  console.log("Thumbnail:", imageSrc);

  return (
    <div className="contact-item">
      <Link
        to={`/chat/${userId}/${contact.id}`}
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
