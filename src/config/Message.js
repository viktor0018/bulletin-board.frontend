function show_message(notify, text) {
  notify({
    group: "bottom-right",
    title: "Message:",
    type: "primary",
    text: text,
  });
}

function show_error(notify, error) {
  const text =
    "<h4>" +
    error.response.data.message +
    "</h4>" +
    Object.values(error.response.data.data.item.item).join("  ");
  notify({
    group: "bottom-right",
    title: "",
    type: "error",
    text: text,
  });
}

export { show_message, show_error };
