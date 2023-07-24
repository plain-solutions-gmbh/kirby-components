(function() {
  "use strict";
  const ComponentField_vue_vue_type_style_index_0_lang = "";
  function normalizeComponent(scriptExports, render, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render) {
      options.render = render;
      options.staticRenderFns = staticRenderFns;
      options._compiled = true;
    }
    if (functionalTemplate) {
      options.functional = true;
    }
    if (scopeId) {
      options._scopeId = "data-v-" + scopeId;
    }
    var hook;
    if (moduleIdentifier) {
      hook = function(context) {
        context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (injectStyles) {
          injectStyles.call(this, context);
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      options._ssrRegister = hook;
    } else if (injectStyles) {
      hook = shadowMode ? function() {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        );
      } : injectStyles;
    }
    if (hook) {
      if (options.functional) {
        options._injectStyles = hook;
        var originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const _sfc_main$7 = {
    props: {
      label: String,
      endpoints: Object,
      selector: Object,
      issingle: Boolean,
      name: String,
      fieldsets: Object,
      fields: Object,
      value: Object,
      license: Boolean
    },
    data() {
      var _a;
      return {
        components: (_a = this.value) != null ? _a : {},
        showLicense: true
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
      }
    },
    created() {
      this.showLicense = !this.license;
    },
    watch: {
      components() {
        this.components = this.value;
      }
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
      }
    }
  };
  var _sfc_render$7 = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("k-field", _vm._b({ staticClass: "k-component-field", class: _vm.issingle ? "k-component-empty" : "", attrs: { "input": _vm._uid, "counter": _vm.counterOptions } }, "k-field", _vm.$props, false), [_vm.showLicense ? _c("k-component-license", { on: { "onSuccess": function($event) {
      _vm.showLicense = false;
    } } }) : _vm._e(), !_vm.issingle ? _c("k-imagetoggles-field", _vm._b({ attrs: { "value": _vm.current, "label": _vm.label }, on: { "input": function($event) {
      return _vm.setFieldset($event);
    } } }, "k-imagetoggles-field", _vm.selector, false)) : _vm._e(), _vm._l(_vm.components, function(component, componentName) {
      return _c("k-component-form", _vm._b({ key: componentName, attrs: { "type": component.type, "hidden": !component.isSelected, "value": component.content, "endpoints": _vm.endpoints }, on: { "update": function($event) {
        return _vm.input(componentName, $event);
      } } }, "k-component-form", _vm.fieldsets[component.type], false));
    })], 2);
  };
  var _sfc_staticRenderFns$7 = [];
  _sfc_render$7._withStripped = true;
  var __component__$7 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$7,
    _sfc_render$7,
    _sfc_staticRenderFns$7,
    false,
    null,
    null,
    null,
    null
  );
  __component__$7.options.__file = "/Users/romangsponer/Cloud/_sites/plain/site/plugins/kirby-components/src/components/ComponentField.vue";
  const ComponentField = __component__$7.exports;
  const _sfc_main$6 = {
    extends: "k-blocks-field",
    inheritAttrs: false
  };
  var _sfc_render$6 = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("k-field", _vm._b({ staticClass: "k-blocks-field k-components-field", scopedSlots: _vm._u([{ key: "options", fn: function() {
      return [_vm.hasFieldsets ? _c("k-dropdown", [_c("k-button", { attrs: { "icon": "dots" }, on: { "click": function($event) {
        return _vm.$refs.options.toggle();
      } } }), _c("k-dropdown-content", { ref: "options", attrs: { "align": "right" } }, [_c("k-dropdown-item", { attrs: { "disabled": _vm.isFull, "icon": "add" }, on: { "click": function($event) {
        return _vm.$refs.blocks.choose(_vm.value.length);
      } } }, [_vm._v(" " + _vm._s(_vm.$t("add")) + " ")]), _c("hr"), _c("k-dropdown-item", { attrs: { "disabled": _vm.isEmpty, "icon": "template" }, on: { "click": function($event) {
        return _vm.$refs.blocks.copyAll();
      } } }, [_vm._v(" " + _vm._s(_vm.$t("copy.all")) + " ")]), _c("k-dropdown-item", { attrs: { "disabled": _vm.isFull, "icon": "download" }, on: { "click": function($event) {
        return _vm.$refs.blocks.pasteboard();
      } } }, [_vm._v(" " + _vm._s(_vm.$t("paste")) + " ")]), _c("hr"), _c("k-dropdown-item", { attrs: { "disabled": _vm.isEmpty, "icon": "trash" }, on: { "click": function($event) {
        return _vm.$refs.blocks.confirmToRemoveAll();
      } } }, [_vm._v(" " + _vm._s(_vm.$t("delete.all")) + " ")])], 1)], 1) : _vm._e()];
    }, proxy: true }]) }, "k-field", _vm.$props, false), [_c("k-component-blocks", _vm._g({ ref: "blocks", attrs: { "autofocus": _vm.autofocus, "compact": false, "empty": _vm.empty, "endpoints": _vm.endpoints, "fieldsets": _vm.fieldsets, "fieldset-groups": _vm.fieldsetGroups, "group": _vm.group, "max": _vm.max, "value": _vm.value }, on: { "close": function($event) {
      _vm.opened = $event;
    }, "open": function($event) {
      _vm.opened = $event;
    } } }, _vm.$listeners)), !_vm.isEmpty && !_vm.isFull ? _c("k-button", { staticClass: "k-field-add-item-button", attrs: { "icon": "add", "tooltip": _vm.$t("add") }, on: { "click": function($event) {
      return _vm.$refs.blocks.choose(_vm.value.length);
    } } }) : _vm._e()], 1);
  };
  var _sfc_staticRenderFns$6 = [];
  _sfc_render$6._withStripped = true;
  var __component__$6 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$6,
    _sfc_render$6,
    _sfc_staticRenderFns$6,
    false,
    null,
    null,
    null,
    null
  );
  __component__$6.options.__file = "/Users/romangsponer/Cloud/_sites/plain/site/plugins/kirby-components/src/components/ComponentsField.vue";
  const ComponentsField = __component__$6.exports;
  const ImagetogglesField_vue_vue_type_style_index_0_lang = "";
  const _sfc_main$5 = {
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
        }
      },
      reset: Boolean,
      value: [String, Number, Boolean]
    },
    computed: {
      input_style() {
        let style = "gap:" + this.gap + ";--options:" + (this.columns || this.options.length);
        if (this.gap !== "1px") {
          style += ";background: none;";
        }
        return style;
      },
      wrapper_style() {
        return {
          paddingTop: this.$helper.ratio(this.ratio, "auto", true),
          border: "1px solid var(--color-border)"
        };
      },
      li_style() {
        if (this.gap !== "1px") {
          return {
            borderRadius: "var(--rounded)",
            overflow: "hidden"
          };
        }
        return {};
      },
      image_style() {
        return {
          objectFit: this.fit,
          background: this.background
        };
      }
    }
  };
  var _sfc_render$5 = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("ul", { staticClass: "k-toggles-input k-images-toggles-field", style: _vm.input_style, attrs: { "data-invalid": _vm.$v.$invalid, "data-labels": _vm.labels, "data-hasimages": _vm.hasimages } }, _vm._l(_vm.options, function(option, index) {
      return _c("li", { key: index, style: _vm.li_style }, [_c("input", { staticClass: "input-hidden", attrs: { "id": _vm.id + "-" + index, "name": _vm.id, "type": "radio" }, domProps: { "value": option.value, "checked": _vm.value === option.value }, on: { "click": function($event) {
        return _vm.onClick(option.value);
      }, "change": function($event) {
        return _vm.onInput(option.value);
      } } }), _c("label", { staticClass: "k-toggles-image-label", attrs: { "for": _vm.id + "-" + index, "title": option.text } }, [_vm.hasimages ? _c("div", { staticClass: "k-toggles-image-wrapper", style: _vm.wrapper_style }, [option.image ? _c("img", { staticClass: "k-toggles-image", style: _vm.image_style, attrs: { "src": option.image } }) : _vm._e()]) : _vm._e(), option.icon && !_vm.hasimages ? _c("k-icon", { attrs: { "type": option.icon } }) : _vm._e(), _c("span", { staticClass: "k-toggles-text", domProps: { "innerHTML": _vm._s(option.text) } })], 1)]);
    }), 0);
  };
  var _sfc_staticRenderFns$5 = [];
  _sfc_render$5._withStripped = true;
  var __component__$5 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$5,
    _sfc_render$5,
    _sfc_staticRenderFns$5,
    false,
    null,
    null,
    null,
    null
  );
  __component__$5.options.__file = "/Users/romangsponer/Cloud/_sites/plain/site/plugins/kirby-components/src/components/ImagetogglesField.vue";
  const ImagetogglesField = __component__$5.exports;
  const _sfc_main$4 = {
    inheritAttrs: false,
    props: {
      endpoints: Object,
      hidden: {
        type: Boolean,
        default() {
          return false;
        }
      },
      icon: String,
      id: String,
      tabs: Object,
      type: String,
      value: Object
    },
    data() {
      return {
        tab: null
      };
    },
    computed: {
      currentTab() {
        var _a, _b, _c, _d;
        if (this.tab === null) {
          this.tab = (_b = (_a = this.currentTabs.filter((a) => a.active)) == null ? void 0 : _a[0]) == null ? void 0 : _b.name;
        }
        let available = this.currentTabs.filter((a) => a.name === this.tab);
        if (available.length > 0) {
          return this.tab;
        }
        return (_d = (_c = this == null ? void 0 : this.currentTabs[0]) == null ? void 0 : _c.name) != null ? _d : Object.keys(this.tabs)[0];
      },
      currentTabs() {
        let tabarray = [];
        Object.entries(this.tabs).forEach(([tabName, tab]) => {
          var _a;
          if (Object.keys(this.tabs[tabName].fields).length > 0) {
            tabarray.push({
              name: tabName,
              icon: tab.icon,
              label: tab.label,
              active: (_a = tab.active) != null ? _a : false
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
              field: this.endpoints.field + "/_component_/" + this.type.replace("/", "__") + "/fields/" + fieldName,
              section: this.endpoints.section,
              model: this.endpoints.model
            };
          });
        });
        return tabs;
      }
    }
  };
  var _sfc_render$4 = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("div", { staticClass: "k-component-form", attrs: { "id": _vm.id, "hidden": _vm.hidden || _vm.currentTabs.length === 0 } }, [_c("k-grid", [_vm.currentTabs.length > 1 ? _c("k-column", [_c("k-component-tabs", { attrs: { "tab": _vm.currentTab, "tabs": _vm.currentTabs }, on: { "update": function($event) {
      _vm.tab = $event;
    } } })], 1) : _vm._e(), _c("k-column", _vm._l(_vm.parsedTabs, function(thistab, componentType) {
      return _c("k-form", { key: componentType, ref: "form", refInFor: true, attrs: { "hidden": componentType !== _vm.currentTab, "autofocus": true, "fields": thistab.fields, "value": _vm.value }, on: { "input": function($event) {
        return _vm.$emit("update", $event);
      }, "invalid": function($event) {
        return _vm.$emit("invalid", $event);
      } } });
    }), 1)], 1)], 1);
  };
  var _sfc_staticRenderFns$4 = [];
  _sfc_render$4._withStripped = true;
  var __component__$4 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$4,
    _sfc_render$4,
    _sfc_staticRenderFns$4,
    false,
    null,
    null,
    null,
    null
  );
  __component__$4.options.__file = "/Users/romangsponer/Cloud/_sites/plain/site/plugins/kirby-components/src/components/ComponentForm.vue";
  const ComponentForm = __component__$4.exports;
  const ComponentBlocks_vue_vue_type_style_index_0_lang = "";
  const _sfc_main$3 = {
    extends: "k-blocks",
    inheritAttrs: false,
    methods: {
      async add(type = "text", index) {
        if (type === "text") {
          type = "textblocks/text";
        }
        const block = await this.$api.get(
          this.endpoints.field + "/_component_/" + type
        );
        this.blocks.splice(index, 0, block);
        this.save();
        this.$nextTick(() => this.focusOrOpen(block));
      },
      async split(block, index, contents) {
        const oldBlock = this.$helper.clone(block);
        oldBlock.content = { ...oldBlock.content, ...contents[0] };
        const newBlock = await this.$api.get(
          this.endpoints.field + "/_component_/" + block.type
        );
        newBlock.content = {
          ...newBlock.content,
          ...oldBlock.content,
          ...contents[1]
        };
        this.blocks.splice(index, 1, oldBlock, newBlock);
        this.save();
        this.$nextTick(() => this.focus(newBlock));
      },
      async convert(type, block) {
        var _a;
        const index = this.findIndex(block.id);
        if (index === -1) {
          return false;
        }
        const fields = (fieldset) => {
          var _a2;
          let fields2 = {};
          for (const tab of Object.values((_a2 = fieldset == null ? void 0 : fieldset.tabs) != null ? _a2 : {})) {
            fields2 = {
              ...fields2,
              ...tab.fields
            };
          }
          return fields2;
        };
        const oldBlock = this.blocks[index];
        const newBlock = await this.$api.get(
          this.endpoints.field + "/_component_/" + type
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
          if ((oldField == null ? void 0 : oldField.type) === field.type && ((_a = oldBlock == null ? void 0 : oldBlock.content) == null ? void 0 : _a[name])) {
            content[name] = oldBlock.content[name];
          }
        }
        this.blocks[index] = {
          ...newBlock,
          id: oldBlock.id,
          content
        };
        this.save();
      }
    }
  };
  var _sfc_render$3 = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("div", { staticClass: "k-blocks", attrs: { "data-empty": _vm.blocks.length === 0, "data-multi-select-key": _vm.isMultiSelectKey } }, [_vm.hasFieldsets ? [_c("k-draggable", _vm._b({ staticClass: "k-blocks-list k-grid", on: { "sort": _vm.save }, scopedSlots: _vm._u([{ key: "footer", fn: function() {
      return [_c("k-empty", { staticClass: "k-blocks-empty k-column", staticStyle: { "--width": "1/1" }, attrs: { "icon": "box" }, on: { "click": function($event) {
        return _vm.choose(_vm.blocks.length);
      } } }, [_vm._v(" " + _vm._s(_vm.empty || _vm.$t("field.blocks.empty")) + " ")])];
    }, proxy: true }], null, false, 2038523300) }, "k-draggable", _vm.draggableOptions, false), _vm._l(_vm.blocks, function(block, index) {
      return _c("k-component-block", _vm._b({ key: block.id, ref: "block-" + block.id, refInFor: true, attrs: { "endpoints": _vm.endpoints, "fieldset": _vm.fieldset(block), "is-batched": _vm.isSelected(block) && _vm.selected.length > 1, "is-last-selected": _vm.isLastSelected(block), "is-full": _vm.isFull, "is-hidden": block.isHidden === true, "is-mergable": _vm.isMergable, "is-selected": _vm.isSelected(block), "next": _vm.prevNext(index + 1), "prev": _vm.prevNext(index - 1) }, on: { "append": function($event) {
        return _vm.add($event, index + 1);
      }, "chooseToAppend": function($event) {
        return _vm.choose(index + 1);
      }, "chooseToConvert": function($event) {
        return _vm.chooseToConvert(block);
      }, "chooseToPrepend": function($event) {
        return _vm.choose(index);
      }, "close": function($event) {
        _vm.isEditing = false;
      }, "confirmToRemoveSelected": _vm.confirmToRemoveSelected, "copy": function($event) {
        return _vm.copy();
      }, "duplicate": function($event) {
        return _vm.duplicate(block, index);
      }, "focus": function($event) {
        return _vm.onFocus(block);
      }, "focusPrev": function($event) {
        return _vm.focusPrev(index);
      }, "focusNext": function($event) {
        return _vm.focusNext(index);
      }, "hide": function($event) {
        return _vm.hide(block);
      }, "merge": function($event) {
        return _vm.merge();
      }, "open": function($event) {
        _vm.isEditing = true;
      }, "paste": function($event) {
        return _vm.pasteboard();
      }, "prepend": function($event) {
        return _vm.add($event, index);
      }, "remove": function($event) {
        return _vm.remove(block);
      }, "show": function($event) {
        return _vm.show(block);
      }, "selectDown": _vm.selectDown, "selectUp": _vm.selectUp, "sortDown": function($event) {
        return _vm.sort(block, index, index + 1);
      }, "sortUp": function($event) {
        return _vm.sort(block, index, index - 1);
      }, "split": function($event) {
        return _vm.split(block, index, $event);
      }, "update": function($event) {
        return _vm.update(block, $event);
      } }, nativeOn: { "click": function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.onClickBlock(block, $event);
      } } }, "k-component-block", block, false));
    }), 1), _c("k-block-selector", { ref: "selector", attrs: { "fieldsets": _vm.fieldsets, "fieldset-groups": _vm.fieldsetGroups }, on: { "add": _vm.add, "convert": _vm.convert, "paste": function($event) {
      return _vm.paste($event);
    } } }), _c("k-remove-dialog", { ref: "removeAll", attrs: { "text": _vm.$t("field.blocks.delete.confirm.all"), "submit-button": _vm.$t("delete.all") }, on: { "submit": _vm.removeAll } }), _c("k-remove-dialog", { ref: "removeSelected", attrs: { "text": _vm.$t("field.blocks.delete.confirm.selected") }, on: { "submit": _vm.removeSelected } }), _c("k-block-pasteboard", { ref: "pasteboard", on: { "paste": function($event) {
      return _vm.paste($event);
    } } })] : [_c("k-box", { attrs: { "theme": "info" } }, [_vm._v(" No fieldsets yet ")])]], 2);
  };
  var _sfc_staticRenderFns$3 = [];
  _sfc_render$3._withStripped = true;
  var __component__$3 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$3,
    _sfc_render$3,
    _sfc_staticRenderFns$3,
    false,
    null,
    null,
    null,
    null
  );
  __component__$3.options.__file = "/Users/romangsponer/Cloud/_sites/plain/site/plugins/kirby-components/src/components/ComponentBlocks.vue";
  const ComponentBlocks = __component__$3.exports;
  const ComponentBlock_vue_vue_type_style_index_0_lang = "";
  const _sfc_main$2 = {
    extends: "k-block",
    inheritAttrs: false,
    created() {
    },
    methods: {
      parseEndpoints(tab) {
        Object.entries(tab.fields).forEach(([fieldName]) => {
          tab.fields[fieldName].section = this.name;
          tab.fields[fieldName].endpoints = {
            field: this.endpoints.field + "/_component_/" + this.type.replace("/", "__") + "/fields/" + fieldName,
            section: this.endpoints.section,
            model: this.endpoints.model
          };
        });
        return tab;
      }
    },
    computed: {
      preview() {
        let obj = {};
        Object.entries(this.fieldset.tabs).forEach(([tabName, tab]) => {
          if (tab.preview === true) {
            obj[tabName] = this.parseEndpoints(tab);
          }
        });
        return obj;
      },
      tabs() {
        let tabs = {};
        Object.entries(this.fieldset.tabs).forEach(([tabName, tab]) => {
          if (tab.preview !== true) {
            tabs[tabName] = this.parseEndpoints(tab);
          }
        });
        return tabs;
      }
    }
  };
  var _sfc_render$2 = function render() {
    var _a;
    var _vm = this, _c = _vm._self._c;
    return _c("div", { ref: "container", staticClass: "k-block-container", class: [
      "k-block-container-fieldset-" + _vm.type,
      _vm.containerType ? "k-block-container-type-" + _vm.containerType : ""
    ], style: "--width: " + ((_a = _vm.content.width) != null ? _a : "1/1"), attrs: { "data-batched": _vm.isBatched, "data-disabled": _vm.fieldset.disabled, "data-hidden": _vm.isHidden, "data-id": _vm.id, "data-last-selected": _vm.isLastSelected, "data-selected": _vm.isSelected, "data-translate": _vm.fieldset.translate, "tabindex": "0" }, on: { "keydown": [function($event) {
      if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "j", void 0, $event.key, void 0))
        return null;
      if (!$event.ctrlKey)
        return null;
      $event.preventDefault();
      $event.stopPropagation();
      return _vm.$emit("merge");
    }, function($event) {
      if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"]))
        return null;
      if (!$event.ctrlKey)
        return null;
      if (!$event.altKey)
        return null;
      $event.preventDefault();
      $event.stopPropagation();
      return _vm.$emit("selectDown");
    }, function($event) {
      if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"]))
        return null;
      if (!$event.ctrlKey)
        return null;
      if (!$event.altKey)
        return null;
      $event.preventDefault();
      $event.stopPropagation();
      return _vm.$emit("selectUp");
    }, function($event) {
      if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"]))
        return null;
      if (!$event.ctrlKey)
        return null;
      if (!$event.shiftKey)
        return null;
      $event.preventDefault();
      $event.stopPropagation();
      return _vm.$emit("sortDown");
    }, function($event) {
      if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"]))
        return null;
      if (!$event.ctrlKey)
        return null;
      if (!$event.shiftKey)
        return null;
      $event.preventDefault();
      $event.stopPropagation();
      return _vm.$emit("sortUp");
    }, function($event) {
      if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "backspace", void 0, $event.key, void 0))
        return null;
      if (!$event.ctrlKey)
        return null;
      $event.preventDefault();
      $event.stopPropagation();
      return _vm.remove.apply(null, arguments);
    }], "focus": function($event) {
      $event.stopPropagation();
      return _vm.$emit("focus");
    }, "focusin": function($event) {
      $event.stopPropagation();
      return _vm.onFocusIn.apply(null, arguments);
    } } }, [_c("div", { staticClass: "k-block", class: _vm.className }, [Object.keys(_vm.preview).length === 0 ? _c(_vm.customComponent, _vm._g(_vm._b({ ref: "editor", tag: "component" }, "component", _vm.$props, false), _vm.listeners)) : _c("k-component-form", _vm._g(_vm._b({ ref: "editor", staticClass: "k-components-preview", attrs: { "tabs": _vm.preview, "value": _vm.content } }, "k-component-form", _vm.$props, false), _vm.listeners))], 1), _c("k-block-options", _vm._g({ ref: "options", attrs: { "is-batched": _vm.isBatched, "is-editable": _vm.isEditable, "is-full": _vm.isFull, "is-hidden": _vm.isHidden, "is-mergable": _vm.isMergable, "is-splitable": _vm.isSplitable() } }, {
      ..._vm.listeners,
      split: () => _vm.$refs.editor.split(),
      open: () => {
        if (typeof _vm.$refs.editor.open === "function") {
          _vm.$refs.editor.open();
        } else {
          _vm.open();
        }
      }
    }))], 1);
  };
  var _sfc_staticRenderFns$2 = [];
  _sfc_render$2._withStripped = true;
  var __component__$2 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$2,
    _sfc_render$2,
    _sfc_staticRenderFns$2,
    false,
    null,
    null,
    null,
    null
  );
  __component__$2.options.__file = "/Users/romangsponer/Cloud/_sites/plain/site/plugins/kirby-components/src/components/ComponentBlock.vue";
  const ComponentBlock = __component__$2.exports;
  const _sfc_main$1 = {
    extends: "k-tabs",
    inheritAttrs: false
  };
  var _sfc_render$1 = function render() {
    var _vm = this, _c = _vm._self._c;
    return _vm.tabs && _vm.tabs.length > 1 ? _c("div", { staticClass: "k-tabs", attrs: { "data-theme": _vm.theme } }, [_c("nav", [_vm._l(_vm.visibleTabs, function(tabButton) {
      return _c("k-button", { key: tabButton.name, staticClass: "k-tab-button", attrs: { "link": tabButton.link, "current": _vm.current === tabButton.name, "icon": tabButton.icon, "tooltip": tabButton.label }, on: { "click": function($event) {
        return _vm.$emit("update", tabButton.name);
      } } }, [_vm._v(" " + _vm._s(tabButton.label || tabButton.text || tabButton.name) + " "), tabButton.badge ? _c("span", { staticClass: "k-tabs-badge" }, [_vm._v(" " + _vm._s(tabButton.badge) + " ")]) : _vm._e()]);
    }), _vm.invisibleTabs.length ? _c("k-button", { staticClass: "k-tab-button k-tabs-dropdown-button", attrs: { "text": _vm.$t("more"), "icon": "dots" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.$refs.more.toggle();
    } } }) : _vm._e()], 2), _vm.invisibleTabs.length ? _c("k-dropdown-content", { ref: "more", staticClass: "k-tabs-dropdown", attrs: { "align": "right" } }, _vm._l(_vm.invisibleTabs, function(tabButton) {
      return _c("k-dropdown-item", { key: "more-" + tabButton.name, attrs: { "link": tabButton.link, "current": _vm.tab === tabButton.name, "icon": tabButton.icon, "tooltip": tabButton.label } }, [_vm._v(" " + _vm._s(tabButton.label || tabButton.text || tabButton.name) + " ")]);
    }), 1) : _vm._e()], 1) : _vm._e();
  };
  var _sfc_staticRenderFns$1 = [];
  _sfc_render$1._withStripped = true;
  var __component__$1 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$1,
    _sfc_render$1,
    _sfc_staticRenderFns$1,
    false,
    null,
    null,
    null,
    null
  );
  __component__$1.options.__file = "/Users/romangsponer/Cloud/_sites/plain/site/plugins/kirby-components/src/components/ComponentTabs.vue";
  const ComponentTabs = __component__$1.exports;
  const ComponentLicense_vue_vue_type_style_index_0_lang = "";
  const _sfc_main = {
    props: {
      message: String,
      supportLink: String,
      isError: Boolean,
      doRegister: {
        type: Boolean,
        default() {
          return true;
        }
      },
      doSupport: {
        type: Boolean,
        default() {
          return true;
        }
      }
    },
    data() {
      return {
        onLoad: false,
        onError: false,
        onSuccess: false,
        licensekey: "",
        email: "",
        notify: ""
      };
    },
    computed: {
      theme() {
        if (this.onError) {
          return "negative";
        }
        if (this.onSuccess) {
          return "positive";
        }
        if (this.onLoad) {
          return "notice";
        }
        return false;
      }
    },
    methods: {
      supporttext() {
        return "Keep in mind: The domain of this Kirby instance will be linked to the license. If the license is already assigned by mistake, <a href='https://microman.ch/en/microman' target='_blank'>contact the support</a>";
      },
      reset() {
        this.licensekey = this.email = this.notify = "";
        this.onError = this.onLoad = false;
        if (this.onSuccess) {
          this.$emit("onSuccess");
        }
        this.$refs.regdialog.close();
      },
      async register() {
        this.onError = this.onSuccess = false;
        this.onLoad = true;
        this.notify = "Checking your license code. Please wait...";
        this.$api.get("components/license", {
          key: this.licensekey,
          email: this.email
        }).then((data) => {
          this.onLoad = false;
          this.onError = data.error;
          this.onSuccess = data.success;
          this.notify = data.text;
        });
      }
    }
  };
  var _sfc_render = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("div", { staticClass: "k-component-license" }, [_c("k-box", { attrs: { "theme": "notice" } }, [_vm._v(" This is an unregistered version of the components plugin. "), _vm.doRegister ? _c("span", { staticClass: "link", on: { "click": function($event) {
      return _vm.$refs.regdialog.open();
    } } }, [_vm._v("Register now")]) : _vm._e()]), _c("k-dialog", { ref: "regdialog", staticClass: "k-component-license-dialog", attrs: { "size": "medium" } }, [_c("k-grid", { attrs: { "gutter": "medium" } }, [_c("k-column", [_c("k-text", { attrs: { "size": "large" } }, [_vm._v(" Get your Component Plugin license "), _c("a", { attrs: { "href": "https://license.microman.ch/?product=829857", "target": "_blank" } }, [_vm._v("here")])])], 1), _c("k-column", [_c("k-text-field", { attrs: { "label": "Please enter your license code", "help": _vm.supporttext(), "required": "true", "placeholder": "COMP1-" }, model: { value: _vm.licensekey, callback: function($$v) {
      _vm.licensekey = $$v;
    }, expression: "licensekey" } })], 1), _c("k-column", [_c("k-text-field", { attrs: { "label": "Email", "type": "text", "required": "true", "placeholder": "mail@example.com" }, model: { value: _vm.email, callback: function($$v) {
      _vm.email = $$v;
    }, expression: "email" } })], 1), _c("k-column", [_vm.theme ? _c("k-box", { staticClass: "loader-box", attrs: { "theme": _vm.theme } }, [_vm.theme === "notice" ? _c("k-loader") : _vm._e(), _c("span", { staticClass: "loader-text" }, [_vm._v(_vm._s(_vm.notify))])], 1) : _vm._e()], 1)], 1), _c("template", { slot: "footer" }, [_c("k-button-group", [_c("k-button", { attrs: { "icon": "chancel" }, on: { "click": _vm.reset } }, [_vm._v("Close")]), _c("k-button", { attrs: { "disabled": _vm.onLoad || _vm.onSuccess, "icon": "check", "theme": "positive" }, on: { "click": _vm.register } }, [_vm._v("Register")])], 1)], 1)], 2)], 1);
  };
  var _sfc_staticRenderFns = [];
  _sfc_render._withStripped = true;
  var __component__ = /* @__PURE__ */ normalizeComponent(
    _sfc_main,
    _sfc_render,
    _sfc_staticRenderFns,
    false,
    null,
    null,
    null,
    null
  );
  __component__.options.__file = "/Users/romangsponer/Cloud/_sites/plain/site/plugins/kirby-components/src/components/ComponentLicense.vue";
  const ComponentLicense = __component__.exports;
  window.panel.plugin("microman/components-field", {
    fields: {
      component: ComponentField,
      components: ComponentsField,
      imagetoggles: ImagetogglesField
    },
    components: {
      "k-component-form": ComponentForm,
      "k-component-blocks": ComponentBlocks,
      "k-component-block": ComponentBlock,
      "k-component-tabs": ComponentTabs,
      "k-component-license": ComponentLicense
    }
  });
})();
