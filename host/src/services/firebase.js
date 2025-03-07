const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require("../assets/dbkey.json");


if (!serviceAccount) {
  console.error('Firebase service account not found');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://warlockmmo-45f22-default-rtdb.firebaseio.com'
});

const db = admin.database();

class FirebaseService {
  constructor(collectionPath) {
    this.ref = db.ref(collectionPath);
  }

  // Create a new record
  async create(data) {
    try {
      const newRef = this.ref.push();
      await newRef.set(data);
      return { id: newRef.key, ...data };
    } catch (error) {
      console.error('Error creating record:', error);
      throw error;
    }
  }

  // Create a new record without saving
  createUnsaved(data) {
    try {
      const newRef = this.ref.push();
      data.id = newRef.key
      return { save: () => newRef.set(data), data };
    } catch (error) {
      console.error('Error creating record:', error);
      throw error;
    }
  }

  // Read a single record by ID
  async getById(id) {
    try {
      const snapshot = await this.ref.child(id).once('value');
      const data = snapshot.val();
      return data ? { id, ...data } : null;
    } catch (error) {
      console.error('Error getting record:', error);
      throw error;
    }
  }

  // Read all records
  async getAll() {
    try {
      const snapshot = await this.ref.once('value');
      const data = snapshot.val();
      return data
        ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
        : [];
    } catch (error) {
      console.error('Error getting all records:', error);
      throw error;
    }
  }

  // Update a record
  async update(id, data) {
    try {
      await this.ref.child(id).update(data);
      return { id, ...data };
    } catch (error) {
      console.error('Error updating record:', error);
      throw error;
    }
  }

  // Delete a record
  async delete(id) {
    try {
      await this.ref.child(id).remove();
      return true;
    } catch (error) {
      console.error('Error deleting record:', error);
      throw error;
    }
  }

  // Push data directly to reference path
  async push(data) {
    try {
      await this.ref.set(data);
      return data;
    } catch (error) {
      console.error('Error pushing data:', error);
      throw error;
    }
  }

  // Read data at current reference
  async read() {
    try {
      const snapshot = await this.ref.once('value');
      return snapshot.val();
    } catch (error) {
      console.error('Error reading data:', error);
      throw error;
    }
  }

  // Query records by field
  async queryByField(field, value) {
    try {
      const snapshot = await this.ref
        .orderByChild(field)
        .equalTo(value)
        .once('value');
      const data = snapshot.val();
      return data
        ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
        : [];
    } catch (error) {
      console.error('Error querying records:', error);
      throw error;
    }
  }
  // Check if reference path is empty
  async isEmpty() {
    try {
      const snapshot = await this.ref.once('value');
      return !snapshot.exists();
    } catch (error) {
      console.error('Error checking if empty:', error);
      throw error;
    }
  }
}

module.exports = FirebaseService;