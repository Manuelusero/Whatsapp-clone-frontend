
import React, { useState, useEffect } from "react";
import "./ListContact.css";
import Contact from "../contact/Contact"

const ListContact = ({ contacts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    if (Array.isArray(contacts)) {
      const results = contacts.filter(
        (contact) =>
          contact &&
          contact.name &&
          contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(results);
    } else {
      console.error("El valor de contacts no es un array:", contacts);
      setFilteredContacts([]);
    }
  }, [searchTerm, contacts]);

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Buscar"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => {
          console.log("Contacto:", contact);
          return <Contact contact={contact} key={contact.id || contact._id} />;
        })
      ) : (
        <p>Agrega un contacto!</p>
      )}
    </div>
  );
};

export default ListContact;
