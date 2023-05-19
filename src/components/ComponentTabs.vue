<template>
  <div v-if="tabs && tabs.length > 1" :data-theme="theme" class="k-tabs">
    <nav>
      <k-button
        v-for="tabButton in visibleTabs"
        :key="tabButton.name"
        :link="tabButton.link"
        :current="current === tabButton.name"
        :icon="tabButton.icon"
        :tooltip="tabButton.label"
        class="k-tab-button"
        @click="$emit('update', tabButton.name)"
      >
        {{ tabButton.label || tabButton.text || tabButton.name }}

        <span v-if="tabButton.badge" class="k-tabs-badge">
          {{ tabButton.badge }}
        </span>
      </k-button>

      <k-button
        v-if="invisibleTabs.length"
        :text="$t('more')"
        class="k-tab-button k-tabs-dropdown-button"
        icon="dots"
        @click.stop="$refs.more.toggle()"
      />
    </nav>

    <k-dropdown-content
      v-if="invisibleTabs.length"
      ref="more"
      align="right"
      class="k-tabs-dropdown"
    >
      <k-dropdown-item
        v-for="tabButton in invisibleTabs"
        :key="'more-' + tabButton.name"
        :link="tabButton.link"
        :current="tab === tabButton.name"
        :icon="tabButton.icon"
        :tooltip="tabButton.label"
      >
        {{ tabButton.label || tabButton.text || tabButton.name }}
      </k-dropdown-item>
    </k-dropdown-content>
  </div>
</template>

<script>
export default {
  extends: "k-tabs",
  inheritAttrs: false,
};
</script>
