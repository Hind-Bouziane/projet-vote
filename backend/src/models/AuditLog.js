import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: [true, 'L\'action est obligatoire'],
    },
    auteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  }
);

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
