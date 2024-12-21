import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/home/Home";
import Chat from "./Pages/chat/Chat";
import InfoContact from "./Pages/info-contact/InfoContact";
import Register from "./Pages/register/Register";
import Login from "./Pages/login/Login";
import VerifyAccount from "./Components/verifyAccount/VerifyAccount";
import AddContact from "./Pages/add-contact/AddContact";

// import PrivateRoute from "./helpers/PrivateRoute";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };
  return (
    <>
      <div className="">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/verify/:token" element={<VerifyAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home contacts={contacts} addContact={addContact} />} />
          <Route path="/add-contact" element={<AddContact addContact={(addContact)} />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/info-contact/:id" element={<InfoContact />} />
        </Routes>
      </div>
    </>
  );
};
export default App;
