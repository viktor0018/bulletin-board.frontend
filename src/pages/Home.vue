<template>
  <div class="">
    <div class="container">
      <div class="row">
        <div class="col-xl-4">
          <img
            class="card-img-top"
            src="https://picsum.photos/400/400"
            alt="Card image cap"
          />
          <div class="card-body">
            <a href=""
              ><div class="text-blue f-s-15 f-w-700">
                LADA Granta, 2017
              </div></a
            >
            <div class="text-black f-s-18 f-w-700">410 000 ₽</div>
            <div class="ttext-black-transparent-9 f-s-13 f-w-300">
              125 000 км, 1.6 MT (106 л.с.), хетчбэк, передний, бензин
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <img
            class="card-img-top"
            src="https://picsum.photos/400/400"
            alt="Card image cap"
          />
          <div class="card-body">
            <a href=""
              ><div class="text-blue f-s-15 f-w-700">
                LADA Granta, 2017
              </div></a
            >
            <div class="text-black f-s-18 f-w-700">410 000 ₽</div>
            <div class="ttext-black-transparent-9 f-s-13 f-w-300">
              125 000 км, 1.6 MT (106 л.с.), хетчбэк, передний, бензин
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <img
            class="card-img-top"
            src="https://picsum.photos/400/400"
            alt="Card image cap"
          />
          <div class="card-body">
            <a href=""
              ><div class="text-blue f-s-15 f-w-700">
                LADA Granta, 2017
              </div></a
            >
            <div class="text-black f-s-18 f-w-700">410 000 ₽</div>
            <div class="ttext-black-transparent-9 f-s-13 f-w-300">
              125 000 км, 1.6 MT (106 л.с.), хетчбэк, передний, бензин
            </div>
          </div>
        </div>
      </div>
      <div class="row m-t-10">
        <div class="col-xl-4">
          <img
            class="card-img-top"
            src="https://picsum.photos/400/400"
            alt="Card image cap"
          />
          <div class="card-body">
            <a href=""
              ><div class="text-blue f-s-15 f-w-700">
                LADA Granta, 2017
              </div></a
            >
            <div class="text-black f-s-18 f-w-700">410 000 ₽</div>
            <div class="ttext-black-transparent-9 f-s-13 f-w-300">
              125 000 км, 1.6 MT (106 л.с.), хетчбэк, передний, бензин
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <img
            class="card-img-top"
            src="https://picsum.photos/400/400"
            alt="Card image cap"
          />
          <div class="card-body">
            <a href=""
              ><div class="text-blue f-s-15 f-w-700">
                LADA Granta, 2017
              </div></a
            >
            <div class="text-black f-s-18 f-w-700">410 000 ₽</div>
            <div class="ttext-black-transparent-9 f-s-13 f-w-300">
              125 000 км, 1.6 MT (106 л.с.), хетчбэк, передний, бензин
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <img
            class="card-img-top"
            src="https://picsum.photos/400/400"
            alt="Card image cap"
          />
          <div class="card-body">
            <a href=""
              ><div class="text-blue f-s-15 f-w-700">
                LADA Granta, 2017
              </div></a
            >
            <div class="text-black f-s-18 f-w-700">410 000 ₽</div>
            <div class="ttext-black-transparent-9 f-s-13 f-w-300">
              125 000 км, 1.6 MT (106 л.с.), хетчбэк, передний, бензин
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <div class="ml-auto d-none d-lg-block">
          <ul class="pagination mb-0">
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
  </div>
</template>

<script>
import PageOptions from "../config/PageOptions.vue";
import HTTP from "../config/http.js";

export default {
  data() {
    return {
      value: "",
    };
  },

  monted() {},
  created() {
    HTTP()
      .get("/")
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});

    console.log("Login page loaded");
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {},
};
</script>
