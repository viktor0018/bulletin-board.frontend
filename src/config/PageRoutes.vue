<script>
import Home from "../pages/Home.vue";
import Main from "../pages/Main.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import Product from "../pages/Product.vue";
import Logout from "../pages/Logout.vue";
import PasswordForgot from "../pages/PasswordForgot.vue";
import PasswordReset from "../pages/PasswordReset.vue";
import VerifyEmail from "../pages/VerifyEmail.vue";
import Advert from "../pages/Advert.vue";
import AdvertCreate from "../pages/AdvertCreate.vue";
import AdvertEdit from "../pages/AdvertEdit.vue";

const routes = [
  { path: "/", component: Main },
  { path: "/home", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/logout", component: Logout },
  { path: "/profile", component: Profile },
  { path: "/product", component: Product },
  { path: "/password_forgot", component: PasswordForgot },
  { path: "/password_reset", component: PasswordReset },
  { path: "/verify-email/:id/:hash/", component: VerifyEmail },
  { path: "/advert/create", component: AdvertCreate, name: "AdvertCreate" },
  { path: "/advert/edit/:id", component: AdvertEdit, name: "AdvertEdit" },
  { path: "/advert/:id", component: Advert, name: "AdvertShow" },
];

export default routes;
</script>
