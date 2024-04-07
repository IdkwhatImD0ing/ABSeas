import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCZrRYFPnDB9K2Z8iXL-kW1qKrvBiFH4So",
    authDomain: "abseas-8416d.firebaseapp.com",
    projectId: "abseas-8416d",
    storageBucket: "abseas-8416d.appspot.com",
    messagingSenderId: "1018978781186",
    appId: "1:1018978781186:web:148b3a06f9f139f1463f1b",
    measurementId: "G-T3D9LQ03HR"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };