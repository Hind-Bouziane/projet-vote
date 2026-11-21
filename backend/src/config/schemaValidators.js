/**
 * Schémas de validation natifs MongoDB ($jsonSchema).
 * Ces règles sont appliquées au niveau de la base de données MongoDB
 * et sont directement visibles dans l'onglet "Validation" de MongoDB Compass.
 */

export const userJsonSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['matricule', 'nom', 'prenom', 'passwordHash', 'role'],
    properties: {
      matricule: {
        bsonType: 'string',
        description: 'Le matricule unique de l\'étudiant ou de l\'admin EMSI (requis)'
      },
      nom: {
        bsonType: 'string',
        description: 'Nom de famille (requis)'
      },
      prenom: {
        bsonType: 'string',
        description: 'Prénom (requis)'
      },
      filiere: {
        bsonType: 'string',
        description: 'Filière EMSI (ex: IIR, IFA, GC...)'
      },
      classe: {
        bsonType: 'string',
        description: 'Classe ou niveau (ex: 4IIR-G1, 5IIR-G2...)'
      },
      passwordHash: {
        bsonType: 'string',
        description: 'Empreinte bcrypt du mot de passe (requis)'
      },
      role: {
        enum: ['admin', 'student'],
        description: 'Rôle obligatoire : admin ou student'
      },
      mustChangePassword: {
        bsonType: 'bool',
        description: 'Indique si l\'utilisateur doit changer son mot de passe'
      },
      createdAt: {
        bsonType: 'date'
      }
    }
  }
};

export const electionJsonSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['titre', 'statut'],
    properties: {
      titre: {
        bsonType: 'string',
        description: 'Titre du scrutin électoral (requis)'
      },
      description: {
        bsonType: 'string',
        description: 'Description du scrutin'
      },
      dateDebut: {
        bsonType: 'date',
        description: 'Date de début du scrutin'
      },
      dateFin: {
        bsonType: 'date',
        description: 'Date de clôture du scrutin'
      },
      statut: {
        enum: ['brouillon', 'ouvert', 'clos'],
        description: 'Statut du scrutin : brouillon, ouvert ou clos'
      },
      eligibilite: {
        bsonType: 'object',
        description: 'Critères d\'éligibilité (filière, classe, ou tous)'
      },
      resultsPublished: {
        bsonType: 'bool',
        description: 'Indique si les résultats sont visibles des étudiants'
      },
      createdAt: {
        bsonType: 'date'
      }
    }
  }
};

export const voteJsonSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['electionId', 'candidateId'],
    properties: {
      electionId: {
        bsonType: 'objectId',
        description: 'Identifiant du scrutin (requis)'
      },
      candidateId: {
        bsonType: 'objectId',
        description: 'Identifiant du candidat choisi (requis)'
      },
      createdAt: {
        bsonType: 'date'
      }
    }
  }
};
