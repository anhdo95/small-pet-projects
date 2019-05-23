
var helper = (function () {
  return {
    slug: function (text) {
      return text.toLowerCase()
        .replace(/\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\=|\+|\[|\]|\{|\}|\;|\:|\'|\"|\,|\.|\<|\>|\/|\\|\?/g, '')
        .replace(/\s/g, '-')
        .replace(/(\-){2,}/g, '-');
    }
  }
})();


Vue.component("menu-item", {
  props: ["idiom"],
  methods: {
    renderLink: function () {
      return `#${helper.slug(this.idiom.name)}`;
    }
  },
  template: `
    <li>
      <a :href="renderLink()" :title="idiom.name">
        {{ idiom.name }}
      </a>
    </li>
  `,
});

Vue.component("examples", {
  props: ['examples'],
  template: `
    <ol class="examples">
      <li v-for="example in examples">
        {{ example }}
      </li>
    </ol>
  `,
})

Vue.component("idiom-item", {
  props: ["idiom"],
  methods: {
    renderLink: function () {
      return helper.slug(this.idiom.name);
    }
  },
  template: `
    <section :id="renderLink()" class="idiom">
      <dl>
        <dt>
          <h3>{{ idiom.name }}</h3>
        </dt>
        <dd class="meaning">{{ idiom.meaning }}</dd>
        <examples :examples="idiom.examples"></examples>
      </dl>
    </section>
  `,
})

Vue.component("footer-component", {
  template: `
    <footer id="footer">
      All the idioms, phrasal verbs and essential structures of English are collected while breaking my back periods of time to build up this site.
      <p>&copy; All rights reserved by community</p>
    </footer>
  `
})

var app = new Vue({
  el: "#app",
  data: {
    idioms: [],
    filteredIdioms: [],
  },
  methods: {
    search: function (event) {
      var keyword = event.target.value.toLowerCase();

      this.filteredIdioms = this.idioms.filter(function (idiom) {
        return idiom.name.toLowerCase().includes(keyword);
      })
    }
  },
  mounted: function () {
    var EXCEL_PATH_FILE = "./assets/data.json";

    fetch(EXCEL_PATH_FILE)
      .then(function (response) {
        return response.json();
      })
      .then(function (idioms) {
        app.idioms = idioms;
        app.filteredIdioms = idioms;
      });
  }
});
