import { HTTP } from "./Http.js";

function getPhotos(data) {
  HTTP.get("/photos", {
    params: {
      advert_id: data.id,
    },
  })
    .then((resp) => {
      console.log(resp.data);
      data.photo_arr = resp.data.data.items;
      console.log("data.photos", data.photos);
      data.photos = data.photo_arr.map((x) => "http://0.0.0.0/" + x.link);
      console.log("data.photos", data.photos);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
}

export { getPhotos };
