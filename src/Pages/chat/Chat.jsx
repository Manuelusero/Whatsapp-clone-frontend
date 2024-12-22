import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentChats from "../../Components/ContentChats/ContentChats";
import Message from "../../Components/Message/Message";
import MessageForm from "../../Components/MessageForm/MessageForm";
import "./Chat.css";


const Chat = () => {
  const { userId, contactId } = useParams();
  const [currentChat, setCurrentChat] = useState(null);
  const [memoryMsg, setMemoryMsg] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const fetchChat = async () => {
      console.log("Cargando el chat para el userId:", userId, contactId);
      try {
        let response = await fetch(`https://whatsapp-clone-backend-1-k6zk.onrender.com/api/chats/${userId}/${contactId}`, {
          credentials: 'include',
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          const { chat, contact } = jsonResponse;

          setCurrentChat({
            ...chat,
            name: contact?.name || chat.name,
            thumbnail: contact?.thumbnail || chat.thumbnail,
          });

          setMemoryMsg(chat.messages || []);
        } else if (response.status === 404) {
          console.log("Chat no encontrado, creando uno nuevo...");

          const newChat = await createChat(contactId);
          setCurrentChat(newChat);
          setMemoryMsg(newChat.messages || []);

        } else {
          throw new Error("Error al obtener el chat");
        }
      } catch (error) {
        console.error("Error al cargar el chat:", error.message);

        setCurrentChat({ name: "Error al cargar", thumbnail: "" });

      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [userId]);


  const createChat = async (contactId) => {
    console.log("Creando un chat vacío...", contactId);

    try {
      const response = await fetch("https://whatsapp-clone-backend-1-k6zk.onrender.com/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactId,
          userId,
        }),
      });
      console.log("Respuesta del servidor al crear el chat:", response);

      if (!response.ok) {
        console.error("Error al crear el chat, status:", response.status);
        throw new Error("Error al crear el chat");
      }
      const newChat = await response.json();
      console.log("Nuevo chat creado:", newChat);

      return {
        ...newChat,
        name: newChat.contact?.name || "Nuevo Chat",
        thumbnail: newChat.contact?.thumbnail || "https://via.placeholder.com/50", // Asignar imagen
      };


    } catch (error) {
      console.error("Error al crear el chat:", error.message);
      return { name: "Chat no disponible", thumbnail: "", messages: [] };
    }
  };


  const handleSubmit = async (e, textValue) => {
    e.preventDefault();

    const newMessage = {
      author: "yo",
      content: textValue,
      hour: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "enviado",
    };

    try {
      const response = await fetch(`https://whatsapp-clone-backend-1-k6zk.onrender.com/api/chats/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...memoryMsg, newMessage] }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      const updatedChat = await response.json();
      setMemoryMsg(updatedChat.messages);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error.message);
    }
    console.log("Datos del chat:", currentChat);

  };

  if (loading) {
    return <div className="chat-container">Cargando chat...</div>;
  }

  if (!currentChat) {
    return <div className="chat-container">Error al cargar el chat</div>;


  }

  return (
    <div className="chat-container">
      <ContentChats name={currentChat.name} thumbnail={currentChat.thumbnail} id={userId} />
      <div className="message-container">
        <Message memoryMsg={memoryMsg} />
      </div>
      <MessageForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default Chat;
