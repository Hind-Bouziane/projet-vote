import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    matricule: {
      type: String,
      required: [true, 'Le matricule est obligatoire'],
      unique: true,
      trim: true,
      uppercase: true,
      index: true, // Index unique visible dans Compass
    },
    nom: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true,
    },
    prenom: {
      type: String,
      required: [true, 'Le prénom est obligatoire'],
      trim: true,
    },
    filiere: {
      type: String,
      trim: true,
      default: '',
    },
    classe: {
      type: String,
      trim: true,
      default: '',
    },
    passwordHash: {
      type: String,
      required: [true, 'Le mot de passe haché est obligatoire'],
    },
    role: {
      type: String,
      enum: ['admin', 'student'],
      default: 'student',
      required: true,
    },
    mustChangePassword: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // génère createdAt et updatedAt
    toJSON: {
      // Règle de sécurité stricte : ne JAMAIS renvoyer le passwordHash
      transform: (doc, ret) => {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Méthode pour vérifier le mot de passe
userSchema.methods.verifierMotDePasse = async function (candidatMotDePasse) {
  return bcrypt.compare(candidatMotDePasse, this.passwordHash);
};

// Méthode statique pour hacher un mot de passe
userSchema.statics.hacherMotDePasse = async function (motDePasseClair) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(motDePasseClair, salt);
};

const User = mongoose.model('User', userSchema);
export default User;
