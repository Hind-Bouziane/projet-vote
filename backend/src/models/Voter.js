import mongoose from 'mongoose';

/**
 * Modèle Voter (Registre d'émargement)
 * Enregistre uniquement QUI a participé à quel scrutin.
 * 
 * RÈGLE NOSQL FONDAMENTALE :
 * L'index unique composé { electionId: 1, userId: 1 } garantit
 * au niveau du moteur MongoDB qu'un étudiant ne peut voter qu'une seule fois.
 * Il n'y a AUCUN lien ici avec le choix ou le candidat voté !
 */
const voterSchema = new mongoose.Schema(
  {
    electionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Election',
      required: [true, 'L\'identifiant de l\'élection est obligatoire'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'L\'identifiant de l\'utilisateur est obligatoire'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

// Index composé UNIQUE : bloque tout doublon au niveau de MongoDB (Erreur E11000)
voterSchema.index({ electionId: 1, userId: 1 }, { unique: true });

const Voter = mongoose.model('Voter', voterSchema);
export default Voter;
