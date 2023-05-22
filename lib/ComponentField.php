<?php

namespace Microman;

/**
 * @package   Kirby Components
 * @author    Roman Gsponer <kirby@microman.ch>
 * @link      https://microman.ch/
 * @copyright Roman Gsponer
 * @license   https://license.microman.ch/license/
 */

use Kirby\Data\Yaml;
use Kirby\Form\Field;
use Kirby\Cms\Block;
use Kirby\Toolkit\A;
use Kirby\Toolkit\Str;
use Kirby\Exception\NotFoundException;

class ComponentField extends ComponentsField
{
    protected $isSingle;
    protected $selector;

    public function __construct(array $params = [])
    {
        $this->params = $params;

        parent::__construct($params);
        $this->setSelector($params["selector"] ?? []);
    }

    public function setFieldsets($fieldsets, $model)
    {
        if (empty($fieldsets)) {
            throw new NotFoundException("No component(s) set.");
        }
        $fieldsets = A::wrap($fieldsets);
        $this->isSingle = count($fieldsets) === 1;
        parent::setFieldsets($fieldsets, $model);
    }

    public function fill($value = null)
    {
        $value = ComponentCollection::parse($value);
        $out = array();

        foreach ($this->components() as $componentName) {
            $component = $value[$componentName] ?? [];
            $default = $this->params["selector"]["default"] ?? "";
            $component["isSelected"] ??= $default === $componentName;

            //If there is only one componen: Select them
            if ($this->isSingle) {
                $component["isSelected"] = true;
            }

            $component["type"] ??= $componentName;

            if (Components::isComponent($componentName) === false) {
                $component["type"] = Components::subComponent($componentName);
                $block = Block::factory($component)
                    ->content()
                    ->toArray();
                $component["content"] = $block;
                $component["type"] = $componentName;
            }

            $component["id"] ??= Str::uuid();

            $out[$componentName] = $component;
        }

        $this->value = $this->blocksToValues($out);
    }

    public function props(): array
    {
        return A::merge(parent::props(), [
            //You can find the license validation in the file: lib/ComponentLicense.php
            "license" => ComponentLicense::checkLicense(),
            "selector" => $this->selector(),
            "issingle" => $this->isSingle,
        ]);
    }

    public function selector(): array|null
    {
        return $this->selector->toArray();
    }

    protected function setSelector($props)
    {
        $props["root"] = "/site/components/";
        $props["options"] = [];
        foreach ($this->fieldsets() as $fieldset) {
            $props["options"][] = [
                "image" => $fieldset->image(),
                "icon" => $fieldset->icon(),
                "text" => $fieldset->label(),
                "value" => $fieldset->type(),
            ];
        }
        $this->selector = Field::factory("imagetoggles", $props);
    }
}
