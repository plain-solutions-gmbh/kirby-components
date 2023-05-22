<template>
<div>
  <k-field
    v-if="!issingle"
    v-bind="$props"
    :input="_uid"
    :counter="counterOptions"
    class="k-component-field"
  >
    <k-component-license  v-if="showLicense" @onSuccess="showLicense = false" />
    <k-imagetoggles-field
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
  <div v-else>
    <k-component-form
    v-bind="fieldsets[current]"
    :type="current"
    :value="components[current].content"
    :endpoints="endpoints"
    @update="input(current, $event)"
    />
  </div>
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
  watch: {
    components() {
      this.components = this.value;
    },
  },
  created() {
    this.showLicense = !this.license
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