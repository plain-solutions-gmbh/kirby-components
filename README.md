# Kirby Components

## Overview

Do you love to make awesome projects with Kirby CMS?
Do you also find it difficult to switch between snippets and blueprints folders?

**This Plugin will change your life!**

![screenshot](https://raw.githubusercontent.com/youngcut/kirby-components/main/.github/screenshot.gif)

**Watch the [video tutorial](https://www.youtube.com/watch?v=1ycWtWRL1hQ) or check the [example project](https://github.com/youngcut/kirby-components-example)**

## Installation

**Manually**

[Download](https://github.com/youngcut/kirby-comopnents) and copy the plugin into your plugin folder: `/site/plugins/`

**With Composer**

`composer require microman/kirby-components`

## First step

1. Create a folder `site/components`
2. Make subfolders for your components, e.g. `my_component`
3. Create at least one blueprint with the same name as the folder. e.g. `my_component.yml`
4. Create at least one snippet. e.g. `my_component.php`

> You can create more snippets and blueprints in your components folder. (called sub components)
> To access them later, declaring the location `my_component/my_subcomponent`

> You can set label, title and icons in your blueprint.
> Even tabs and columns if you like.

## Using in your template

To output your component, use the `component` helper:

```php
component('my_component');
```

Pass values to this component:

```php
component('my_component', $page, ['title' => 'This is a different title.']);
```

> The first and the second parameter could be an array or an Kirby object, that contains a content object. 
> Try it out whats working for you.

## Using in your panel

### The component field

```yml
my_field:
  type: component
  fieldsets: my_component
```

> You can also use Kirby blocks in here: `fieldsets: blocks/heading`
> 
```php
$page->my_field()->toComponent();
```

Extend your component like in the example above:

```php
$page->my_field()->toComponent(['new_value' => 'My new value']);
```

The variables in the component are accessible with `$content`

```php
$content->field_in_component();
```


### The component selector

If you add more than one component to the fieldsets, a selector appears:

```yml
my_field:
  type: component
  fieldsets:
    - my_component
    - my_component/my_subcomponent
    - my_other_component
```

![plain selector](https://raw.githubusercontent.com/youngcut/kirby-components/main/.github/selector_plain.png)

> By choose a component, the fields of the selected component will appear.

> To change the labels in the selector, set the title of the component.

**Component selector with images**

Adding images to your component folder (with tha same name as the component itself)

![files selector](https://raw.githubusercontent.com/youngcut/kirby-components/main/.github/selector_files.png)

These images will shown in the selector and you can style this with the `selector` property:

```yml
my_field:
  type: component
  selector:
    columns: 3
    background: var(--color-yellow-200) 
    ratio: 3/1
    fit: contain
    gap: 1em
  fieldsets:
    - my_component
    - my_component/my_subcomponent
    - my_other_component
```

![images selector](https://raw.githubusercontent.com/youngcut/kirby-components/main/.github/selector_images.png)

**Images toggles field**

You can use the component selector also standalone:

```yml
image_toggle:
  type: imagetoggles
  root: location/of/the/images
  ratio: 2/1
  fit: cover
  gap: 1.2em
  options:
    - text: Text1
     value: value1
     image: image1.png
    - text: Text2
     value: value2
     image: image2.png
    - text: Text3
     value: value3
     image: image3.png
```

It follows the same rules as the `toggles`field.

### Output the component field

Use the `toCopmonent()`method.

```php
$page->my_field()->toComponent();
```

Or you can extend the values (by array or a Kirby object):

```php
$page->my_field()->toComponent(['my_component_field' => 'My existing or new value']);
$page->my_field()->toComponent($page->any_section());
```

The `toComponent()` method delivers the selected component.

If you like to output all the available component of the component fields use `toComponents()`.

## The components field

Add more than one component by using the `components` field.
It follows the same rules as the Kirby `blocks` field.

```yml
multiple_components:
  type: components
  fieldset:
    - my_component
    - my_component/my_subcomponent
    - my_other_component
    - blocks/heading
    - blocks/text
    - blocks/list
```

![components](https://raw.githubusercontent.com/youngcut/kirby-components/main/.github/components.png)

## Tab injection

Add component as tab to the component(s) fields.

```yml
multiple_components:
  type: components
  tabs:
    my_component/my_subcomponent:
      position: after
      label: Injected tab
  fieldset:
    - my_component
```

![injected_tab](https://raw.githubusercontent.com/youngcut/kirby-components/main/.github/injected_tab.png)

you can also extend your component there:


```yml
multiple_components:
  type: components
  tabs:
    my_component/my_subcomponent:
      position: after
      label: Injected tab
      fields:
        existing_field:
          label: Another Label
        new_field:
          type: text
  fieldset:
    - my_component
```

## License

This is a free trial version of Kirby Components Plugin, which grants you the right to use the plugin for testing purposes. If you wish to use this plugin on one website or if you intend to use it for commercial purposes, you must [purchase a license](https://license.microman.ch/?product=829857).

A license is required for those who wish to use the plugin to generate revenue, including but not limited to: e-commerce websites, affiliate marketing websites, and websites that require payment to access content. Licenses are non-transferable and cannot be shared with other users or websites.

By downloading and using this plugin, you agree to the [terms and conditions of the License Agreement](https://license.microman.ch/license/). Failure to comply with the terms of the License Agreement may result in revocation of your license and legal action.

To purchase a license or learn more about our licensing options, please visit our [website](https://microman.ch) or contact us at [Contact Email](mailto:kirby@micorman.ch). Thank you for your interest in Kirby Components Plugin!