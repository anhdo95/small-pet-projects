// Use a binding lib in later

$(function() {
  var EXCEL_PATH_FILE = "./assets/data.json";

  $.getJSON(EXCEL_PATH_FILE, function(data) {
    renderMenuItems(data);
    renderSections(data);
  });
});

function createListItem(name) {
  var template = $("#menu-item-template").html();

  return template.replace(/{{ name }}/g, name);
}

function createIdiomSection(data, examples) {
  var template = $("#idiom-section-template").html();

  return template
    .replace(/{{ name }}/g, data.name)
    .replace(/{{ meaning }}/g, data.meaning)
    .replace(/{{ examples }}/g, examples);
}

function renderMenuItems(data) {
  var html = "";

  data.forEach(function(item) {
    html += createListItem(item.name);
  });

  $("#menu").html(html);
}

function renderSections(data) {
  var html = "";

  data.forEach(function(item) {
    var examples = "";

    item.examples.forEach(function(ex) {
      examples += createListItem(ex);
    });

    html += createIdiomSection(item, examples);
  });

  $("#sections").html(html);
}
