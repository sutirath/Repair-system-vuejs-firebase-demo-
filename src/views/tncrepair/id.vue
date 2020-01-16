<template>
  <div>
    <navbarsecond />
    <br />
    <div class="container">
      <h1>รายละเอียด</h1>
      <div class="card text-left">
        <div class="card-body" v-for="detail in data" :key="detail.index">
          <h3>ผู้แจ้งซ่อม</h3>
          <br />
          <h6>ผู้แจ้งซ่อม : {{detail.user}}</h6>
          <h6>เบอร์โทร : {{detail.tel}}</h6>
        </div>
      </div>
      <br />

      <div class="card text-left">
        <div class="card-body" v-for="detail in data" :key="detail.index">
          <h3>รายละเอียดการซ่อม</h3>
          <br />
          <h6>วันที่แจ้ง : {{detail.time}}</h6>
          <h6>หอพัก : {{detail.domi}}</h6>
          <h6>ห้อง : {{detail.room}}</h6>
          <h6>ปัญหา : {{detail.prob}}</h6>
          <h6>หมวด : {{detail.repairwork}}</h6>
          <h6>สถานะการซ่อม : {{detail.status}}</h6>
          <br />
          <h3>รูปภาพ</h3>
          <center>
            <img :src="detail.img" class="img-fluid" width="500px" height="500px" />
          </center>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <footer id="sticky-footer " class="py-4 bg-dark text-white-50">
      <div class="container text-center">
        <small>Copyright 2019 &copy; ระบบการแจ้งซ่อมวัสดุ-ครุภัณฑ์ (สำหรับหอพัก)</small>
      </div>
    </footer>
  </div>
</template>

<script>
import navbarsecond from "@/components/navsecond";
import { db } from "@/main";

export default {
  data() {
    return {
      id: this.$route.params.id,
      data: []
    };
  },
  components: {
    navbarsecond
  },
  created() {
    /////////////getdata/////////////
    var docRef = db.collection("repair").doc(this.id);

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          this.data.push(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }
};
</script>

<style>
</style>