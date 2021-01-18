<script>
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import Product from "../pages/Product.vue";
import Logout from "../pages/Logout.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/logout", component: Logout },
  { path: "/profile", component: Profile },
  { path: "/product", component: Product },
];

export default routes;
</script>
