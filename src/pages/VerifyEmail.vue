<template>
  <!-- begin login -->
  <div class="login login-with-news-feed">
    <!-- begin news-feed -->
    <div class="news-feed">
      <div
        class="news-image"
        style="background-image: url(/assets/img/login-bg/login-bg-10.jpg)"
      ></div>
      <div class="news-caption">
        <h4 class="caption-title"><b>Bulletin</b> board App</h4>
        <p>
          Download the Color Admin app for iPhone®, iPad®, and Android™. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
    <!-- end news-feed -->
    <!-- begin right-content -->
    <div class="right-content">
      <!-- begin login-header -->
      <div class="login-header">
        <div class="brand">
          <span class="logo"></span> <b>Bulletin</b> board
        </div>
        Verify Email:
        <div class="icon">
          <i class="fa fa-sign-in"></i>
        </div>
      </div>
      <!-- end login-header -->
      <!-- begin login-content -->
      <div class="login-content">
        <div class="margin-bottom-0">
          <div class="login-buttons">
            <button class="btn btn-info btn-block btn-lg">
              Ok
            </button>
          </div>
          <hr />
          <p class="text-center text-grey-darker">
            &copy; Color Admin All Right Reserved 2020
          </p>
        </div>
      </div>
      <!-- end login-content -->
    </div>
    <!-- end right-container -->
  </div>
  <!-- end login -->
</template>

<script>
import PageOptions from "../config/PageOptions.vue";
import { HTTP } from "../config/Http.js";
import { show_error, show_message } from "../config/Message";

export default {
  data() {
    return {
      expires: "",
      signature: "",
      id: "",
      hash: "",
    };
  },

  created() {
    PageOptions.pageEmpty = true;
    document.body.className = "bg-white";
    let expires = this.$route.query.expires;
    let signature = this.$route.query.signature;
    let id = this.$route.params.id;
    let hash = this.$route.params.hash;

    console.log(this.$route);

    this.$insProgress.start();
    this.loading = true;
    localStorage.setItem("email", this.email);
    HTTP.get(
      `/verify-email/${id}/${hash}?expires=${expires}&signature=${signature}`
    )
      .then((resp) => {
        console.log("resp", resp);
        show_message(this.$notify, resp.data.message);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
        console.log(error.response.data);
        show_error(this.$notify, error.response.data.message);
      })
      .finally(() => {
        this.loading = false;
        this.$insProgress.finish();
      });
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {},
};
</script>
