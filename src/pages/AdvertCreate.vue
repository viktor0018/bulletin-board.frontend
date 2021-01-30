<template>
  <div>
    <!-- end page-header -->
    <panel title="Advert create">
      <div class=" form-bordered">
        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Title</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="Title"
              class="form-control"
              v-model="title"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Description</label>
          <div class="col-sm-9">
            <textarea
              type="text"
              placeholder="Description"
              class="form-control"
              v-model="description"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Category</label>
          <div class="col-sm-9">
            <select
              v-model="category_id"
              name="category"
              id="category"
              class="form-control"
              tabindex="12"
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                >{{ category.name }}</option
              >
            </select>
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">City</label>
          <div class="col-sm-9">
            <select
              v-model="city_id"
              name="city"
              id="city"
              class="form-control"
              tabindex="12"
            >
              <option v-for="city in cities" :key="city.id" :value="city.id">{{
                city.name
              }}</option>
            </select>
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Price</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="City"
              class="form-control"
              v-model="price"
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-7 offset-md-5">
            <button class="btn btn-sm btn-white m-r-5" @click="cancel()">
              Back
            </button>
            <button class="btn btn-sm btn-white m-r-5" @click="AddPhotos()">
              Add photos
            </button>
            <button class="btn btn-sm btn-white m-r-5" @click="createAdvert()">
              Create
            </button>
          </div>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
import PageOptions from "../config/PageOptions.vue";
import { HTTP } from "../config/Http.js";
import { getList } from "../config/Library";
import { show_error } from "../config/Message";

export default {
  data() {
    return {
      title: "",
      description: "",
      price: 0,
      category_id: 0,
      categories: {},
      city_id: 0,
      cities: {},
    };
  },

  monted() {},
  created() {
    console.log("created", this.$data);
    getList(this.$data);
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    AddPhotos() {
      HTTP.post("/advert/store", {
        title: this.title,
        description: this.description,
        price: this.price,
        category_id: this.category_id,
        city_id: this.city_id,
      })
        .then((resp) => {
          console.log(resp.data);
          console.log(resp.data.data.item.id);
          this.$router.push({
            name: "AdvertEdit",
            params: { id: resp.data.data.item.id },
          });
        })
        .catch((error) => {
          show_error(this.$notify, error);
        })
        .finally(() => {});
    },
    createAdvert() {
      HTTP.post("/advert/store", {
        title: this.title,
        description: this.description,
        price: this.price,
        category_id: this.category_id,
        city_id: this.city_id,
      })
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          show_error(this.$notify, error);
        })
        .finally(() => {
          this.$router.push({ path: "/home" });
        });
    },

    cancel() {
      this.$router.push({ path: "/home" });
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
