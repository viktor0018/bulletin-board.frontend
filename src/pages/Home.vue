<template>
  <div class="">
    <div class="container">
      <div class="row">
        <div class="col-xl-4" v-for="(advert, index) in adverts" :key="index">
          <img
            class="card-img-top"
            :src="'https://picsum.photos/id/' + advert.id + '/200/200'"
            alt="Card image cap"
          />
          <div class="card-body">
            <a href=""
              ><div class="text-blue f-s-15 f-w-700">
                {{ advert.title }}
              </div></a
            >
            <div class="text-black f-s-18 f-w-700">{{ advert.price }} ₽</div>
            <div class="ttext-black-transparent-9 f-s-13 f-w-300">
              {{ advert.description }}
            </div>
          </div>
        </div>
      </div>

      <pagination
        :data="advertData"
        @pagination-change-page="getAdverts"
      ></pagination>
    </div>
  </div>
</template>

<script>
import PageOptions from "../config/PageOptions.vue";
import HTTP from "../config/Http.js";

export default {
  data() {
    return {
      value: "",
      adverts: [],
      // Our data object that holds the Laravel paginator data
      advertData: {},
    };
  },

  monted() {},
  created() {
    console.log("created");
    this.getAdverts();
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    getAdverts(page = 1) {
      HTTP()
        .get("/adverts?page=" + page)
        .then((resp) => {
          console.log(resp.data);
          this.adverts = resp.data.data;
          this.advertData = resp.data;
        })
        .catch((error) => {
          console.log(error);
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
</style>
