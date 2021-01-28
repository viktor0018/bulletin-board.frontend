<template>
  <div>
    <!-- end page-header -->
    <panel title="Advert edit">
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
            <button class="btn btn-sm btn-white m-r-5" @click="updateAdvert()">
              Update
            </button>
          </div>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
import PageOptions from "../config/PageOptions.vue";
import HTTP from "../config/Http.js";

export default {
  data() {
    return {
      id: 0,
      title: "",
      description: "",
      price: 0,
      category_id: 0,
      city_id: 0,
      cities: {},
      categories: {},
    };
  },

  monted() {},
  created() {
    console.log("created");
    this.id = this.$route.params.id;
    this.getList();
    this.getAdvert();
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    updateAdvert() {
      HTTP()
        .post("/advert/update", {
          id: this.id,
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
          console.log(error);
        })
        .finally(() => {
          this.$router.push({ path: "/home" });
        });
    },
    getList() {
      HTTP()
        .get("/advert/list")
        .then((resp) => {
          console.log(resp.data);
          this.categories = resp.data.data.categories;
          this.cities = resp.data.data.cities;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },

    getAdvert() {
      HTTP()
        .get("/advert/show?id=" + this.id)
        .then((resp) => {
          console.log(resp);

          resp = resp.data.data.item;
          console.log("resp", resp);
          console.log("resp", resp.title);
          this.title = resp.title;
          this.description = resp.description;
          this.price = resp.price;
          this.category_id = resp.category.id;
          this.city_id = resp.city.id;
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
