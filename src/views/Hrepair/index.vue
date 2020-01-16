<template>
  <div>
    <navbarsecond />
    <br />
    <div class="container">
      <h1 class="text-center">รายการซ่อม</h1>
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
            item-key="name"
            class="elevation-1"
            loading-text="ยังไม่มีรายการแจ้งซ่อม"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="descending"
            hide-default-footer
            @page-count="pageCount = $event"
          >
            <template v-slot:top>
              <v-dialog v-model="dialog" width="600px" height="600px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Edit</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col class="d-flex" cols="12" sm="6" md="4">
                          <v-select :items=" domis" v-model="editedItem.domi" ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.room"  label="ห้อง"></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6" md="4">
                          <v-select :items="sizes" v-model="editedItem.repairwork" ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.prob"   label="ปัญหา"></v-text-field>
                          
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
            </template>

            <template align="center"  v-slot:item.id="{ item }">
              <v-row >
              <v-img
                @click="editItem(item)"
                src="@/assets/document.png"
                class="mr-2 img-fluid"
                max-width="30"
                max-height="30"

              ></v-img>
              <v-img
                @click="rout(item)"
                src="@/assets/seo.png"
                class="mr-2 img-fluid"
                max-width="30"
                max-height="30"

              ></v-img>
               
              
              </v-row>
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
import { db } from "@/main";
import firebase from "firebase";
import navbarsecond from "@/components/navsecond";
export default {
  data() {
    return {
      repairBD: [],
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
       sizes: ["อุปกรณ์ไฟฟ้า", "อุปกร์ประปา", "ครุภัณท์", "อื่นๆ"],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      dialog: false,
      status:["wait","success","unsuccess"],
      search: "",
      sortBy: 'time',
      descending: true,
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
        { text: "สถานะ", value: "status" },
        { text: "Actions", value: "id", sortable: false }
      ],
      editedIndex: -1,
      editid: "",

      editedItem: {
       room:'',
       prob:'',
       domi:"",
       repairwork:""


      }
    };
  },
  created() {
    /////////////getdata/////////////

    db.collection("repair")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // console.log(doc.id, " => ", doc.data());
         this.repairBD.push({
              id: doc.id,
              user: doc.data().user,
              time: doc.data().time,
              room: doc.data().room,
              prob: doc.data().prob,
              tnc: doc.data().tnc,
              status: doc.data().status,
              repairwork:doc.data().repairwork,
              domi:doc.data().domi

            });
        });
      });
  },
  methods: {
    getColor(status) {
      if (status === "success") return "#33cc33";
      else if (status === "wait") return "#ff9900";
      else if (status === "new") return "#0066ff";
      else if (status === "unsuccess") return "#ff3300";
      else return "#ffffff";
    },
    editItem(item) {
      this.editedIndex = this.repairBD.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.editid = item.id;
      console.log(item.id);

      this.dialog = true;
    },
    rout(item) {
      this.editedIndex = this.repairBD.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log(item.id);
      this.$router.push({ name: 'name2', params: { H_id: item.id } });

    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      var updateRef = db.collection("repair").doc(this.editid);

      return updateRef
        .update({
          room : this.editedItem.room,
          prob : this.editedItem.prob,
          domi : this.editedItem.domi,
          repairwork:this.editedItem.repairwork,

        })
        .then(() => {
          console.log("Document successfully updated!");
          alert("Success");
          this.close();
          window.location.reload()
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  components: {
    navbarsecond
  }
};
</script>

<style>
</style>