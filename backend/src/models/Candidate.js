import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema(
  {
    electionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Election',
      required: [true, 'L\'identifiant du scrutin est obligatoire'],
      index: true,
    },
    nom: {
      type: String,
      required: [true, 'Le nom du candidat est obligatoire'],
      trim: true,
    },
    photo: {
      type: String,
      default: '',
    },
    programme: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model('Candidate', candidateSchema);
export default Candidate;
