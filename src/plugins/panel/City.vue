<template>
  <div>
    <div class="form-group row m-b-15">
      <label class="col-sm-3 col-form-label">Region</label>
      <div class="col-sm-9">
        <select
          v-model="region_val"
          name="city"
          id="city"
          class="form-control"
          @change="regionChange()"
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

    <div class="form-group row m-b-15">
      <label class="col-sm-3 col-form-label">City</label>
      <div class="col-sm-9">
        <select
          v-model="city_val"
          name="city"
          id="city"
          class="form-control"
          @change="cityChange()"
        >
          <option v-for="city in cities" :key="city.id" :value="city.id">{{
            city.name
          }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "/src/config/Http.js";

export default {
  name: "City",
  props: ["region_id", "city_id"],

  data() {
    return {
      cities: {},
      regions: {},
      region_val: 0,
      city_val: 0,
    };
  },
  created() {
    this.getRegions();
    this.getCities(this.region_val);
    console.log("created", this.category_id);
    this.region_val = this.region_id;
    this.city_val = this.city_id;
  },
  methods: {
    regionChange() {
      this.$emit("regionChange", this.region_val);
      this.getCities(this.region_val);
    },
    cityChange() {
      this.$emit("cityChange", this.city_val);
    },

    getCities(id) {
      HTTP.get("/admin/city/index", { params: { id: id } })
        .then((resp) => {
          console.log(resp.data);
          this.cities = [
            {
              id: 0,
              name: "Select city",
              slug: "select_city",
            },
            ...resp.data.data.items,
          ];
        })
        .catch(() => {})
        .finally(() => {});
    },

    getRegions() {
      HTTP.get("/admin/region/index")
        .then((resp) => {
          console.log(resp.data);

          this.regions = [
            {
              id: 0,
              name: "Select region",
              slug: "select_regions",
            },
            ...resp.data.data.items,
          ];
        })
        .catch(() => {})
        .finally(() => {});
    },
  },
};
</script>
