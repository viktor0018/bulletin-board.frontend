<template>
  <!-- begin register -->
  <div class="register register-with-news-feed">
    <!-- begin news-feed -->
    <div class="news-feed">
      <div
        class="news-image"
        style="background-image: url(/assets/img/login-bg/login-bg-15.jpg)"
      ></div>
      <div class="news-caption">
        <h4 class="caption-title"><b>Color</b> Admin App</h4>
        <p>
          As a Color Admin app administrator, you use the Color Admin console to
          manage your organization’s account, such as add new users, manage
          security settings, and turn on the services you want your team to
          access.
        </p>
      </div>
    </div>
    <!-- end news-feed -->
    <!-- begin right-content -->
    <div class="right-content">
      <!-- begin register-header -->
      <h1 class="register-header">
        Sign Up
        <small>Create your Color Admin Account.</small>
      </h1>
      <!-- end register-header -->
      <!-- begin register-content -->
      <div class="register-content">
        <div class="margin-bottom-0">
          <label class="control-label"
            >Name <span class="text-danger">*</span></label
          >
          <div class="row m-b-15">
            <div class="col-md-12">
              <input
                type="text"
                class="form-control"
                placeholder="Name"
                required
                v-model="name"
              />
            </div>
          </div>
          <label class="control-label"
            >Middlename <span class="text-danger">*</span></label
          >
          <div class="row m-b-15">
            <div class="col-md-12">
              <input
                type="text"
                class="form-control"
                placeholder="Middlename"
                required
                v-model="middlename"
              />
            </div>
          </div>
          <label class="control-label"
            >Surname <span class="text-danger">*</span></label
          >
          <div class="row m-b-15">
            <div class="col-md-12">
              <input
                type="text"
                class="form-control"
                placeholder="Surname"
                required
                v-model="surname"
              />
            </div>
          </div>

          <label class="control-label"
            >Email <span class="text-danger">*</span></label
          >
          <div class="row m-b-15">
            <div class="col-md-12">
              <input
                type="text"
                class="form-control"
                placeholder="Email address"
                required
                v-model="email"
              />
            </div>
          </div>
          <label class="control-label"
            >Password <span class="text-danger">*</span></label
          >
          <div class="row m-b-15">
            <div class="col-md-12">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                required
                v-model="password"
              />
            </div>
          </div>
          <label class="control-label"
            >Phone <span class="text-danger">*</span></label
          >
          <div class="row m-b-15">
            <div class="col-md-12">
              <input
                type="text"
                class="form-control"
                placeholder="Phone"
                required
                v-model="phone"
              />
            </div>
          </div>
          <label class="control-label"
            >Phone access time <span class="text-danger">*</span></label
          >
          <div class="row m-b-15">
            <div class="col-md-12">
              <input
                type="text"
                class="form-control"
                placeholder="Phone access time"
                required
                v-model="phone_access_time"
              />
            </div>
          </div>
          <div class="register-buttons">
            <!--<button @click="register" class="btn btn-primary btn-block btn-lg">
              Sign Up
            </button>
            -->

            <div class="login-buttons mt-3">
              <vue-recaptcha
                :sitekey="sitekey"
                ref="recaptcha"
                size="invisible"
                @verify="register"
                @expired="onCaptchaExpired"
              >
                <button class="btn btn-primary btn-block btn-lg">
                  Sign Up
                </button>
              </vue-recaptcha>
            </div>
          </div>
          <div class="m-t-20 m-b-40 p-b-40 text-inverse">
            Already a member? Click
            <router-link to="/login">here</router-link> to login.
          </div>
          <hr />
          <p class="text-center">
            &copy; Color Admin All Right Reserved 2020
          </p>
        </div>
      </div>
      <!-- end register-content -->
    </div>
    <!-- end right-content -->
  </div>
  <!-- end register -->
</template>

<script>
import PageOptions from "/src/config/PageOptions.vue";
import { HTTP } from "/src/config/Http.js";
import { show_error } from "/src/config/Message";
import VueRecaptcha from "vue-recaptcha";

export default {
  components: { VueRecaptcha },
  data() {
    return {
      name: "",
      surname: "",
      middlename: "",
      email: "",
      password: "",
      phone: "",
      phone_access_time: "",
      sitekey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
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
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
    },

    register(recaptchaToken) {
      this.$insProgress.start();
      this.loading = true;
      localStorage.setItem("username", this.username);
      localStorage.setItem("password", this.password);
      HTTP.post("/register", {
        name: this.name,
        surname: this.surname,
        middlename: this.middlename,
        email: this.email,
        password: this.password,
        phone: this.phone,
        phone_access_time: this.phone_access_time,
        recaptcha_token: recaptchaToken,
      })
        .then((resp) => {
          console.log("resp", resp);
          localStorage.setItem("access_token", resp.data.data.access_token);
          localStorage.setItem("user_name", resp.data.data.user_name);
          //location.href = "/";
          this.$router.push({ path: "home" });
        })
        .catch((error) => {
          console.log("error", error);
          console.log("error.message", error.message);
          console.log("error.response.data", error.response.data);
          console.log(error.response.data.message);
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
