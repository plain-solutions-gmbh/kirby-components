<script>
export default {
  //Extends because the endpoint
  extends: "k-block",
  inheritAttrs: false,
  computed: {
    tabs() {
      let tabs = this.fieldset.tabs;
      Object.entries(tabs).forEach(([tabName, tab]) => {
        Object.entries(tab.fields).forEach(([fieldName]) => {
          tabs[tabName].fields[fieldName].section = this.name;
          tabs[tabName].fields[fieldName].endpoints = {
            field:
              this.endpoints.field +
              "/_component_/" +
              this.type.replace("/", "__") +
              "/fields/" +
              fieldName,
            section: this.endpoints.section,
            model: this.endpoints.model,
          };
        });
      });
      return tabs;
    },
  },
};
</script>
