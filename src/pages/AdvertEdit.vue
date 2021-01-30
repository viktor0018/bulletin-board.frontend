<template>
  <div>
    <!-- end page-header -->
    <panel title="Advert edit">
      <div class=" form-bordered">
        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Title</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="Title"
              class="form-control"
              v-model="title"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Description</label>
          <div class="col-sm-9">
            <textarea
              type="text"
              placeholder="Description"
              class="form-control"
              v-model="description"
            />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Category</label>
          <div class="col-sm-9">
            <select
              v-model="category_id"
              name="category"
              id="category"
              class="form-control"
              tabindex="12"
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                >{{ category.name }}</option
              >
            </select>
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">City</label>
          <div class="col-sm-9">
            <select
              v-model="city_id"
              name="city"
              id="city"
              class="form-control"
              tabindex="12"
            >
              <option v-for="city in cities" :key="city.id" :value="city.id">{{
                city.name
              }}</option>
            </select>
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Price</label>
          <div class="col-sm-9">
            <input
              type="text"
              placeholder="City"
              class="form-control"
              v-model="price"
            />
          </div>
        </div>

        <div class="form-group row m-b-15" v-if="photos.length">
          <label class="col-sm-3 col-form-label">Pictures</label>

          <div class="col-sm-9 text-center">
            <div
              style="width:100%"
              v-for="photo in photos"
              :key="photo.id"
              :value="photo.id"
            >
              <img
                v-bind:src="'http://0.0.0.0/' + photo.link"
                width="100"
                class="m-10"
              />
              <span v-if="photo.is_main" class="m-r-10">
                <b>Main photo</b>
              </span>
              <button
                v-if="!photo.is_main"
                class="btn btn-sm btn-white m-r-5"
                @click="makeMainImage(photo.id)"
              >
                Make main
              </button>
              <button
                class="btn btn-sm btn-white m-r-5"
                @click="deleteImage(photo.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-sm-3 col-form-label">Picture</label>

          <div class="col-sm-9 text-center">
            <input
              type="file"
              name="picture"
              class="form-control-file"
              id="picture"
              @change="onFileChange"
            />

            <img
              v-bind:src="imagePreview"
              width="100"
              v-show="showPreview"
              class="m-10"
            />

            <button
              v-show="showPreview"
              class="btn btn-sm btn-white m-r-5"
              @click="submitForm()"
            >
              Upload
            </button>
            <button
              v-show="showPreview"
              class="btn btn-sm btn-white m-r-5"
              @click="cancelForm()"
            >
              Cancel
            </button>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-7 offset-md-5">
            <button class="btn btn-sm btn-white m-r-5" @click="cancel()">
              Back
            </button>
            <button class="btn btn-sm btn-white m-r-5" @click="updateAdvert()">
              Update
            </button>
          </div>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
import PageOptions from "../config/PageOptions.vue";
import { HTTP } from "../config/Http.js";
import { getList } from "../config/Library";

export default {
  data() {
    return {
      id: 0,
      title: "",
      description: "",
      price: 0,
      category_id: 0,
      city_id: 0,
      cities: {},
      categories: {},
      formFields: {
        picture: null,
      },
      imagePreview: null,
      showPreview: false,

      photos: {},
    };
  },

  monted() {},
  created() {
    console.log("created");
    this.id = this.$route.params.id;
    getList(this.$data);

    this.getAdvert();
    this.getPhotos();
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    makeMainImage(id) {
      HTTP.post("/photo/update", { id })
        .then((res) => {
          console.log(res);
          this.getPhotos();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteImage(id) {
      if (window.confirm("Are you sure?")) {
        HTTP.post("/photo/delete", { id })
          .then((res) => {
            console.log(res);
            this.getPhotos();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    cancelForm() {
      this.formFields.picture = null;
      this.imagePreview = null;
      this.showPreview = false;
    },
    onFileChange(event) {
      /*
    Set the local file variable to what the user has selected.
    */
      this.formFields.picture = event.target.files[0];

      /*
    Initialize a File Reader object
    */
      let reader = new FileReader();

      /*
    Add an event listener to the reader that when the file
    has been loaded, we flag the show preview as true and set the
    image to be what was read from the reader.
    */
      reader.addEventListener(
        "load",
        function() {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );

      /*
    Check to see if the file is not empty.
    */
      if (this.formFields.picture) {
        /*
            Ensure the file is an image file.
        */
        if (/\.(jpe?g|png|gif)$/i.test(this.formFields.picture.name)) {
          console.log("here");
          /*
            Fire the readAsDataURL method which will read the file in and
            upon completion fire a 'load' event which we will listen to and
            display the image in the preview.
            */
          reader.readAsDataURL(this.formFields.picture);
        }
      }
    },
    submitForm() {
      let formData = new FormData();

      formData.append("picture", this.formFields.picture);
      formData.append("advert_id", this.id);

      HTTP.post("/photo/store", formData)
        .then((res) => {
          console.log(res);
          this.cancelForm();
          this.getPhotos();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateAdvert() {
      HTTP.post("/advert/update", {
        id: this.id,
        title: this.title,
        description: this.description,
        price: this.price,
        category_id: this.category_id,
        city_id: this.city_id,
      })
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$router.push({ path: "/home" });
        });
    },
    getPhotos() {
      HTTP.get("/photos", {
        params: {
          advert_id: this.id,
        },
      })
        .then((resp) => {
          console.log(resp.data);
          this.photos = resp.data.data.items;
          console.log(this.photos);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },

    getAdvert() {
      HTTP.get("/advert/show?id=" + this.id)
        .then((resp) => {
          console.log(resp);

          resp = resp.data.data.item;
          console.log("resp", resp);
          console.log("resp", resp.title);
          this.title = resp.title;
          this.description = resp.description;
          this.price = resp.price;
          this.category_id = resp.category.id;
          this.city_id = resp.city.id;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },

    cancel() {
      this.$router.push({ path: "/home" });
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
