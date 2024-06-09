import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap"
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDJ_VIVssWOawFJfXKTVxCX3gaCEXc-9SU",
  authDomain: "conteohorasbdo.firebaseapp.com",
  projectId: "conteohorasbdo",
  storageBucket: "conteohorasbdo.appspot.com",
  messagingSenderId: "653875373949",
  appId: "1:653875373949:web:b48e35b3796d841552ce14",
  measurementId: "G-S2Y7P5BKRK"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(pinia).use(router).mount('#app')
