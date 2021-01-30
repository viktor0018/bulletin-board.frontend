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
              No adverts...
            </div>
          </div>
          <div slot="table-actions">
            <button
              class="btn  btn-info m-r-10"
              style="height:32px"
              @click="advertCreate"
            >
              <i class="fas fa-plus"></i>
              Add advert
            </button>
          </div>

          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'id'">
              <div>
                <button
                  @click="advertShow(props.row)"
                  type="button"
                  class="btn btn-default btn-sm m-r-10"
                >
                  Show
                </button>
                <button
                  @click="advertEdit(props.row)"
                  type="button"
                  class="btn btn-default btn-sm m-r-10"
                >
                  Edit
                </button>
                <button
                  @click="advertDelete(props.row)"
                  type="button"
                  class="btn btn-default btn-sm m-r-10"
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
import PageOptions from "../config/PageOptions.vue";
import { HTTP } from "../config/Http.js";

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
          label: "Title",
          field: "title",
        },
        {
          label: "Description",
          field: "description",
        },
        {
          label: "Status",
          field: "status.status",
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
    this.getAdverts();
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

    advertShow(row) {
      this.$router.push({ name: "AdvertShow", params: { id: row.id } });
    },

    advertEdit(row) {
      this.$router.push({ name: "AdvertEdit", params: { id: row.id } });
    },
    advertCreate() {
      this.$router.push({ name: "AdvertCreate" });
    },
    advertDelete(row) {
      if (window.confirm("Are you sure?")) {
        HTTP.post("/advert/destroy?id=" + row.id)
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
    getAdverts() {
      HTTP.get("/myadverts")
        .then((resp) => {
          console.log(resp.data);
          this.rows = resp.data.data.items;
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
