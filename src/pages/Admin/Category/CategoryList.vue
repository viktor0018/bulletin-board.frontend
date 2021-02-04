<template>
  <div class="">
    <div class="">
      <div class="">
        <vue-good-table
          :columns="columns"
          :rows="rows"
          ref="table-projects"
          :lineNumbers="false"
          :search-options="{
            enabled: true,

            placeholder: 'Search...',
          }"
          :paginationOptions="{
            enabled: true,
            nextLabel: 'next',
            prevLabel: 'prev',
            rowsPerPageLabel: 'lines',
            ofLabel: 'of',
            allLabel: 'All',
          }"
          :selectOptions="{
            enabled: false,
            selectOnCheckboxOnly: true,
            selectionInfoClass: '',
            selectionText: 'rows selected',
            clearSelectionText: 'Clear',
          }"
          :row-style-class="rowStyleFn"
        >
          <div slot="emptystate">
            <div class="text-center">
              No categories...
            </div>
          </div>
          <div slot="table-actions">
            <button
              class="btn  btn-info m-r-10"
              style="height:32px"
              @click="categoryCreate"
            >
              <i class="fas fa-plus"></i>
              Add category
            </button>
          </div>

          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'idd'">
              <div class="col-auto d-flex flex-column">
                <button
                  @click="categoryShow(props.row)"
                  type="button"
                  class="btn btn-default btn-sm m-5"
                  style="display:flex;width:80px"
                >
                  Show
                </button>
                <button
                  @click="categoryEdit(props.row)"
                  type="button"
                  class="btn btn-default btn-sm m-5"
                  style="display:flex;width:80px"
                >
                  Edit
                </button>

                <button
                  @click="categoryDelete(props.row)"
                  type="button"
                  class="btn btn-default btn-sm m-5"
                  style="display:flex;width:80px"
                >
                  Delete
                </button>
              </div>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>

<script>
import PageOptions from "/src/config/PageOptions.vue";
import { HTTP } from "/src/config/Http.js";

export default {
  data() {
    return {
      value: "",
      adverts: [],
      selectedRow: -1,
      // Our data object that holds the Laravel paginator data
      category: {},

      columns: [
        {
          label: "id",
          field: "id",
        },
        {
          label: "Parent id",
          field: "parent.name",
        },
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Action",
          field: "idd",
          width: "40px",
          tdClass: "text-center text-nowrap",
          thClass: "text-center text-nowrap",
        },
      ],
      rows: [],
    };
  },

  monted() {},
  created() {
    console.log("created");
    this.getCategories();
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    rowStyleFn(row) {
      return row.originalIndex === this.selectedRow
        ? "bg-blue-transparent-1"
        : "";
    },

    categoryShow(row) {
      console.log(row.id);
      this.$router.push({ name: "CategoryShow", params: { id: row.id } });
    },

    categoryEdit(row) {
      this.$router.push({ name: "CategoryEdit", params: { id: row.id } });
    },
    categoryCreate() {
      this.$router.push({ name: "CategoryCreate" });
    },
    categoryDelete(row) {
      if (window.confirm("Are you sure?")) {
        HTTP.post("/admin/category/destroy?", { id: row.id })
          .then((resp) => {
            console.log(resp.data);
            this.rows = this.rows.filter((r) => r.id != row.id);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {});
      }
    },

    addNew() {},
    getCategories() {
      HTTP.get("/admin/category/index")
        .then((resp) => {
          console.log(resp.data);
          this.rows = resp.data.data.items;
          console.log(this.rows);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
  },
};
</script>

<style>
.progress-height {
  margin-top: 2px;
  height: 18px !important;
}

.fa-size {
  font-size: 1.8em;
}

.selectedRow {
  background-color: red;
}

@media (max-width: 767px) {
  .td-visible {
    display: none;
  }

  .td-width {
    min-width: 80% !important;
    max-width: 80% !important;
    width: 80% !important;
  }

  .mobbtn {
    width: 100%;
  }
}
</style>
