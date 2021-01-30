<template>
  <div class="">
    <div class="container">
      <div class="row m-b-10">
        <div class="col-md-6 col-centered">
          <div>
            <div class="form-group row m-b-15">
              <label class="col-sm-3 col-form-label">Region</label>
              <div class="col-sm-9">
                <select
                  v-model="region_id"
                  name="city"
                  id="city"
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
                  <option
                    v-for="city in cities"
                    :key="city.id"
                    :value="city.id"
                    >{{ city.name }}</option
                  >
                </select>
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
              :src="'https://picsum.photos/id/' + advert.id + '/200/200'"
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
import { getList } from "../config/Library";

export default {
  data() {
    return {
      value: "",
      adverts: [],
      // Our data object that holds the Laravel paginator data
      advertData: {},
      category_id: 0,
      categories: {},
      city_id: 0,
      cities: {},
      region_id: 0,
      regions: {},
      price_from: 0,
      price_to: 0,
      search_text: "",
    };
  },

  monted() {},
  created() {
    console.log("created");
    getList(this.$data);

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
    resetAdverts() {
      this.category_id = 0;
      this.city_id = 0;
      this.region_id = 0;
      this.price_from = 0;
      this.price_to = 0;
      this.search_text = "";
      this.searchAdverts();
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
