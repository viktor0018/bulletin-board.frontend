<template>
  <div>
    <!-- end page-header -->
    <panel title="Сity show">
      <div class=" form-bordered">
        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Name</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="Name"
              class="form-control"
              v-model="city.name"
              disabled
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Slug</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="Slug"
              class="form-control"
              v-model="city.slug"
              disabled
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Region</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="Slug"
              class="form-control"
              v-model="city.region.name"
              disabled
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-7 offset-md-5">
            <button class="btn btn-sm btn-white m-r-5" @click="cancel()">
              Back
            </button>
            <button class="btn btn-sm btn-white m-r-5" @click="updatecity()">
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
      city: {},
    };
  },

  monted() {},
  created() {
    console.log("created");
    this.id = this.$route.params.id;
    this.getcity();
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    updatecity() {
      this.$router.push({ name: "CityEdit", params: { id: this.id } });
    },

    getcity() {
      console.log("this.id", this.id);
      HTTP.get("/admin/city/show", { params: { id: this.id } })
        .then((resp) => {
          console.log(resp);

          resp = resp.data.data.item;
          console.log("resp", resp);
          this.city = resp;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },

    cancel() {
      this.$router.push({ name: "CityList" });
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
