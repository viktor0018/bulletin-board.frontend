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
              No cities...
            </div>
          </div>
          <div slot="table-actions">
            <button
              class="btn  btn-info m-r-10"
              style="height:32px"
              @click="cityCreate"
            >
              <i class="fas fa-plus"></i>
              Add city
            </button>
          </div>

          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'id'">
              <div class="col-auto d-flex flex-column">
                <button
                  @click="cityShow(props.row)"
                  type="button"
                  class="btn btn-default btn-sm m-5"
                  style="display:flex;width:80px"
                >
                  Show
                </button>
                <button
                  @click="cityEdit(props.row)"
                  type="button"
                  class="btn btn-default btn-sm m-5"
                  style="display:flex;width:80px"
                >
                  Edit
                </button>

                <button
                  @click="cityDelete(props.row)"
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
      advertData: {},
      regions: {},

      columns: [
        {
          label: "Region",
          field: "region.name",
        },
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Slug",
          field: "slug",
        },
        {
          label: "Action",
          field: "id",
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
    this.getcitys();
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

    cityShow(row) {
      console.log(row.id);
      this.$router.push({ name: "CityShow", params: { id: row.id } });
    },

    cityEdit(row) {
      this.$router.push({ name: "CityEdit", params: { id: row.id } });
    },
    cityCreate() {
      this.$router.push({ name: "CityCreate" });
    },
    cityDelete(row) {
      if (window.confirm("Are you sure?")) {
        HTTP.post("/admin/city/destroy?", { id: row.id })
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
    getcitys() {
      HTTP.get("/admin/city/index")
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
