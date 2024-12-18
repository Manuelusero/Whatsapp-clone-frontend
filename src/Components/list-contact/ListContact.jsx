
import React, { useState, useEffect } from "react";
import "./ListContact.css";
import Contact from "../contact/Contact";

const ListContact = ({ contacts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);

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
      setFilteredContacts([]); // Asegúrate de no intentar mapear datos inválidos
    }
  }, [searchTerm, contacts]);
  // useEffect(() => {
  //   if(Array.isArray(contacts)){

  //   }
  //   const results =
  //     contacts.filter(contact =>
  //       contact && contact.name && contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   setFilteredContacts(results);
  // }, [searchTerm, contacts]);

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Buscar"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {filteredContacts.map((contact) => {
        console.log("Contacto:", contact);
        return <Contact contact={contact} key={contact.userId} />;
      })}
    </div>
  );
};

export default ListContact;
