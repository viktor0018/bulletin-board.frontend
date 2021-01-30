<template>
  <!-- begin login -->
  <div class="login login-with-news-feed">
    <!-- begin news-feed -->
    <div class="news-feed">
      <div
        class="news-image"
        style="background-image: url(/assets/img/login-bg/login-bg-11.jpg)"
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
              placeholder="Email Address"
              required
              v-model="email"
            />
          </div>
          <div class="form-group m-b-15">
            <input
              type="password"
              class="form-control form-control-lg"
              placeholder="Password"
              required
              v-model="password"
            />
          </div>
          <div class="checkbox checkbox-css m-b-30">
            <input type="checkbox" id="remember_me_checkbox" value="" />
            <label for="remember_me_checkbox">
              Remember Me
            </label>
          </div>
          <div class="login-buttons">
            <button @click="login" class="btn btn-success btn-block btn-lg">
              Sign me in
            </button>
          </div>
          <div class="m-t-20 m-b-40 p-b-40 text-inverse">
            Not a member yet? Click
            <router-link to="/register" class="text-success">here</router-link>
            to register.
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
import { show_error } from "../config/Message";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  created() {
    PageOptions.pageEmpty = true;
    document.body.className = "bg-white";
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    login() {
      this.$insProgress.start();
      this.loading = true;
      localStorage.setItem("username", this.username);
      localStorage.setItem("password", this.password);
      HTTP.post("/login", {
        email: this.email,
        password: this.password,
      })
        .then((resp) => {
          console.log("resp", resp);
          localStorage.setItem("access_token", resp.data.data.access_token);
          localStorage.setItem("user_name", resp.data.data.user_name);
          //location.href = "/";
          this.$router.push({ path: "home" });
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
