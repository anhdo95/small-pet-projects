var app = new Vue({
  el: "#app",
  data: {
    idioms: []
  }
});

var EXCEL_PATH_FILE = "./assets/data.json";

fetch(EXCEL_PATH_FILE)
  .then(function(response) {
    return response.json();
  })
  .then(function(idioms) {
    app.idioms = idioms;
    console.log("app :", app.idioms);
  });
