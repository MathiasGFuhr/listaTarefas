import { initializeApp } from 'firebase/app'; // funcao de inicializacao
import { getFirestore } from 'firebase/firestore'; // funcao de banco
import { getAuth } from 'firebase/auth'; // função de autenticacao


const firebaseConfig = {
    apiKey: "AIzaSyBp5Fom6kDA28Sp5L3BYBLLuBaWIJ_dp1k",
    authDomain: "projetofirebase-81d2b.firebaseapp.com",
    projectId: "projetofirebase-81d2b",
    storageBucket: "projetofirebase-81d2b.firebasestorage.app",
    messagingSenderId: "292248395132",
    appId: "1:292248395132:web:a7805b843321664fb3d8f9"
};

const firebaseApp = initializeApp(firebaseConfig); 
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);


export { db, auth };