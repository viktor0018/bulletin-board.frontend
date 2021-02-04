<script>
import Home from "../pages/User/Home.vue";
import Main from "../pages/Main.vue";
import Login from "../pages/Auth/Login.vue";
import Register from "../pages/Auth/Register.vue";

import Product from "../pages/Auth/Product.vue";
import Logout from "../pages/Auth/Logout.vue";
import PasswordForgot from "../pages/Auth/PasswordForgot.vue";
import PasswordReset from "../pages/Auth/PasswordReset.vue";
import VerifyEmail from "../pages/Auth/VerifyEmail.vue";
import Advert from "../pages/User/Advert.vue";
import AdvertCreate from "../pages/User/AdvertCreate.vue";
import AdvertEdit from "../pages/User/AdvertEdit.vue";
import Moderate from "../pages/Moderator/Moderate.vue";
import UserList from "../pages/Admin/User/UserList.vue";
import UserEdit from "../pages/Admin/User/UserEdit.vue";
import UserShow from "../pages/Admin/User/UserShow.vue";
import UserCreate from "../pages/Admin/User/UserCreate.vue";
import RegionList from "../pages/Admin/Region/RegionList.vue";
import RegionShow from "../pages/Admin/Region/RegionShow.vue";
import RegionEdit from "../pages/Admin/Region/RegionEdit.vue";
import RegionCreate from "../pages/Admin/Region/RegionCreate.vue";

import CityList from "../pages/Admin/City/CityList.vue";
import CityShow from "../pages/Admin/City/CityShow.vue";
import CityEdit from "../pages/Admin/City/CityEdit.vue";
import CityCreate from "../pages/Admin/City/CityCreate.vue";

import CategoryList from "../pages/Admin/Category/CategoryList.vue";
import CategoryShow from "../pages/Admin/Category/CategoryShow.vue";
import CategoryEdit from "../pages/Admin/Category/CategoryEdit.vue";
import CategoryCreate from "../pages/Admin/Category/CategoryCreate.vue";

const routes = [
  { path: "/", component: Main },
  { path: "/home", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/logout", component: Logout },
  // { path: "/profile", component: Profile },
  { path: "/product", component: Product },
  { path: "/password_forgot", component: PasswordForgot },
  { path: "/password_reset", component: PasswordReset },
  { path: "/verify-email/:id/:hash/", component: VerifyEmail },
  { path: "/advert/create", component: AdvertCreate, name: "AdvertCreate" },
  { path: "/advert/edit/:id", component: AdvertEdit, name: "AdvertEdit" },
  { path: "/advert/:id", component: Advert, name: "AdvertShow" },
  { path: "/moderate", component: Moderate, name: "Moderate" },
  { path: "/admin/userlist", component: UserList, name: "UserList" },
  { path: "/admin/useredit/:id", component: UserEdit, name: "UserEdit" },
  { path: "/admin/usershow/:id", component: UserShow, name: "UserShow" },
  { path: "/admin/usercreate", component: UserCreate, name: "UserCreate" },
  { path: "/admin/region/list", component: RegionList, name: "RegionList" },
  { path: "/admin/region/show/:id", component: RegionShow, name: "RegionShow" },
  { path: "/admin/region/edit/:id", component: RegionEdit, name: "RegionEdit" },
  {
    path: "/admin/region/create",
    component: RegionCreate,
    name: "RegionCreate",
  },
  { path: "/admin/city/list", component: CityList, name: "CityList" },
  { path: "/admin/city/show/:id", component: CityShow, name: "CityShow" },
  { path: "/admin/city/edit/:id", component: CityEdit, name: "CityEdit" },
  {
    path: "/admin/city/create",
    component: CityCreate,
    name: "CityCreate",
  },

  {
    path: "/admin/category/list",
    component: CategoryList,
    name: "CategoryList",
  },
  {
    path: "/admin/category/show/:id",
    component: CategoryShow,
    name: "CategoryShow",
  },
  {
    path: "/admin/category/edit/:id",
    component: CategoryEdit,
    name: "CategoryEdit",
  },
  {
    path: "/admin/category/create",
    component: CategoryCreate,
    name: "CategoryCreate",
  },
];

export default routes;
</script>
