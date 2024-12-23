Clone WhatsApp

Este es mi proyecto final Full Stack, que combina React, Node.js, Express y MongoDB Atlas para replicar una versión funcional de WhatsApp.

Proceso de Desarrollo

1. Creación de los Componentes y Configuración Inicial del Frontend:

- Empecé dividiendo la aplicación en componentes, como el chat, la lista de contactos, y los formularios. Esto facilitó la organización del código.
- Implementé el estado con useEffect y persistencia de datos usando localStorage. Esto permite que los datos no se pierdan si la página se recarga.

2.  Desafíos en la Configuración del Backend:

- El backend fue construido con Node.js y Express. Configuré rutas para manejar autenticación, contactos, chats, y subida de imágenes.
- Una de las partes más desafiantes fue conectar las rutas de la API y asegurar que se comunicaran correctamente con el frontend.

3.  Subida de Imágenes:

- Para subir imágenes, utilicé la librería multer. Configuré un middleware que permite filtrar los formatos de imagen (JPEG, PNG, JPG) y ajustar el tamaño máximo del archivo. Aunque funciona, me di cuenta de que algunas imágenes tardan en cargarse correctamente en el frontend y a veces es necesario refrescar la página.

4.  Integración de MongoDB Atlas:

- Usé MongoDB Atlas como base de datos, donde almaceno usuarios, contactos, y mensajes. Configurar la conexión fue sencillo, pero trabajar con modelos y relaciones entre ellos tomó tiempo para adaptarlo a la lógica de la app.

5.  Estilo y Adaptabilidad:

- El diseño es responsive gracias a los media queries en CSS. Aseguré que la app se viera bien en dispositivos móviles y de escritorio.

Lo Más Complejo del Proyecto:

Lo más desafiante fue hacer que las rutas del backend y frontend se integraran correctamente, especialmente al manejar autenticación, subida de imágenes, y mostrar los contactos de manera dinámica. Fue un aprendizaje enorme para mejorar mi comprensión de cómo conectar ambas partes.

Funcionalidades Principales:

- Autenticación de Usuarios: Login y registro con JWT.
- Gestión de Contactos: Agregar y visualizar contactos desde el frontend.
- Chats: Crear nuevos chats con usuarios y mantener un registro de los mensajes.
- Subida de Imágenes: Subir imágenes para contactos con validación de formatos y tamaño.
- Base de Datos: MongoDB Atlas para almacenar datos de usuarios, contactos y mensajes.
