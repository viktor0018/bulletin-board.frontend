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
              No regions...
            </div>
          </div>
          <div slot="table-actions">
            <button
              class="btn  btn-info m-r-10"
              style="height:32px"
              @click="regionCreate"
            >
              <i class="fas fa-plus"></i>
              Add region
            </button>
          </div>

          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'id'">
              <div class="col-auto d-flex flex-column">
                <button
                  @click="regionShow(props.row)"
                  type="button"
                  class="btn btn-default btn-sm m-5"
                  style="display:flex;width:80px"
                >
                  Show
                </button>
                <button
                  @click="regionEdit(props.row)"
                  type="button"
                  class="btn btn-default btn-sm m-5"
                  style="display:flex;width:80px"
                >
                  Edit
                </button>

                <button
                  @click="regionDelete(props.row)"
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

      columns: [
        {
          label: "Name",
          field: "name",
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
    this.getRegions();
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

    regionShow(row) {
      console.log(row.id);
      this.$router.push({ name: "RegionShow", params: { id: row.id } });
    },

    regionEdit(row) {
      this.$router.push({ name: "RegionEdit", params: { id: row.id } });
    },
    regionCreate() {
      this.$router.push({ name: "RegionCreate" });
    },
    regionDelete(row) {
      if (window.confirm("Are you sure?")) {
        HTTP.post("/admin/region/destroy?", { id: row.id })
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
    getRegions() {
      HTTP.get("/admin/region/index")
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
