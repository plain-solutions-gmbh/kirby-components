
<template>
	<div
		ref="container"
		:class="[
			'k-block-container-fieldset-' + type,
			containerType ? 'k-block-container-type-' + containerType : ''
		]"
		:data-batched="isBatched"
		:data-disabled="fieldset.disabled"
		:data-hidden="isHidden"
		:data-id="id"
    	:style="'--width: ' + (content.width ?? '1/1')"
		:data-last-selected="isLastSelected"
		:data-selected="isSelected"
		:data-translate="fieldset.translate"
		class="k-block-container"
		tabindex="0"
		@keydown.ctrl.j.prevent.stop="$emit('merge')"
		@keydown.ctrl.alt.down.prevent.stop="$emit('selectDown')"
		@keydown.ctrl.alt.up.prevent.stop="$emit('selectUp')"
		@keydown.ctrl.shift.down.prevent.stop="$emit('sortDown')"
		@keydown.ctrl.shift.up.prevent.stop="$emit('sortUp')"
		@keydown.ctrl.backspace.prevent.stop="remove"
		@focus.stop="$emit('focus')"
		@focusin.stop="onFocusIn"
	>
		<div :class="className" class="k-block">

			<component
				v-if="Object.keys(preview).length === 0" 
				:is="customComponent"
				ref="editor"
				v-bind="$props"
				v-on="listeners"
			/>			
			<k-component-form
				v-else
				class="k-components-preview"
				ref="editor"
				:tabs="preview"
				:value="content"
				v-bind="$props"
				v-on="listeners"
			/>

		</div>

		<k-block-options
			ref="options"
			:is-batched="isBatched"
			:is-editable="isEditable"
			:is-full="isFull"
			:is-hidden="isHidden"
			:is-mergable="isMergable"
			:is-splitable="isSplitable()"
			v-on="{
				...listeners,
				split: () => $refs.editor.split(),
				open: () => {
					if (typeof $refs.editor.open === 'function') {
						$refs.editor.open();
					} else {
						open();
					}
				}
			}"
		/>
	</div>
</template>



<script>
export default {
  //Extends because the endpoint, preview and width
  extends: "k-block",
  inheritAttrs: false,
  created(){
    //console.log(this.preview)
  },
  methods: {
    parseEndpoints(tab) {
      Object.entries(tab.fields).forEach(([fieldName]) => {
        tab.fields[fieldName].section = this.name;
        tab.fields[fieldName].endpoints = {
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
      return tab;
    }
  },
  computed: {
    preview() {
      let obj = {}
      Object.entries(this.fieldset.tabs).forEach(([tabName, tab]) => {
        if(tab.preview === true) {
          obj[tabName] = this.parseEndpoints(tab);
        }
      })
      return obj;
    },
    tabs() {
      let tabs = {}
      Object.entries(this.fieldset.tabs).forEach(([tabName, tab]) => {
        if(tab.preview !== true) {
          tabs[tabName] = this.parseEndpoints(tab);
        }
      });
      return tabs;
    },
  },
};
</script>


<style>
  .k-components-preview .k-field-header > .k-field-label {
    font-size: 0.9em;
    line-height: 0.7em;
}
</style>