import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddContact.css';

const AddContact = ({ addContact }) => {
    const [contact, setContact] = useState({ name: '', email: '', phone: '' });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', contact.name);
        formData.append('email', contact.email);
        formData.append('phone', contact.phone);
        if (image) {
            formData.append('image', image);
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5002/api/contacts', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            const data = await response.json();

            setContact(data.contacts);

            if (!response.ok) {
                throw new Error('Error en la creación del contacto');
            }

            alert('Contacto creado exitosamente');
            setContact({ name: '', email: '', phone: '' });
            setImage(null);
            navigate('/home');

        } catch (error) {
            console.error('Error al crear contacto:', error);
            alert('Error al crear el contacto');
        }

    };
    return (
        <div className="create-contact-container">
            <div className="create-contact-form-wrapper">
                <h2>Crear Contacto</h2>
                <form
                    className="create-contact-form"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={contact.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={contact.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            name="phone"
                            value={contact.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Imagen:</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>
                    <button className="create-contact-button" type="submit">
                        Crear Contacto
                    </button>
                </form>
            </div>
        </div>
    );
};
export default AddContact;
