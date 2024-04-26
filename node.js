const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;

const fs = require('fs');
const path = require('path');

// Sirviendo archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.static('./'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))




// Ruta principal que sirve tu HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/index.html'));
});

app.get('/Historias', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/Historias.html'));
});
app.get('/Procedimientos', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/Procedimientos.html'));
});
app.get('/Contacto', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/Contacto.html'));
});




app.get('/Testimonios', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/Testimonios.html'));
});
app.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/Login.html'));
});

// Ruta que recibe los datos del formulario
app.post('/Registro', (req, res) => {
    const { correo, pass } = req.body;
    const datos = {
        correo,
        pass
    };

    // Guardar datos en DatosRegistro.jjson
    fs.writeFile('DatosRegistro.json', JSON.stringify(datos, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al guardar los datos');
        }

        res.sendFile(path.join(__dirname, '/view/Login.html'));
    });
});




app.use(session({
    secret: 'SecretoPrueba',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // En producción, considera activar secure: true para HTTPS

}));

app.post('/Ingreso', (req, res) => {
    const { correo, pass } = req.body;
    const datos = {
        correo,
        pass
    };

    console.log(`Data recibida ${correo} y password ${pass}`);

    // Leer el archivo datos.json
    fs.readFile('DatosRegistro.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Ocurrió un error al leer el archivo:", err);
            return;
        }

        // Parsear los datos JSON
        let datosAlmacenados = JSON.parse(data);

        // Comparar los datos del archivo con las variables
        if (datosAlmacenados.correo === correo && datosAlmacenados.pass === pass) {
            console.log("Los datos coinciden.");
            //Se crea la sesión
            req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
            req.session.usuarioLogueado = correo;
            req.session.authenticated = true; // Marcar al usuario como autenticado
            //res.send(`Número de visitas: ${req.session.visits}, Usuario logueado: ${req.session.usuarioLogueado}`);
            //res.sendFile(path.join(__dirname, '/view/Perfil.html'));
            res.redirect('/Perfil');

        } else {
            console.log("Los datos no coinciden.");
            res.sendFile(path.join(__dirname, '/view/Login.html'));
        }
    });
});

// Middleware para verificar la autenticación antes de acceder a la página privada
const requireAuth = (req, res, next) => {
    if (req.session.authenticated) {
        next(); // Permitir el acceso si el usuario está autenticado

    } else {

        // Enviar una respuesta que el cliente pueda interpretar para redirigir
        console.log("Enviando a intermedia...");
        res.sendFile(path.join(__dirname, '/view/Intermedia.html'));
    }
}


app.get('/Perfil', requireAuth, (req, res) => {
    if (req.session && req.session.visits) {
        res.sendFile(path.join(__dirname, '/view/Perfil.html'))
    }
});
app.get('/sessionData', requireAuth, (req, res) => {
    if (req.session && req.session.visits) {
        res.json({ user: req.session.usuarioLogueado });
    } else {
        res.json({ user: 0 }); // En caso de que no haya datos
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Ocurrió un error al cerrar la sesión.');
        }
        res.send('Sesión cerrada con éxito.');
        // O redireccionar al inicio o a la página de login
        // res.redirect('/login');
    });
});


app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});



// Definir una ruta para enviar datos JSON
app.get('/datos', (req, res) => {
    // Especifica la ruta al archivo JSON
    const rutaArchivoJson = './BaseDeDatos.json';

    // Leer el archivo JSON de forma asíncrona
    fs.readFile(rutaArchivoJson, 'utf8', (err, data) => {
        if (err) {
            console.error("Ocurrió un error al leer el archivo:", err);
            res.status(500).send("Error al leer el archivo de datos.");
            return;
        }
        // Parsear el contenido del archivo como JSON y enviarlo
        res.json(JSON.parse(data));
    });
});