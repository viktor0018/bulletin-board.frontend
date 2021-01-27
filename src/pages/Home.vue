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

      <div>
        <ul class="pagination" style="">
          <li class="page-item disabled">
            <a href="javascript:;" class="page-link">«</a>
          </li>
          <li class="page-item active">
            <a href="javascript:;" class="page-link">1</a>
          </li>
          <li class="page-item">
            <a href="javascript:;" class="page-link">2</a>
          </li>
          <li class="page-item">
            <a href="javascript:;" class="page-link">3</a>
          </li>
          <li class="page-item">
            <a href="javascript:;" class="page-link">4</a>
          </li>
          <li class="page-item">
            <a href="javascript:;" class="page-link">5</a>
          </li>
          <li class="page-item">
            <a href="javascript:;" class="page-link">6</a>
          </li>
          <li class="page-item">
            <a href="javascript:;" class="page-link">7</a>
          </li>
          <li class="page-item">
            <a href="javascript:;" class="page-link">»</a>
          </li>
        </ul>
      </div>
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
    };
  },

  monted() {},
  created() {
    console.log("created");
    HTTP()
      .get("/adverts")
      .then((resp) => {
        console.log(resp.data);
        this.adverts = resp.data.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {},
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
