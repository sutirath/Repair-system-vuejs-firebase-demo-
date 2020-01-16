import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase';
import 'firebase/firestore';
import "firebase/storage";
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify';
Vue.use(Vuetify)

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

let app = '';
const config = {
  apiKey: "AIzaSyCcm82YJJQbW6jipaFCh_1Yb5uF1i30QwA",
    authDomain: "repair-system-5a362.firebaseapp.com",
    databaseURL: "https://repair-system-5a362.firebaseio.com",
    projectId: "repair-system-5a362",
    storageBucket: "repair-system-5a362.appspot.com",
    messagingSenderId: "496998939990",
    appId: "1:496998939990:web:d45494653d4d1ca8d42af7"
};






firebase.initializeApp(config);

export const db = firebase.firestore()

export  const storageRef = firebase.storage().ref();

// Points to 'images'
export  const imagesRef = storageRef.child('images/');

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      vuetify,
      BootstrapVue,
      render: h => h(App)
    }).$mount('#app');
  }
});

