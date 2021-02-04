<template>
  <div>
    <!-- end page-header -->
    <panel title="city show">
      <div class=" form-bordered">
        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Name</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="Name"
              class="form-control"
              v-model="city.name"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Slug</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="slug"
              class="form-control"
              v-model="city.slug"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Region</label>
          <div class="col-sm-9">
            <select
              v-model="city.region_id"
              name="city.region_id"
              id="city.region_id"
              class="form-control"
              tabindex="12"
            >
              <option
                v-for="region in regions"
                :key="region.id"
                :value="region.id"
                >{{ region.name }}</option
              >
            </select>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-7 offset-md-5">
            <button class="btn btn-sm btn-white m-r-5" @click="cancel()">
              Back
            </button>
            <button class="btn btn-sm btn-white m-r-5" @click="createCity()">
              Create
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
      city: {},
      regions: {},
    };
  },

  monted() {},
  created() {
    console.log("created");
    this.getRegions();
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    createCity() {
      HTTP.post("/admin/city/create", {
        name: this.city.name,
        slug: this.city.slug,
        region_id: this.city.region_id,
      })
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$router.push({ name: "CityList" });
        });
    },
    getRegions() {
      HTTP.get("/admin/region/index")
        .then((resp) => {
          console.log(resp.data);
          this.regions = resp.data.data.items;
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
