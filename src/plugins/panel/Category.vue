<template>
  <div class="form-group row m-b-15">
    <label class="col-sm-3 col-form-label">Category</label>
    <div class="col-sm-9">
      <select
        v-model="value"
        name="category"
        id="category"
        class="form-control"
        tabindex="12"
        @change="categoryChange()"
      >
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          <div v-if="category.level == 1">
            {{ category.name }}
          </div>
          <div v-else-if="category.level == 2">- {{ category.name }}</div>
          <div v-else-if="category.level == 3">-- {{ category.name }}</div>
          <div v-else-if="category.level == 4">--- {{ category.name }}</div>
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { HTTP } from "/src/config/Http.js";

export default {
  name: "Category",
  props: ["category_id"],
  data() {
    return {
      categories: {},
      value: 0,
    };
  },
  created() {
    this.getCategories();
    this.value = this.category_id;
  },
  methods: {
    categoryChange() {
      console.log("categoryChange");
      this.$emit("categoryChange", this.value);
    },

    getCategories() {
      HTTP.get("/admin/category/index")
        .then((resp) => {
          console.log(resp.data);
          this.categories = [
            {
              id: 0,
              name: "Select category",
              slug: "select_category",
              level: 1,
            },
            ...resp.data.data.items,
          ];
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
  },
};
</script>
