import mongoose from 'mongoose';

/**
 * Modèle Vote (Urne électronique)
 * Contient les bulletins anonymisés.
 * 
 * RÈGLE DE SÉCURITÉ & SECRET DU VOTE :
 * Cette collection ne contient JAMAIS le champ userId.
 * Il est impossible de relier un bulletin à l'identité de l'étudiant.
 */
const voteSchema = new mongoose.Schema(
  {
    electionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Election',
      required: [true, 'L\'identifiant de l\'élection est obligatoire'],
      index: true,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: [true, 'L\'identifiant du candidat est obligatoire'],
      index: true,
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

// Index composé pour optimiser les requêtes d'agrégation (décompte des voix par candidat)
voteSchema.index({ electionId: 1, candidateId: 1 });

const Vote = mongoose.model('Vote', voteSchema);
export default Vote;
