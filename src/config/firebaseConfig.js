import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  getDoc,
  query,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  where,
  Timestamp,
  orderBy,
  limit
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);
const database = getFirestore();

// Guardar
export const guardarDatabase = async (nombreColeccion, data) => {
  try {
    const response = await addDoc(collection(database, nombreColeccion), data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Consultar todos los documentos (Coleccion)
export const consultarDatabase = async (nombreColeccion) => {
  try {
    const response = await getDocs(query(collection(database, nombreColeccion)));
    const elementos = response.docs.map((doc) => {
      const document = {
        id: doc.id, //doc.id: es el id que genera firebase (externo)
        ...doc.data(), // Si ya existe un atributo "id" lo reescribe del id que genera firebase
      };
      return document;
    });
    return elementos;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Consultar un documento por ID (externo generado por Firebase)
export const consultarDocumentoDatabase = async (nombreColeccion, id) => {
  try {
    const response = await getDoc(doc(database, nombreColeccion, id));
    // Si no encuentra el documento response._document = null
    if (response._document !== null) {
      const document = {
        id: response.id,
        ...response.data(),
      };
      //console.log("Documento consultado: ", document);
      return document;
    } else {
      //No encontró el documento
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//Consultar un documento filtrado por: categoría
export const buscarDocumentoFiltradoCategoria = async (nombreColeccion, idCategory) => {
  try {
    let elementos = '';
    const response = await getDocs(
      query(
        collection(database, nombreColeccion), where("IdCategory", "==", Number(idCategory))
      )
    );
    // console.log("response filtrado: ", response);
    elementos = response.docs.map((doc) => {
      const document = {
        id: doc.id, 
        ...doc.data(), 
      };
      return document;
    });
    return elementos;
  } catch (error) {
    throw new Error(error.message);
  }
};


//Consultar un documento filtrado por: id
export const buscarDocumentoFiltrado = async (nombreColeccion, id) => {
  try {
    let document = '';
    const response = await getDocs(
      query(
        collection(database, nombreColeccion), where("id", "==", id)
      )
    );
    response.docs.map((doc) => {
      document = {
        id: doc.id,
        ...doc.data()
      };
    });
    return document;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Actualizar un documento
export const actualizarDocumentoDatabase = async (nombreColeccion, id, data) => {
  try {
    const response = await updateDoc(doc(database, nombreColeccion, id), data);
    console.log(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Actualizar un documento Filtrado Id
export const actualizarDocumentoFiltrado = async (nombreColeccion, id, data) => {
  try {
    const q = query(collection(database, nombreColeccion), where("id", "==", id));
    const response = await getDocs(q);
    response.forEach(async (element) => {
      await updateDoc(doc(database, nombreColeccion, element.id), data);
    });
  } catch (error) {
    throw new Error(error.message);
  }
};


// Eliminar un documento
export const eliminarDocumentoDatabase = async (nombreColeccion, id) => {
  try {
    const response = await deleteDoc(doc(database, nombreColeccion, id));
    console.log(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

//Obtener Fecha TimeStamp
export const fechaFirebase = () => {
  return Timestamp.fromDate(new Date());
};


//======================CONSULTA PARA ORDENAR===============================//
export const getFilterCollection = async (nombreColeccion, keyDocumento, condicion, value, limite, orden = "asc") => {

  //orden: 'asc', 'desc"

  // Filtros
  // < menor que
  // <= menor o igual que
  // === igual que
  // > mayor que
  // >= mayor que o igual que
  // !== no igual a
  // array - contains
  // array - contains - any
  // in
  // not -in

  try {
    const response = await getDocs(
      query(
        collection(database, nombreColeccion),
        where(keyDocumento, condicion, value), // filtros
        // where("edad", ">", 12), // Ejemplo
        orderBy(keyDocumento, orden), // orden: por defecto es ascendente y se puedde pasar: ,"desc"
        limit(limite) // Limitar la cantidad de registros
      )
    );
    //console.log(response);
    const elementos = response.docs.map((doc) => {
      const document = {
        id: doc.id,
        ...doc.data()
      };
      return document;
    });

    return elementos;
  } catch (error) {
    throw new Error(error.message);
  }
};