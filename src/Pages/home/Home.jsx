import React, { useEffect, useState } from "react";
import "./Home.css";
import { ListContact } from "../../Components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AddContact from "../../Components/AddContact/AddContact";


const Home = () => {
  const [contacts, setContact] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay token disponible. Redirigiendo al login...");
      navigate('/login');
    } else {
      fetchContacts(token);
    }
  }, [navigate]);

  const fetchContacts = async (token) => {
    try {
      const response = await fetch("https://whatsapp-clone-backend-1-k6zk.onrender.com/api/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Error al cargar los contactos");
      }

      const data = await response.json();
      console.log("Datos recibidos de la API:", data);// Ver los datos recibidos agregado recien

      if (data && Array.isArray(data.contacts)) {
        setContact(data.contacts);
      } else {
        console.warn("La API no devolvió un array de contactos:", data);
        setContact([]);
      }
    } catch (error) {
      console.error("Error al cargar contactos:", error);
      setContact([]); // Evita un estado indefinido
    }
  };

  const handleAddContact = () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchContacts(token);
    }
  };


  return (
    <div className="home-container">
      <div className="home-title">
        WhatsApp
        <i className="bi bi-camera"></i>
        <Link to="/add-contact">
          <i className="bi bi-plus-circle"></i>
        </Link>
        <i className="bi bi-three-dots-vertical"></i>
      </div>
      <ListContact contacts={contacts} />
    </div>
  );
};

export default Home;

