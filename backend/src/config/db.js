import mongoose from 'mongoose';
import { userJsonSchema, electionJsonSchema, voteJsonSchema } from './schemaValidators.js';

/**
 * Applique ou met à jour les règles $jsonSchema sur une collection MongoDB.
 * Cela permet à MongoDB Compass d'afficher directement les schémas
 * dans l'onglet "Validation" de chaque collection.
 */
async function applyValidationSchema(db, collectionName, validator) {
  try {
    const collections = await db.listCollections({ name: collectionName }).toArray();
    if (collections.length === 0) {
      // La collection n'existe pas encore : on la crée avec le validateur
      await db.createCollection(collectionName, {
        validator,
        validationLevel: 'moderate',
        validationAction: 'error',
      });
      console.log(`[MongoDB] Collection '${collectionName}' créée avec son validateur $jsonSchema`);
    } else {
      // La collection existe déjà : on applique collMod pour mettre à jour la validation
      await db.command({
        collMod: collectionName,
        validator,
        validationLevel: 'moderate',
        validationAction: 'error',
      });
      console.log(`[MongoDB] Validateur $jsonSchema mis à jour pour '${collectionName}'`);
    }
  } catch (error) {
    console.warn(`[MongoDB] Avertissement sur la validation de '${collectionName}':`, error.message);
  }
}

/**
 * Initialise la connexion Mongoose à MongoDB
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vote_emsi';

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[MongoDB] Connecté avec succès : ${conn.connection.host}/${conn.connection.name}`);

    // Application des validateurs $jsonSchema pour Compass
    const db = conn.connection.db;
    await applyValidationSchema(db, 'users', userJsonSchema);
    await applyValidationSchema(db, 'elections', electionJsonSchema);
    await applyValidationSchema(db, 'votes', voteJsonSchema);

    return conn;
  } catch (error) {
    console.error(`[MongoDB] Erreur de connexion : ${error.message}`);
    process.exit(1);
  }
}
