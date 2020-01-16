<template>
  <nav class="navbar navbar-light bg-light shadow-sm p-3 mb-5 bg-white rounded">
    <router-link to="/" class="navbar-brand">Repair System Dormitories MJU</router-link>
  
  <form class="form-inline my-2 my-lg-0">
    <h6 v-if="isLoggedIn" class="btn btn-outline-danger my-2 my-sm-0"> สวัสดีคุณ {{username}}</h6>
      <button v-if="isLoggedIn" class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="logout">Logout</button>
    </form>
</nav>
</template>

<script>
import { db } from "@/main";
import firebase from 'firebase';
export default {
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
      username:''
    };
  },
  
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
       this.$router.go({ path: this.$router.path });
      })},
      getuser() {
      var docRef = db.collection("users").doc(firebase.auth().currentUser.uid);

      docRef
        .get()
        .then((doc) =>{
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            this. username = doc.data().name
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
    
  },

  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
       this.getuser();
    }
  },
}
</script>

<style>

</style>