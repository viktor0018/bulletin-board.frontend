<template>
  <div>
    <!-- end page-header -->
    <panel title="category show">
      <div class=" form-bordered">
        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Name</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="Name"
              class="form-control"
              v-model="category.name"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Slug</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="slug"
              class="form-control"
              v-model="category.slug"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Parent</label>
          <div class="col-sm-9">
            <select
              v-model="category.parent_id"
              name="category.region_id"
              id="category.region_id"
              class="form-control"
              tabindex="12"
            >
              <option
                v-for="parent in parents"
                :key="parent.id"
                :value="parent.id"
                >{{ parent.name }}</option
              >
            </select>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-7 offset-md-5">
            <button class="btn btn-sm btn-white m-r-5" @click="cancel()">
              Back
            </button>
            <button
              class="btn btn-sm btn-white m-r-5"
              @click="createCategory()"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
import PageOptions from "/src/config/PageOptions.vue";
import { HTTP } from "/src/config/Http.js";

//import { show_error } from "../../config/Message";

export default {
  data() {
    return {
      category: {},
      parents: {},
    };
  },

  monted() {},
  created() {
    console.log("created");
    this.getRegions();
    this.getParents();
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    createCategory() {
      HTTP.post("/admin/category/create", {
        name: this.category.name,
        slug: this.category.slug,
        region_id: this.category.region_id,
      })
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$router.push({ name: "CategoryList" });
        });
    },
    getParents() {
      HTTP.get("/admin/category/index")
        .then((resp) => {
          console.log(resp.data);
          this.parents = resp.data.data.items;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    cancel() {
      this.$router.push({ name: "CategoryList" });
    },
  },
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
}

.pagination li {
  display: block;
}
</style>
