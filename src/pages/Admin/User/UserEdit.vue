<template>
  <div>
    <!-- end page-header -->
    <panel title="User edit">
      <div class=" form-bordered">
        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Name</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="Name"
              class="form-control"
              v-model="user.name"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Surname</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="Surname"
              class="form-control"
              v-model="user.surname"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Middlename</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="middlename user_role_id"
              class="form-control"
              v-model="user.middlename"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Email</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="Email"
              class="form-control"
              v-model="user.email"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Phone</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="Phone"
              class="form-control"
              v-model="user.phone"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">phone_access_time</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="phone_access_time user_status_id"
              class="form-control"
              v-model="user.phone_access_time"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Role</label>
          <div class="col-sm-9">
            <select
              v-model="user.user_role_id"
              name="user.user_role_id"
              id="user.user_role_id"
              class="form-control"
              tabindex="12"
            >
              <option
                v-for="UserRole in UserRoles"
                :key="UserRole.id"
                :value="UserRole.id"
                >{{ UserRole.role }}</option
              >
            </select>
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Status</label>
          <div class="col-sm-9">
            <select
              v-model="user.user_status_id"
              name="user.user_status_id"
              id="user.user_status_id"
              class="form-control"
              tabindex="12"
            >
              <option
                v-for="UserStat in UserStatus"
                :key="UserStat.id"
                :value="UserStat.id"
                >{{ UserStat.status }}</option
              >
            </select>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-7 offset-md-5">
            <button class="btn btn-sm btn-white m-r-5" @click="cancel()">
              Back
            </button>
            <button class="btn btn-sm btn-white m-r-5" @click="updateUser()">
              Update
            </button>
          </div>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
import PageOptions from "/src/config/PageOptions.vue";
import { HTTP } from "/src/config/Http.js";

//import { show_error } from "../../config/Message";

export default {
  data() {
    return {
      id: 0,
      user: {},
      UserRoles: {},
      UserStatus: {},
    };
  },

  monted() {},
  created() {
    console.log("created");
    this.id = this.$route.params.id;
    this.getList();
    this.getUsers();
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    updateUser() {
      HTTP.post("/admin/user/update", {
        id: this.id,
        name: this.user.name,
        surname: this.user.surname,
        middlename: this.user.middlename,
        email: this.user.email,
        phone: this.user.phone,
        phone_access_time: this.user.phone_access_time,
        user_role_id: this.user.user_role_id,
        user_status_id: this.user.user_status_id,
      })
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$router.push({ name: "UserList" });
        });
    },

    getList() {
      console.log("this.id", this.id);
      HTTP.get("/admin/user/list")
        .then((resp) => {
          console.log(resp);

          resp = resp.data.data;
          console.log("resp", resp);
          this.UserRoles = resp.UserRoles;
          this.UserStatus = resp.UserStatus;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },

    getUsers() {
      console.log("this.id", this.id);
      HTTP.get("/admin/user/show", { params: { id: this.id } })
        .then((resp) => {
          console.log(resp);

          resp = resp.data.data.item;
          console.log("resp", resp);
          this.user = resp;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },

    cancel() {
      this.$router.push({ name: "UserList" });
    },
  },
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
}

.pagination li {
  display: block;
}
</style>
