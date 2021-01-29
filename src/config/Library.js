import HTTP from "./Http.js";

function getList(data) {
  HTTP()
    .get("/advert/list")
    .then((resp) => {
      console.log(resp.data);
      data.categories = [
        {
          id: 0,
          name: "Select category",
          slug: "select_category",
        },
        ...resp.data.data.categories,
      ];

      data.cities = [
        {
          id: 0,
          name: "Select city",
          slug: "select_city",
        },
        ...resp.data.data.cities,
      ];

      data.regions = [
        {
          id: 0,
          name: "Select region",
          slug: "select_regions",
        },
        ...resp.data.data.cities,
      ];
    })
    .catch(() => {})
    .finally(() => {});
}

export { getList };
