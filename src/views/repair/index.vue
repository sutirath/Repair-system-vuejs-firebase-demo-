<template>
  <div>
    <navbarsecond />
    <br />
    <div class="container">
      <h1 class="text-center">แจ้งซ่อมวัสดุ-ครุภัณฑ์</h1>
      <br />
      <form>
        <div class="form-group row">
          <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">ผู้แจ้งซ่อม</label>
          <input
            type="form-control"
            class="form-control col-sm-9"
            id="exampleFormControlInput1"
            :value="username"
            readonly="readonly"
          />
        </div>
        <div class="form-group row">
          <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">เวลาแจ้งซ่อม</label>
          <input
            type="form-control"
            class="form-control col-sm-9"
            id="exampleFormControlInput1"
            :value="time"
            readonly="readonly"
            
          />
        </div>

        <div class="form-group row">
          <label for="exampleFormControlSelect1" class="col-sm-2 col-form-label">งานซ่อม</label>
          <select class="form-control col-sm-9" id="exampleFormControlSelect1" v-model="repwork">
            <option v-for="(size,index) in sizes" :key="index" :value="size" required>{{ size }}</option>
          </select>
        </div>

        <div class="form-group row">
          <label for="exampleFormControlSelect1" class="col-sm-2 col-form-label">หอพัก</label>
          <select class="form-control col-sm-9" id="exampleFormControlSelect1" v-model="sedomi">
            <option v-for="(domi,index) in domis" :key="index" required>{{ domi }}</option>
          </select>
        </div>

        <div class="form-group row">
          <label
            for="exampleInputEmail1"
            class="col-sm-2 col-form-label"
          >ชื่อห้องและชั้น หรือเลขที่ห้องพัก</label>
          <input
            type="form-control"
            class="form-control col-sm-9"
            id="exampleInputEmail1"
            placeholder=" เช่น ห้อง314, ห้องน้ำ ชั้น4"
            v-model="room"
            required
          />
        </div>
        <div class="form-group row">
          <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">เบอร์โทร</label>
          <input
            type="form-control"
            class="form-control col-sm-9"
            id="exampleFormControlInput1"
            v-model="tel"
            required
          />
        </div>
        <div class="input-group">
          <v-file-input placeholder="รูปภาพ"  accept="image/*" v-model="file" @change="detectFiles()"></v-file-input>
        </div>

        <div class="form-group text-left">
          <label for="exampleFormControlTextarea1">อาการ/ปัญหา</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="prob" ></textarea>
        </div>
        
        <button
          @click="adddata(index)"
          type="button"
          class="btn btn-primary btn-lg btn-block csmju"
        >บันทึก</button>
      </form>
      <br />
      <br />
    </div>
    <footer id="sticky-footer" class="py-4 bg-dark text-white-50 fixed">
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
import { storageRef } from '@/main'

export default {
  data() {
    return {
      file:null,
      room: "",
      urlimg:"",
      tel: "",
      prob: "",
      repwork: null,
      sedomi: null,
      // generateID:0,

      sizes: ["อุปกรณ์ไฟฟ้า", "อุปกร์ประปา", "ครุภัณท์", "อื่นๆ"],
      domis: [
        "หอเทพนฤมิตร",
        "หอวิทยศิลป์",
        "หอวัฒนศิลป์",
        "หอสหศิลป์",
        "หอผดุงศิลป์",
        "หอศรีเกษตร",
        "หอสุมิตร",
        "หอฝึกหัดครู",
        "หอรัตมา",
        "หออุดมป์ศิลป์"
      ],
      username: '',
      getuid:'',
    };
  },
  components: {
    navbarsecond
  },
  computed: {
    time() {
      return moment().format('l, HH.mm');
    }
  },
  created() {
    this.getuser();
  },
  methods: {
    adddata(index) {
      // db.collection("repair").doc(......).set
      db.collection("repair")
        .add({
          uid:this.getuid,
          user: this.username,
          room: this.room,
          tel: this.tel,
          prob: this.prob,
          time: this.time,
          repairwork: this.repwork,
          domi: this.sedomi,
          status:'new',
          tnc:'-',
          img:this.urlimg
          
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
    upload() {
      this.uploadTask = storageRef
        .child('images/' + this.file.name)
        .put(this.file)
        .then(snapshot => {

          snapshot.ref.getDownloadURL().then((downloadURL)=> {
            console.log('File available at', downloadURL)
            this.urlimg = downloadURL
          })
          // console.log('Uploaded1 a blob or file!')
          // alert('upload complete')
          
        })
        .catch(error => {
          console.log(error)
        })
    },
    detectFiles () {
      this.upload();
    },
   
    
  },
 
   

};
</script>

<style>
.csmju {
  margin-bottom: 3rem;
}


</style>