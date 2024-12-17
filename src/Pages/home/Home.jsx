import React, { useEffect, useState } from "react";
import "./Home.css";
import { ListContact } from "../../Components";
import { Link } from "react-router-dom";
import AddContact from "../../Components/AddContact/AddContact";


const Home = () => {
  const [contacts, setContact] = useState([]);


  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("https://whatsapp-clone-backend-1-k6zk.onrender.com/api/contacts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Error al cargar los contactos");
      }

      const data = await response.json();
      setContact(data.contacts || []);
    } catch (error) {
      console.error("Error al cargar contactos:", error);
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

