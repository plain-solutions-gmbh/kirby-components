<template>
  <k-field v-bind="$props" class="k-blocks-field k-components-field">
    <template #options>
      <k-dropdown v-if="hasFieldsets">
        <k-button icon="dots" @click="$refs.options.toggle()" />
        <k-dropdown-content ref="options" align="right">
          <k-dropdown-item
            :disabled="isFull"
            icon="add"
            @click="$refs.blocks.choose(value.length)"
          >
            {{ $t("add") }}
          </k-dropdown-item>
          <hr />
          <k-dropdown-item
            :disabled="isEmpty"
            icon="template"
            @click="$refs.blocks.copyAll()"
          >
            {{ $t("copy.all") }}
          </k-dropdown-item>
          <k-dropdown-item
            :disabled="isFull"
            icon="download"
            @click="$refs.blocks.pasteboard()"
          >
            {{ $t("paste") }}
          </k-dropdown-item>
          <hr />
          <k-dropdown-item
            :disabled="isEmpty"
            icon="trash"
            @click="$refs.blocks.confirmToRemoveAll()"
          >
            {{ $t("delete.all") }}
          </k-dropdown-item>
        </k-dropdown-content>
      </k-dropdown>
    </template>

    <k-component-blocks
      ref="blocks"
      :autofocus="autofocus"
      :compact="false"
      :empty="empty"
      :endpoints="endpoints"
      :fieldsets="fieldsets"
      :fieldset-groups="fieldsetGroups"
      :group="group"
      :max="max"
      :value="value"
      @close="opened = $event"
      @open="opened = $event"
      v-on="$listeners"
    />

    <k-button
      v-if="!isEmpty && !isFull"
      class="k-field-add-item-button"
      icon="add"
      :tooltip="$t('add')"
      @click="$refs.blocks.choose(value.length)"
    />
  </k-field>
</template>
<script>
export default {
  extends: "k-blocks-field",
  inheritAttrs: false,
};
</script>