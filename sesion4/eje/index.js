const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

// Endpoint para la carga de archivos
app.post('/cargadearchivo', (req, res) => {
    console.log(req.files);
    console.log(req.body);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No se ha cargado ningún archivo.' });
    }

    // Archivo cargado
    const archivo = req.files.archivo;
    
    const uploadPath = path.join(__dirname, 'uploads', archivo.name);

    // Guardar el archivo en la carpeta "uploads" (asegúrate de que esta carpeta exista)
    archivo.mv(uploadPath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al cargar el archivo.' });
        }

        res.status(200).json({ message: 'Archivo cargado exitosamente.', ruta: uploadPath });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
