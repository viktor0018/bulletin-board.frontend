<template>
  <!-- begin login -->
  <div class="login login-with-news-feed">
    <!-- begin news-feed -->
    <div class="news-feed">
      <div
        class="news-image"
        style="background-image: url(/assets/img/login-bg/login-bg-9.jpg)"
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
        Password reset:
        <div class="icon">
          <i class="fa fa-sign-in"></i>
        </div>
      </div>
      <!-- end login-header -->
      <!-- begin login-content -->
      <div class="login-content">
        <div class="margin-bottom-0">
          <div class="form-group m-b-15">
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="New password"
              required
              v-model="password"
            />
          </div>

          <div class="form-group m-b-15">
            <input
              type="text"
              class="form-control form-control-lg"
              z
              placeholder="Password confirmation"
              required
              v-model="password_confirmation"
            />
          </div>

          <div class="login-buttons">
            <button
              @click="reset_password"
              class="btn btn-info btn-block btn-lg"
            >
              Password reset
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
import PageOptions from "/src/config/PageOptions.vue";
import { HTTP } from "/src/config/Http.js";
import { show_error, show_message } from "/src/config/Message";

export default {
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      token: "",
    };
  },

  created() {
    PageOptions.pageEmpty = true;
    document.body.className = "bg-white";
    this.token = this.$route.query.token;
    this.email = this.$route.query.email;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    reset_password() {
      this.$insProgress.start();
      this.loading = true;
      localStorage.setItem("email", this.email);
      HTTP.post("/reset-password", {
        password: this.password,
        token: this.token,
        email: this.email,
        password_confirmation: this.password_confirmation,
      })
        .then((resp) => {
          console.log("resp", resp);
          /*
          localStorage.setItem("access_token", resp.data.data.access_token);
          localStorage.setItem("user_name", resp.data.data.user_name);
          //location.href = "/";
          this.$router.push({ path: "home" });*/
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
  },
};
</script>
