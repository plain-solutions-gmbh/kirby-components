<template>
  <div
    :id="id"
    :hidden="hidden || currentTabs.length === 0"
    class="k-component-form"
  >
    <k-grid>
      <k-column v-if="currentTabs.length > 1">
        <k-component-tabs
          :tab="currentTab"
          :tabs="currentTabs"
          @update="tab = $event"
        />
      </k-column>
      <k-column>
        <k-form
          v-for="(thistab, componentType) in parsedTabs"
          :key="componentType"
          ref="form"
          :hidden="componentType !== currentTab"
          :autofocus="true"
          :fields="thistab.fields"
          :value="value"
          @input="$emit('update', $event)"
          @invalid="$emit('invalid', $event)"
        />
      </k-column>
    </k-grid>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    endpoints: Object,
    hidden: {
      type: Boolean,
      default() {
        return false;
      },
    },
    icon: String,
    id: String,
    tabs: Object,
    type: String,
    value: Object,
  },
  data() {
    return {
      tab: null,
    };
  },
  computed: {
    currentTab() {
      if (this.tab === null) {
        this.tab = this.currentTabs.filter((a) => a.active)?.[0]?.name;
      }
      let available = this.currentTabs.filter((a) => a.name === this.tab);
      if (available.length > 0) {
        return this.tab;
      }
      return this?.currentTabs[0]?.name ?? Object.keys(this.tabs)[0];
    },
    currentTabs() {
      let tabarray = [];
      Object.entries(this.tabs).forEach(([tabName, tab]) => {
        if (Object.keys(this.tabs[tabName].fields).length > 0) {
          tabarray.push({
            name: tabName,
            icon: tab.icon,
            label: tab.label,
            active: tab.active ?? false,
          });
        }
      });
      return tabarray;
    },
    parsedTabs() {
      let tabs = this.tabs;
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
