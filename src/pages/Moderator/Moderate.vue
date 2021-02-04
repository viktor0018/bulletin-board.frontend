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
          <div slot="table-actions"></div>

          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'id'">
              <div class="col-auto d-flex flex-column">
                <button
                  @click="advertShow(props.row)"
                  type="button"
                  class="btn btn-default btn-sm m-5"
                  style="display:flex;width:80px"
                >
                  Show
                </button>

                <button
                  @click="advertReject(props.row)"
                  type="button"
                  class="btn btn-default btn-sm m-5"
                  style="display:flex;width:80px"
                >
                  Reject
                </button>

                <button
                  @click="advertActivate(props.row)"
                  type="button"
                  class="btn btn-default btn-sm m-5"
                  style="display:flex;width:80px"
                >
                  Activate
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

    advertReject(row) {
      let reason = prompt("Type reject reason");
      HTTP.post("/moderate/reject", { advert_id: row.id, reason })
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getAdverts();
        });
    },

    advertActivate(row) {
      HTTP.post("/moderate/activate", { advert_id: row.id })
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getAdverts();
        });
    },

    advertShow(row) {
      this.$router.push({ name: "AdvertShow", params: { id: row.id } });
    },

    addNew() {},
    getAdverts() {
      HTTP.get("/moderate/index")
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
