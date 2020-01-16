<template>
  <div class="container">
    <!-- <b-nav tabs fill align="center">
    <b-nav-item v-bind="active" ><router-link to="/repair" class="navbar-brand">แจ้งซ่อม</router-link></b-nav-item>
    <b-nav-item><router-link to="/RPlist" class="navbar-brand">รายการแจ้งซ่อม</router-link></b-nav-item>
    <b-nav-item><router-link to="/statistic" class="navbar-brand">สถิติ</router-link></b-nav-item>
    </b-nav>-->
    <ul class="nav nav-tabs nav-fill justify-content-center">
      <li class="nav-item">
        <router-link to="/statistic" class="navbar-brand">หน้าแรก</router-link>
      </li>
      <li class="nav-item" v-if="userstatus=='user'||userstatus=='admin'">
        <router-link to="/repair" class="navbar-brand">แจ้งซ่อม</router-link>
      </li>
      <li class="nav-item" v-if="userstatus=='admin'">
        <router-link to="/fixrepair" class="navbar-brand">จัดการรายการแจ้งซ่อม</router-link>
      </li>

       <li class="nav-item" v-if="userstatus=='admin'">
        <router-link to="/edituser" class="navbar-brand">จัดการสมาชิก</router-link>
      </li>

      <li class="nav-item" v-if="userstatus=='admin'">
        <router-link to="/problem" class="navbar-brand">รายงานปัญหาระบบ</router-link>
      </li>

      <li class="nav-item" v-if="userstatus=='user'">
        <router-link to="/Hrepair" class="navbar-brand">ประวัติแจ้งซ่อม</router-link>
      </li>
      <li class="nav-item" v-if="userstatus=='domistf'">
        <router-link to="/domiATD" class="navbar-brand">จัดการรายการซ่อม</router-link>
      </li>
      <li class="nav-item" v-if="userstatus=='tnc'">
        <router-link to="/tncrepair" class="navbar-brand">รายการซ่อม</router-link>
      </li>
      <li class="nav-item" v-if="userstatus=='user'||userstatus=='tnc' ||userstatus=='domistf' " >
        <router-link to="/RPlist" class="navbar-brand">รายการแจ้งซ่อม</router-link>
      </li>
    </ul>
    <div></div>
  </div>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase";
export default {
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
      username: "",
      userstatus: ""
    };
  },

  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    },
    getuser() {
      var docRef = db.collection("users").doc(firebase.auth().currentUser.uid);

      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            this.username = doc.data().name;
            this.userstatus = doc.data().ustatus;
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
  }
};
</script>

<style>
</style>