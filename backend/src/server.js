import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';

// Import des modèles pour garantir l'enregistrement des index Mongoose
import './models/User.js';
import './models/Election.js';
import './models/Candidate.js';
import './models/Voter.js';
import './models/Vote.js';
import './models/AuditLog.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares de sécurité et utilitaires
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration CORS pour autoriser le frontend avec cookies httpOnly
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Route de santé
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API Vote EMSI opérationnelle',
    timestamp: new Date().toISOString(),
  });
});

// Démarrage du serveur et connexion MongoDB
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`[VOTE-EMSI] Serveur backend démarré sur http://localhost:${PORT}`);
    });
  });
}

export default app;
