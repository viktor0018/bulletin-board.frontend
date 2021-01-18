function parseError(error) {
  if (error == "Unauthenticated.") {
    /*
       this.$store.dispatch("destroyToken").then(response => {
          location.href = process.env.MIX_APP_LOGOUT_URL;
       });

       location.reload();
       */
    return "Произошла ошибка при попытке авторизации. Попробуйте зайти на сайт еще раз";
  }
  return error;
}

function show_message(notify, text) {
  text = parseError(text);
  notify({
    group: "bottom-right",
    title: "Сообщение",
    type: "info",
    text: text,
  });
}

function show_error(notify, text) {
  text = parseError(text);
  notify({
    group: "bottom-right",
    title: "Ошибка",
    type: "warn",
    text: text,
  });
}

export { show_message, show_error };
