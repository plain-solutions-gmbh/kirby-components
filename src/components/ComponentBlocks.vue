<template>
  <div
    ref="wrapper"
    :data-empty="blocks.length === 0"
    :data-multi-select-key="isMultiSelectKey"
    class="k-blocks"
    @focusin="focussed = true"
    @focusout="focussed = false"
  >
    <template v-if="hasFieldsets">
      <k-draggable v-bind="draggableOptions" class="k-blocks-list" @sort="save">
        <k-component-block
          v-for="(block, index) in blocks"
          :ref="'block-' + block.id"
          :key="block.id"
          v-bind="block"
          :endpoints="endpoints"
          :fieldset="fieldset(block)"
          :is-batched="isBatched(block)"
          :is-last-in-batch="isLastInBatch(block)"
          :is-full="isFull"
          :is-hidden="block.isHidden === true"
          :is-selected="isSelected(block)"
          :next="prevNext(index + 1)"
          :prev="prevNext(index - 1)"
          @append="append($event, index + 1)"
          @blur="select(null)"
          @choose="choose($event)"
          @chooseToAppend="choose(index + 1)"
          @chooseToConvert="chooseToConvert(block)"
          @chooseToPrepend="choose(index)"
          @close="isEditing = false"
          @copy="copy()"
          @confirmToRemoveSelected="confirmToRemoveSelected"
          @click.native.stop="select(block, $event)"
          @duplicate="duplicate(block, index)"
          @focus="select(block)"
          @hide="hide(block)"
          @open="isEditing = true"
          @paste="pasteboard()"
          @prepend="add($event, index)"
          @remove="remove(block)"
          @sortDown="sort(block, index, index + 1)"
          @sortUp="sort(block, index, index - 1)"
          @show="show(block)"
          @update="update(block, $event)"
        />
        <template #footer>
          <k-empty
            class="k-blocks-empty"
            icon="box"
            @click="choose(blocks.length)"
          >
            {{ empty || $t("field.blocks.empty") }}
          </k-empty>
        </template>
      </k-draggable>

      <k-block-selector
        ref="selector"
        :fieldsets="fieldsets"
        :fieldset-groups="fieldsetGroups"
        @add="add"
        @convert="convert"
        @paste="paste($event)"
      />

      <k-remove-dialog
        ref="removeAll"
        :text="$t('field.blocks.delete.confirm.all')"
        @submit="removeAll"
      />

      <k-remove-dialog
        ref="removeSelected"
        :text="$t('field.blocks.delete.confirm.selected')"
        @submit="removeSelected"
      />

      <k-block-pasteboard ref="pasteboard" @paste="paste($event)" />
    </template>
    <template v-else>
      <k-box theme="info"> No fieldsets yet </k-box>
    </template>
  </div>
</template>

<script>
export default {
  //Extends because the endpoint
  extends: "k-blocks",
  inheritAttrs: false,
  methods: {
    async add(type = "text", index) {
      type = type.replace("/", "__");
      const block = await this.$api.get(
        this.endpoints.field + "/_component_/" + type
      );
      this.blocks.splice(index, 0, block);
      this.save();

      this.$nextTick(() => {
        this.focusOrOpen(block);
      });
    },
    async convert(type, block) {
      const index = this.findIndex(block.id);

      if (index === -1) {
        return false;
      }

      const fields = (fieldset) => {
        let fields = {};

        for (const tab of Object.values(fieldset?.tabs ?? {})) {
          fields = {
            ...fields,
            ...tab.fields,
          };
        }

        return fields;
      };

      const oldBlock = this.blocks[index];
      const newBlock = await this.$api.get(
        this.endpoints.field + "/_component_/" + type.replace("/", "__")
      );

      const oldFieldset = this.fieldsets[oldBlock.type];
      const newFieldset = this.fieldsets[type];

      if (!newFieldset) {
        return false;
      }

      let content = newBlock.content;

      const newFields = fields(newFieldset);
      const oldFields = fields(oldFieldset);

      for (const [name, field] of Object.entries(newFields)) {
        const oldField = oldFields[name];

        if (oldField?.type === field.type && oldBlock?.content?.[name]) {
          content[name] = oldBlock.content[name];
        }
      }

      this.blocks[index] = {
        ...newBlock,
        id: oldBlock.id,
        content: content,
      };

      this.save();
    },
  },
};
</script>
