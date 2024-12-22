import React, { useEffect, useState } from "react";
import "./InfoContact.css";
import { Link, useParams } from "react-router-dom";


const InfoContact = () => {
  const { contactId } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`https://whatsapp-clone-backend-1-k6zk.onrender.com/api/contacts/${contactId}`, {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Valor de contactId:", contactId);
        console.log("ID en la URL:", contactId);
        if (!response.ok) {
          throw new Error("No se pudo obtener la información del contacto");
        }
        const data = await response.json();
        setContact(data);
      } catch (err) {
        console.error("Error al cargar el contacto:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [contactId]);


  if (loading) {
    return <div className="info-container">Cargando información del contacto...</div>;
  }


  if (error || !contact) {
    return <div className="info-container">No se pudo cargar la información del contacto</div>;
  }

  const imageSrc = contact.thumbnail
    ? (contact.thumbnail.startsWith('data:image') ? contact.thumbnail : `data:image/jpeg;base64,${contact.thumbnail}`)
    : "iconoguardado.avif";

  return (
    <div className="info-container">
      <div className="info-header-container">
        <div className="title-container">
          <Link to={`/chat/${contactId}`}>
            <i className="bi bi-arrow-left"></i>
          </Link>

        </div>
        <div className="image-container">
          <img src={imageSrc} alt="" className="image" />
        </div>
        <div className="name-container">{contact.name}</div>
        <div className="options-container">
          <div className="call-container">
            <i className="bi bi-telephone"></i>
            <span>Llamar</span>
          </div>
          <div className="video-container">
            <i className="bi bi-camera-video"></i>
            <span>Video</span>
          </div>
          <div className="search-container">
            <i className="bi bi-search"></i>
            <span>Buscar</span>
          </div>
        </div>
      </div>
      <div className="settings">
        <div className="settings-container">
          <div className="notifications-container">
            <i className="bi bi-bell"></i>
            <h4>Notificaciones</h4>
          </div>
          <div className="visibility-container">
            <i className="bi bi-card-image"></i>
            <h4>Visibilidad de archivos multimedia</h4>
          </div>
          <div className="security-container">
            <i className="bi bi-star"></i>
            <h4>Mensajes destacados</h4>
          </div>
        </div>
      </div>
      <div className="actions-container">
        <div className="add-to-favorites">
          <i className="bi bi-heart"></i>
          <p>Añadir a favoritos</p>
        </div>
        <div className="block-contact">
          <i className="bi bi-ban"></i>
          <p>Bloquear a este contacto</p>
        </div>
        <div className="report-contact">
          <i className="bi bi-hand-thumbs-down"></i>
          <p>Reportar a este contacto</p>
        </div>
      </div>
    </div>
  );
};

export default InfoContact;
