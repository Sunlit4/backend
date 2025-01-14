import admin from "firebase-admin";
import config from "../config.js";

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
})

const db = admin.firestore();

class ContenedorFirebase{
    constructor(collectionName){
        this.collection = db.collection(collectionName);
    }

    async getAll(){
        try{
            const result = [];
            const snapshot = await this.collection.get();
            snapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
            });
            if(result.length > 0) {
            return result;
            }else{
                return false; // No se encontraron elementos
            }
        }catch(error){
            return error
        }
    }

    async deleteById(id) {
        try {
          const element = await this.getById(id);
          if (element === false) {
            return false; // No se encontró el elemento
          } else {
            const data = await this.getAll();
            if (data === false) {
              return null; // No se encontraron elementos
            } else {
              const doc = await this.collection.doc(id).delete();
              if (doc.empty) {
                return false;
              } else {
                return doc;
              }
            }
          }
        } catch (err) {
          return err;
        }
      }
}

export default ContenedorFirebase;