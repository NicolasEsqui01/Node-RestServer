// =======================
// Puerto 
// =======================
process.env.PORT = process.env.PORT || 3000;


// =======================
// Entorno
// =======================

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// =======================
// Base de datos
// =======================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI
};

process.env.URLDB = urlDB;


// =======================
// SEED de autenticacion
// =======================

process.env.SEED = process.env.SEED || "secret-Desarrollo";

// =======================
// Vencimiento del token
// =======================
// 60 segundos
// 60 minutos
// 24 horas 
// 30 dias

process.env.CADUCIDAD_TOKEN = '48h';

// =======================
// Google client Id
// =======================
process.env.CLIENT_ID = process.env.CLIENT_ID || '330606402947-98pkok1li4p1fm5gsc3bkdbt32bm8uq0.apps.googleusercontent.com';