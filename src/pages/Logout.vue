<template> <div></div></template>

<script>
import { HTTP } from "../config/Http.js";
export default {
  created() {
    HTTP.post("/logout", {})
      .then(() => {})
      .finally(() => {
        localStorage.setItem("access_token", "");
        localStorage.setItem("user_name", "");
        location.href = "/";
      });
  },
};
</script>
