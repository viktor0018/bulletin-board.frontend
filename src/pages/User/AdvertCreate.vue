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

        <category
          :category_id="category_id"
          @categoryChange="(value) => (category_id = value)"
        >
        </category>

        <city
          :city_id="city_id"
          :region_id="region_id"
          @cityChange="(value) => (city_id = value)"
          @regionChange="(value) => (region_id = value)"
        >
        </city>

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
import PageOptions from "/src/config/PageOptions.vue";
import { HTTP } from "/src/config/Http.js";
import { show_error } from "/src/config/Message";

export default {
  data() {
    return {
      title: "",
      description: "",
      price: 0,
      category_id: 0,
      city_id: 0,
      region_id: 0,
    };
  },

  monted() {},
  created() {
    console.log("created", this.$data);
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
