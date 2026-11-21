import mongoose from 'mongoose';

const electionSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, 'Le titre du scrutin est obligatoire'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    dateDebut: {
      type: Date,
      default: Date.now,
    },
    dateFin: {
      type: Date,
    },
    statut: {
      type: String,
      enum: ['brouillon', 'ouvert', 'clos'],
      default: 'brouillon',
      index: true, // Index simple pour filtrer rapidement dans Compass
    },
    eligibilite: {
      type: {
        type: String,
        enum: ['tous', 'filiere', 'classe'],
        default: 'tous',
      },
      valeur: {
        type: String,
        default: '',
      },
    },
    resultsPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Election = mongoose.model('Election', electionSchema);
export default Election;
