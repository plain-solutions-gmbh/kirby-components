<template>
  <ul
    class="k-toggles-input k-images-toggles-field"
    :data-invalid="$v.$invalid"
    :data-labels="labels"
    :data-hasimages="hasimages"
    :style="input_style"
  >
    <li v-for="(option, index) in options" :key="index" :style="li_style">
      <input
        :id="id + '-' + index"
        :value="option.value"
        :name="id"
        :checked="value === option.value"
        class="input-hidden"
        type="radio"
        @click="onClick(option.value)"
        @change="onInput(option.value)"
      />
      <label
        :for="id + '-' + index"
        :title="option.text"
        class="k-toggles-image-label"
      >
        <div
          v-if="hasimages"
          class="k-toggles-image-wrapper"
          :style="wrapper_style"
        >
          <img
            v-if="option.image"
            class="k-toggles-image"
            :src="option.image"
            :style="image_style"
          />
        </div>
        <k-icon v-if="option.icon && !hasimages" :type="option.icon" />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span class="k-toggles-text" v-html="option.text" />
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  extends: "k-toggles-input",
  inheritAttrs: false,
  props: {
    columns: Number,
    background: String,
    ratio: String,
    fit: String,
    gap: String,
    mobile: Boolean,
    hasimages: Boolean,
    labels: Boolean,
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    reset: Boolean,
    value: [String, Number, Boolean],
  },
  computed: {
    input_style() {
      let style =
        "gap:" +
        this.gap +
        ";--options:" +
        (this.columns || this.options.length);
      if (this.gap !== "1px") {
        style += ";background: none;";
      }
      return style;
    },
    wrapper_style() {
      return {
        paddingTop: this.$helper.ratio(this.ratio, "auto", true),
        border: "1px solid var(--color-border)",
      };
    },
    li_style() {
      if (this.gap !== "1px") {
        return {
          borderRadius: "var(--rounded)",
          overflow: "hidden",
        };
      }
      return {};
    },
    image_style() {
      return {
        objectFit: this.fit,
        background: this.background,
      };
    },
  },
};
</script>

<style lang="scss">
.k-images-toggles-field {
  .k-toggles-image-wrapper {
    position: relative;
    width: 100%;
    height: 0;
  }
  .k-toggles-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  &[data-hasimages] {
    li {
      height: auto;
    }
    label {
      flex-direction: column;
      padding: 0.3em;
    }
    .k-toggles-text {
      display: block;
      padding: 0.6em 0 0.3em;
      text-align: center;
      width: 100%;
    }
  }
}
</style>
