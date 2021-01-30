<template>
  <div>
    <!-- end page-header -->
    <panel title="Advert">
      <form class=" form-bordered">
        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Title</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="Title"
              readonly="readonly"
              class="form-control"
              v-model="advert.title"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Description</label>
          <div class="col-sm-9">
            <textarea
              type="text"
              placeholder="Description"
              readonly="readonly"
              class="form-control"
              v-model="advert.description"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Category</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="Category"
              readonly="readonly"
              class="form-control"
              v-model="category"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">City</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="City"
              readonly="readonly"
              class="form-control"
              v-model="city"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Views</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="City"
              readonly="readonly"
              class="form-control"
              v-model="advert.views"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Price</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="City"
              readonly="readonly"
              class="form-control"
              v-model="advert.price"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Phone</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="City"
              readonly="readonly"
              class="form-control"
              v-model="phone"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Phone access time</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="City"
              readonly="readonly"
              class="form-control"
              v-model="phone_access_time"
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-7 offset-md-5">
            <button class="btn btn-sm btn-white m-r-5" @click="cancel()">
              Back
            </button>
          </div>
        </div>
      </form>
    </panel>
  </div>
</template>

<script>
import PageOptions from "../config/PageOptions.vue";
import { HTTP } from "../config/Http.js";

export default {
  data() {
    return {
      id: 0,
      advert: {},
      category: "",
      city: "",
      phone: "",
      phone_access_time: "",
    };
  },

  monted() {},
  created() {
    console.log("created");
    this.id = this.$route.params.id;
    this.getAdvert();
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    getAdvert() {
      HTTP.get("/advert/show?id=" + this.id)
        .then((resp) => {
          console.log(resp);
          resp = resp.data.data.item;
          this.advert = resp;
          this.category = resp.category.name;
          this.city = resp.city.name;
          this.phone_access_time = resp.author.phone_access_time;
          this.phone = resp.author.phone;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
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
