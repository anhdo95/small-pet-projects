var helper = (function() {
  return {
    slug: function(text) {
      return text
        .toLowerCase()
        .replace(/\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\=|\+|\[|\]|\{|\}|\;|\:|\'|\"|\,|\.|\<|\>|\/|\\|\?/g, "")
        .replace(/\s/g, "-")
        .replace(/(\-){2,}/g, "-");
    }
  };
})();

Vue.component("menu-item", {
  props: ["idiom"],
  methods: {
    renderLink: function() {
      return `#${helper.slug(this.idiom.name)}`;
    }
  },
  template: `
    <li>
      <a :href="renderLink()" :title="idiom.name">
        {{ idiom.name }}
      </a>
    </li>
  `
});

Vue.component("examples", {
  props: ["examples"],
  template: `
    <ol class="examples">
      <li v-for="example in examples">
        {{ example }}
      </li>
    </ol>
  `
});

Vue.component("idiom-item", {
  props: ["idiom"],
  methods: {
    renderLink: function() {
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
  `
});

var app = new Vue({
  el: "#app",
  data: {
    idioms: [],
    filteredIdioms: [],
    collapsed: true
  },
  methods: {
    search: function(event) {
      var keyword = event.target.value.toLowerCase();

      this.filteredIdioms = this.idioms.filter(function(idiom) {
        return idiom.name.toLowerCase().includes(keyword);
      });
    },
    toggleClass: function() {
      return this.collapsed ? "" : "collapsed";
    },
    toggleMenu: function() {
      this.collapsed = !this.collapsed;
    },
    getIdioms: function() {
      var EXCEL_PATH_FILE = "./assets/data.json";

      fetch(EXCEL_PATH_FILE)
        .then(function(response) {
          return response.json();
        })
        .then(function(idioms) {
          app.idioms = idioms;
          app.filteredIdioms = idioms;
        });
    }
  },
  mounted: function() {
    this.getIdioms();

    if (document.body.clientWidth < 700) {
      this.collapsed = false;
    }
  }
});
