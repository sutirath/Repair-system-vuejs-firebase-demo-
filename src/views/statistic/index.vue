<template>
  <div>
    <navbarsecond />
    <div class="container">
      <img src="@/assets/bg1.jpg" alt="bg" class="img-fluid" />
      <br />
      <br />
      <div class="card text-left">
        <div class="card-body">
          <h3>ขั้นตอนการแจ้งซ่อมวัสดุ-ครุภัณฑ์</h3>
          <br />
          <h6>1.ผู้ใช้งานต้องเป็นนักศึกษาปัจจุบันของมหาวิทยาลัยแม่โจ้ หรือเป็นบุคลากรในสังกัดสำนักงานหอพักนักศึกษาเท่านั้น</h6>
          <h6>2.ผู้ใช้งานต้องเข้าสู่ระบบโดยใช้ Account ของตนเองเท่านั้น</h6>
          <h6>3.แจ้งซ่อมวัสดุ-ครุภัณฑ์ภายในหอพักนักศึกษาที่เสียหาย</h6>
        </div>
      </div>
      <div class="card text-left">
        <div class="card-body">
          <h3>แจ้งการใช้งานระบบได้ที่นี้</h3>
          <br />
          <div class="form-group">
            <label for="exampleFormControlTextarea1">ปัญหาการใช้งาน</label>
            <textarea class="form-control" v-model="proble" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div >
            <v-btn rounded color="#0066ff"  dark @click="save()">ส่ง</v-btn>
          </div>
        </div>
      </div>

      <br />
    </div>
    <footer id="sticky-footer " class="py-4 bg-dark text-white-50 fixed">
      <div class="container text-center">
        <small>Copyright 2019 &copy; ระบบการแจ้งซ่อมวัสดุ-ครุภัณฑ์ (สำหรับหอพัก)</small>
      </div>
    </footer>
  </div>
</template>

<script>
import moment from "moment";
import navbarsecond from "@/components/navsecond";
import { db } from "@/main";
import firebase from "firebase";
export default {
  components: {
    navbarsecond
  },
  data() {
    return {
      proble:"",
      username: '',
      getuid:'',
      time:"",
    };
  },
  created() {
     this.getuser();
      this.time= moment().format('l, HH.mm');
  },
 
  methods: {
    save(){
      db.collection("problem")
        .add({
          problem:this.proble,
          username: this.username,
          uid:this.getuid,
          time:this.time


        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          alert("บันทึกสำเร็จ  ");
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    getuser() {
      var docRef = db.collection("users").doc(firebase.auth().currentUser.uid);

      docRef
        .get()
        .then((doc) =>{
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            this. username = doc.data().name;
            this.getuid = doc.data().uid;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },
  },
  
};
</script>

<style>
</style>