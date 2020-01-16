<template>
  <div>
    <navbarsecond />
    <br />
    <div class="container">
      <h1 class="text-center">รายการแจ้งซ่อม</h1>
      <br />
      <div class="text-center">
        <img src="@/assets/new.png" alt="suscess" width="40" height="40" />:แจ้งซ่อมใหม่ |
        <img src="@/assets/success.png" alt="suscess" width="45" height="45" />:ซ่อมเสร็จ |
        <img src="@/assets/wait.png" alt="wait" width="40" height="40" />:กำลังซ่อม |
        <img src="@/assets/error.png" alt="wait" width="45" height="50" />:ไม่สำเร็จ
      </div>
      <br />

      <div>
        <v-card>
          <v-card-title>
            รายการแจ้งซ่อม
            <div class="flex-grow-1"></div>
            <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="repairBD"
            :search="search"
            :sort-by.sync="sortBy"
            :sort-desc.sync="descending"
            item-key="name"
            class="elevation-1"
            loading-text="Loading... Please wait"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
          >
            <template v-slot:item.status="{ item }">
              <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
            </template>
          </v-data-table>
        </v-card>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
          <v-text-field
            :value="itemsPerPage"
            label="Items per page"
            type="number"
            min="-1"
            max="15"
            @input="itemsPerPage = parseInt($event, 10)"
          ></v-text-field>
        </div>
      </div>
    </div>
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
import firebase from "firebase";

export default {
  data() {
    return {
      repairBD: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      sortBy: 'time',
      descending: true,
      search: "",
      headers: [
        {
          text: "ชื่อผู้แจ้งซ่อม",
          align: "left",
          sortable: false,
          value: "user"
        },
        { text: "วันที่แจ้ง", value: "time" },
        { text: "ห้อง", value: "room" },
         { text: "หอพัก", value: "domi" },
        { text: "ปัญหา", value: "prob" },
        { text: "สถานะ", value: "status" }
      ]
    };
  },
  components: {
    navbarsecond
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      db.collection("repair")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());

            this.repairBD.push(doc.data());
          });
        });
    },
    getColor(status) {
        if (status === "success") return '#33cc33'
        else if (status === "wait") return '#ff9900'
        else if (status === "new") return '#0066ff'
        else if (status === "unsuccess") return '#ff3300'
        else return '#ffffff'
      },
  }
};
</script>

<style>
</style>