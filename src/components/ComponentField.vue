<template>
  <k-field
    v-bind="$props"
    :input="_uid"
    :counter="counterOptions"
    class="k-component-field"
  >
    <k-component-license  v-if="showLicense" @onSuccess="showLicense = false" />
    <k-imagetoggles-field
      v-if="!issingle"
      v-bind="selector"
      :value="current"
      :label="label"
      @input="setFieldset($event)"
    />
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
  </k-field>
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

<style>

.k-component-form {
  margin-top:1.5em;
}

</style>