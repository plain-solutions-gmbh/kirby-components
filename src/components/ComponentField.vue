<template>
  <div class="k-component-field">
    <k-grid>
      <k-column v-if="showLicense">
        <k-component-license @onSuccess="showLicense = false" />
      </k-column>
      <k-column v-if="!issingle">
        <k-imagetoggles-field
          v-bind="selector"
          :value="current"
          :label="label"
          @input="setFieldset($event)"
        />
      </k-column>
      <k-column>
        <k-component-form
          v-for="(component, componentName) in components"
          :key="componentName"
          v-bind="fieldsets[component.type]"
          :type="component.type"
          :hidden="!component.isSelected"
          :value="component.content"
          :endpoints="endpoints"
          @update="input(componentName, $event)"
        />
      </k-column>
    </k-grid>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    endpoints: Object,
    selector: Object,
    issingle: Boolean,
    name: String,
    fieldsets: Object,
    fields: Object,
    value: Object,
    license: Boolean,
  },
  data() {
    return {
      components: this.value,
      showLicense: true,
    };
  },
  computed: {
    current() {
      let current = "";
      Object.entries(this.components).forEach(([name, component]) => {
        if (component.isSelected) {
          current = name;
        }
      });
      return current;
    },
  },
  created() {
    this.showLicense = !this.license
  },
  watch: {
    components() {
      this.components = this.value;
    },
  },
  methods: {
    input(name, value) {
      this.components[name].content = value;
      this.$emit("input", this.components);
    },
    setFieldset(v) {
      Object.entries(this.components).forEach(([name, component]) => {
        this.components[name].isSelected = component.type === v;
      });
      this.$emit("input", this.components);
    },
  },
};
</script>
