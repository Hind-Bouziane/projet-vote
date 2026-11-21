# Plateforme de Vote en Ligne EMSI (Projet NoSQL)

Plateforme web de vote électronique sécurisée, réservée aux étudiants de l'**EMSI**, développée avec une architecture MERN (MongoDB, Express, React, Node.js) et Mongoose.

## 🎯 Fonctionnalités Clés
- **Espace Étudiant** : Authentification stricte par matricule, consultation des scrutins selon l'éligibilité (filière/classe), vote anonyme à tour unique, consultation des résultats publiés.
- **Espace Administrateur** : Création et gestion des scrutins/candidats, import massif d'étudiants via fichier CSV, supervision de la participation en temps réel et publication des résultats.
- **Sécurité & Intégrité NoSQL** :
  - **Secret du vote** : Découplage strict entre l'identité des votants (`voters`) et les bulletins anonymes (`votes`).
  - **Unicité du vote** : Index unique composé `{ electionId: 1, userId: 1 }` empêchant tout double vote au niveau du moteur MongoDB.
  - **Validation native de schéma** : `$jsonSchema` validators intégrés dans MongoDB, vérifiables directement dans **MongoDB Compass**.

---

## 🛠️ Stack Technique
- **Base de données** : MongoDB 6+ / 7+ (local) & MongoDB Compass
- **ODM** : Mongoose 8
- **Back-end** : Node.js (ES Modules) + Express + JWT (cookie httpOnly) + Zod + bcryptjs
- **Front-end** : React 19 (Vite) + Tailwind CSS + React Router v7 + Axios + Lucide Icons

---

## 🚀 Démarrage Rapide

### 1. Prérequis
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) lancé sur `localhost:27017`
- [MongoDB Compass](https://www.mongodb.com/products/tools/compass)

### 2. Installation
```bash
# Installation de toutes les dépendances (racine, backend, frontend)
npm run install:all
```

### 3. Variables d'environnement
Créez le fichier `.env` dans `backend/` à partir de `backend/.env.example` :
```ini
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vote_emsi
JWT_SECRET=super_secret_jwt_key_emsi_2026_change_in_production
JWT_EXPIRES_IN=24h
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Et dans `frontend/` à partir de `frontend/.env.example` :
```ini
VITE_API_URL=http://localhost:5000/api
```

### 4. Peuplement initial (Seed)
```bash
# Initialise la base avec les index, les $jsonSchema, 1 admin et des étudiants de test
npm run seed
```

### 5. Lancement de l'application
```bash
# Lancement simultané du backend (port 5000) et du frontend (port 5173)
npm run dev
```

---

## 📁 Structure du Projet
- `/backend` : API REST, modèles Mongoose, validation $jsonSchema, middlewares JWT/RBAC.
- `/frontend` : Interface utilisateur React avec Tailwind CSS et gestion des sessions.
- `/data` : Jeux de données JSON/CSV importables directement dans MongoDB Compass.
- `/docs` : Guide MongoDB Compass et pipelines d'agrégation.
