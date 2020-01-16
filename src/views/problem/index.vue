<template>
  <div>
    <navbarsecond />
    <br />
    <div class="container">
      <h1 class="text-center">รายงานปัญหาระบบ</h1>
      <br />
      

      <div>
        <v-card>
          <v-card-title>
            
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
                          <v-select :items=" domis" v-model="editedItem.domi"></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.room" label="ห้อง"></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6" md="4">
                          <v-select :items="sizes" v-model="editedItem.repairwork"></v-select>
                        </v-col>

                        <v-col class="d-flex" cols="12" sm="6" md="4">
                          <v-select :items="status" v-model="editedItem.status" ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.prob" label="ปัญหา"></v-text-field>
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
      status:["wait","success","unsuccess"],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      dialog: false,
      status: ["wait", "success", "unsuccess"],
      search: "",
      sortBy: "time",
      descending: true,
      headers: [
        {
          text: "ชื่อผู้แจ้ง",
          align: "left",
          sortable: false,
          value: "username"
        },
        { text: "วันที่แจ้ง", value: "time" },
        { text: "ปัญหา", value: "problem" },
        
      ],
      editedIndex: -1,
      editid: "",

      editedItem: {
        room: "",
        prob: "",
        domi: "",
        repairwork: "",
        status:''
      }
    };
  },
  created() {
    /////////////getdata/////////////

    db.collection("problem")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          //  console.log(doc.id, " => ", doc.data()); 
           
          this.repairBD.push({
            id: doc.id,
            username: doc.data(). username,
            time: doc.data().time,
            uid: doc.data().uid,
            problem: doc.data().problem,

           
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
      this.$router.push({ name: "name2", params: { H_id: item.id } });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      this.repairBD = [];
      var updateRef = db.collection("repair").doc(this.editid);

      return updateRef
        .update({
          room: this.editedItem.room,
          prob: this.editedItem.prob,
          domi: this.editedItem.domi,
          repairwork: this.editedItem.repairwork,
          status:this.editedItem. status,

        })
        .then(() => {
          console.log("Document successfully updated!");
          alert("Success");
          this.close();
          // window.location.reload();
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
    },
    remove(item) {
      db.collection("repair")
        .doc(item.id)
        .delete()
        .then(function() {

             alert("Delete Success");
          window.location.reload();
          console.log("Document successfully deleted!");

        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
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