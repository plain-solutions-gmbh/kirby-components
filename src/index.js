import ComponentField from "./components/ComponentField.vue";
import ComponentsField from "./components/ComponentsField.vue";
import ImagetogglesField from "./components/ImagetogglesField.vue";
import ComponentForm from "./components/ComponentForm.vue";
import ComponentBlocks from "./components/ComponentBlocks.vue";
import ComponentBlock from "./components/ComponentBlock.vue";
import ComponentTabs from "./components/ComponentTabs.vue";
import ComponentLicense from "./components/ComponentLicense.vue";

window.panel.plugin("microman/components-field", {
  fields: {
    component: ComponentField,
    components: ComponentsField,
    imagetoggles: ImagetogglesField,
  },
  components: {
    "k-component-form": ComponentForm,
    "k-component-blocks": ComponentBlocks,
    "k-component-block": ComponentBlock,
    "k-component-tabs": ComponentTabs,
    "k-component-license": ComponentLicense,
  },
});
