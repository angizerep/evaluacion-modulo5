# evaluacion-modulo5

## Descripción del proyecto
Esta pequeña aplicación permite:
- Registrar usuarios con **nombre**, **edad** y **ciudad** usando un formulario web o directamente desde postmanen (en el repo está la colección).
- Guardar cada registro en un archivo JSON (`data/registros.json`) la cual simula ser una base de datos.
- Mostrar un mensaje personalizado de bienvenida al registrar el usuario (por ejemplo: “Hola Luis de Bogotá, tienes 17 años. Eres menor de edad.”).
- Visualizar el historial de registros en pantalla, ordenado de más reciente a más antiguo.

## Tecnologías utilizadas
- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS, JavaScript
- **Persistencia/BD**: Archivo JSON (lectura/escritura creado con `fs`)
- **Herramientas**: npm (scripts en `package.json`), VSCode (desarrollo)

## Estructura de carpetas
```
evaluacion-modulo5/
├── data/
│   └── registros.json       # Almacén de datos (array de objetos)
├── public/
│   ├── index.html           # Formulario y presentación de registros
│   ├── style.css            # Estilos del formulario
│   └── main.js              # Lógica de envío (POST) y carga (GET)
├── routes/
│   └── usuarios.js          # Rutas REST: POST /usuarios, GET /usuarios
├── server.js                # Configuración de Express
├── package.json             # Dependencias y scripts de inicio
└── README.md                # Documentación del proyecto
```

## Flujo de datos: del formulario al JSON
1. El usuario completa el formulario en `public/index.html` con **nombre**, **edad** y **ciudad**.
2. `public/main.js` es el encargado de capturar el evento `submit` y envía:
   ```js
   fetch('/usuarios', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ nombre, edad, ciudad })
   })
   ```
3. El servidor Express (en `routes/usuarios.js`) procesa la petición:
   - Valida que todos los campos estén completos y que `edad` sea un número positivo.
   - Lee `data/registros.json`, añade un objeto `{ nombre, edad, ciudad, fecha: ISO }`.
   - Escribe el JSON actualizado.
   - Devuelve `{ mensaje }` con saludo personalizado.
4. El frontend muestra el mensaje y recarga el historial con:
   ```js
   fetch('/usuarios')
   ```
   - Ordena los registros por fecha descendente.
   - Aplica scroll interno si la lista es muy larga.

## Validaciones implementadas
- **Campos obligatorios**: nombre, edad, ciudad.
- **Edad**: debe ser un número entero positivo.
- En caso de fallo, devuelve **HTTP 400** con mensaje de error.

## ¿Qué aprendí?
- Configurar un servidor REST con **Express.js**.
- Leer y escribir en un archivo JSON para simular almacenamiento de datos cual DB.
- Utilizar la **Fetch API** para interactuar cliente–servidor.
- Manipulación básica del DOM para mostrar mensajes y listas dinámicas.
- Aplicar estilos CSS y controlar scroll en un contenedor.

## ¿Qué mejoraría?
1. Separar la lógica en módulos de **routers**, **controladores** y **servicios** para mejor organización.
2. Añadir **tests** unitarios e integración.
3. Sustituir el JSON por una **base de datos real** (por ejemplo MongoDB).
4. Implementar un manejo centralizado de **errores** y respuestas.
5. Mejorar la **experiencia de usuario** con validaciones en cliente y feedback visual.
6. Implementar validaciones de seguridad con token, roles y permisos.