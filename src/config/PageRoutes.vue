<script>
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import Product from "../pages/Product.vue";
import Logout from "../pages/Logout.vue";
import PasswordForgot from "../pages/PasswordForgot.vue";
import PasswordReset from "../pages/PasswordReset.vue";
import VerifyEmail from "../pages/VerifyEmail.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/logout", component: Logout },
  { path: "/profile", component: Profile },
  { path: "/product", component: Product },
  { path: "/password_forgot", component: PasswordForgot },
  { path: "/password_reset", component: PasswordReset },
  { path: "/verify-email/:id/:hash/", component: VerifyEmail },
];

export default routes;
</script>
