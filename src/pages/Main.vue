<template>
  <div class="">
    <div class="container">
      <div class="row m-b-10">
        <div class="col-md-6 col-centered">
          <div>
            <city
              :city_id="city_id"
              :region_id="region_id"
              @cityChange="(value) => (city_id = value)"
              @regionChange="(value) => (region_id = value)"
            >
            </city>

            <category
              :category_id="category_id"
              @categoryChange="(value) => (category_id = value)"
            >
            </category>

            <div class="form-group row m-b-15">
              <label class="col-sm-3 col-form-label">Price from</label>
              <div class="col-sm-9">
                <input
                  v-model="price_from"
                  type="number"
                  class="form-control"
                  id="exampleInputEmail2"
                  placeholder="Price from"
                  autocomplete="off"
                />
              </div>
            </div>

            <div class="form-group row m-b-15">
              <label class="col-sm-3 col-form-label">Price to</label>
              <div class="col-sm-9">
                <input
                  v-model="price_to"
                  type="number"
                  class="form-control"
                  id="exampleInputEmail2"
                  placeholder="Price to"
                  autocomplete="off"
                />
              </div>
            </div>

            <div class="form-group row m-b-15">
              <label class="col-sm-3 col-form-label">Search</label>
              <div class="col-sm-9">
                <input
                  v-model="search_text"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail2"
                  placeholder="Text"
                  autocomplete="off"
                />
              </div>
            </div>

            <div class="form-group row">
              <div class="col-md-7 offset-md-3">
                <button
                  type="submit"
                  class="btn btn-sm btn-primary m-r-5 mobbtn m-t-10"
                  style="min-width:100px"
                  @click="searchAdverts()"
                >
                  Search
                </button>
                <button
                  type="submit"
                  class="btn btn-sm btn-primary m-r-5 mobbtn m-t-10"
                  style="min-width:100px"
                  @click="resetAdverts()"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div class="form-inline">
            <div class="form-group m-r-10"></div>
            <div class="form-group m-r-10"></div>
            <div class="form-group m-r-10"></div>
            <div class="form-group m-r-10"></div>
            <div class="form-group m-r-10"></div>
          </div>
        </div>
      </div>
      <div class="row m-t-20" v-if="adverts.length">
        <div
          class="media media"
          v-for="(advert, index) in adverts"
          :key="index"
          style="min-width:400px"
        >
          <a class="media-left" :href="'/advert/' + advert.id">
            <img
              :src="
                'http://0.0.0.0/' +
                  advert.photo.filter((x) => x.is_main == 1)[0].link
              "
              alt=""
              class="media-object rounded"
            />
          </a>
          <div class="media-body">
            <a :href="'/#/advert/' + advert.id">
              <h5 class="media-heading">{{ advert.title }}</h5></a
            >
            {{ advert.description }}
            <div class="text-black f-s-18 f-w-700">{{ advert.price }} ₽</div>
          </div>
        </div>
      </div>
      <div class=" m-t-20 text-center" v-else>
        <h4>Adverts not found</h4>
      </div>

      <pagination
        :data="advertData"
        @pagination-change-page="searchAdverts"
        class="m-t-20"
      ></pagination>
    </div>
  </div>
</template>

<script>
import PageOptions from "../config/PageOptions.vue";
import { HTTP } from "../config/Http.js";
import { show_error } from "../config/Message";


export default {
  data() {
    return {
      value: "",
      adverts: [],
      advertData: {},
      category_id: 0,
      city_id: 0,
      region_id: 0,
      price_from: 0,
      price_to: 0,
      search_text: "",
    };
  },

  monted() {},
  created() {
    console.log("created");
    this.getCategories();
    this.category_id = localStorage.category_id;
    this.city_id = localStorage.city_id;
    this.region_id = localStorage.region_id;
    this.price_from = localStorage.price_from;
    this.price_to = localStorage.price_to;
    this.search_text = localStorage.search_text;
    this.searchAdverts();
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    categoryChange(value) {
      console.log(value);
      this.category_id = value;
    },
    resetAdverts() {
      this.$router.go();
    },
    getCategories() {
      HTTP.get("/admin/category/index")
        .then((resp) => {
          console.log(resp.data);
          this.categories = resp.data.data.items;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    searchAdverts(page = 1) {
      localStorage.setItem("category_id", this.category_id);
      localStorage.setItem("city_id", this.city_id);
      localStorage.setItem("region_id", this.region_id);
      localStorage.setItem("price_from", this.price_from);
      localStorage.setItem("price_to", this.price_to);
      localStorage.setItem("search_text", this.search_text);
      HTTP.get("/adverts", {
        params: {
          page: page,
          category_id: this.category_id,
          city_id: this.city_id,
          region_id: this.region_id,
          price_from: this.price_from,
          price_to: this.price_to,
          search_text: this.search_text,
        },
      })
        .then((resp) => {
          console.log(resp.data);
          this.adverts = resp.data.data.data;
          this.advertData = resp.data.data;
        })
        .catch((error) => {
          console.warn(error.response.data.data.item);
          console.log(
            Object.values(error.response.data.data.item.item).join("  ")
          );

          show_error(this.$notify, error);
        })
        .finally(() => {});
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

.col-centered {
  float: none;
  margin: 0 auto;
}

@media (max-width: 767px) {
  .mobbtn {
    width: 100%;
  }
}
</style>
