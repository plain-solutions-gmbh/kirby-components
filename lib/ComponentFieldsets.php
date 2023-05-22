<?php

namespace Microman;

/**
 * @package   Kirby Components
 * @author    Roman Gsponer <kirby@microman.ch>
 * @link      https://microman.ch/
 * @copyright Roman Gsponer
 * @license   https://license.microman.ch/license/
 */

use Kirby\Cms\Blueprint;
use Kirby\Cms\Fieldsets;
use Kirby\Exception\InvalidArgumentException;
use Kirby\Toolkit\I18n;
use Kirby\Toolkit\A;
use Kirby\Toolkit\Str;
use Kirby\Cms\Items;

class ComponentFieldsets extends Fieldsets
{
    public const ITEM_CLASS = ComponentFieldset::class;

    protected static $components;
    protected static $tabs;

    protected static function setTabs($fieldset, $type)
    {
        if (
            is_null($tabs = static::$tabs) ||
            ($fieldset["type"] ?? "") === "group"
        ) {
            return $fieldset;
        }

        if (array_key_exists("fields", $fieldset)) {
            $fieldset["tabs"] = [$type => $fieldset];
            unset($fieldset["fields"]);
        }

        if (array_key_exists("tabs", $fieldset) == null) {
            $fieldset["tabs"] = [$type => ["fields" => []]];
        }

        $fieldset["label"] = static::getName($fieldset, $type);

        $fieldset["tabs"] = A::merge( static::$tabs["before"] ?? [], $fieldset["tabs"], static::$tabs["after"] ?? []);


        return $fieldset;
    }
    protected static function createFieldsets($params)
    {
        $fieldsets = [];
        $groups = [];

        foreach ($params as $type => $fieldset) {
            if (is_int($type) === true && is_string($fieldset)) {
                $type = $fieldset;
            }

            if ($fieldset === false) {
                continue;
            }

            if (is_string($fieldset)) {
                $fieldset = [];
            }

            $fieldset = Components::load($type, $fieldset);
            $fieldset["label"] = static::getName($fieldset, $type);
            $fieldset = static::setTabs($fieldset, $type);

            // extract groups
            if ($fieldset["type"] === "group") {
                $result = static::createFieldsets($fieldset["fieldsets"] ?? []);
                $fieldsets = array_merge($fieldsets, $result["fieldsets"]);

                $groups[$type] = [
                    "label" => I18n::translate($label, $label),
                    "name" => $type,
                    "open" => $fieldset["open"] ?? true,
                    "sets" => array_column($result["fieldsets"], "type"),
                ];
            } else {
                $fieldsets[$fieldset["type"]] = $fieldset;
            }
        }

        return [
            "fieldsets" => $fieldsets,
            "groups" => $groups,
        ];
    }

    protected static function getName($fieldset, $componentName)
    {
        $fieldset["title"] ??= $fieldset["label"] ?? null;

        if (is_null($fieldset["title"]) === false) {
            return $fieldset["title"];
        }

        $componentName = components::subComponent($componentName);
        return Str::ucwords(str_replace("_", " ", $componentName));
    }

    public static function factory(array $items = null, array $params = [])
    {
        static::$components = $components = new Components();
        static::initTabs($params["tabs"] ?? null);
        $items ??= array_keys($components->components(false, true));

        return parent::factory($items, $params);
    }

    protected static function initTabs($tabs)
    {
        if (is_null($tabs)) {
            return null;
        }

        static::$tabs = [];

        foreach ($tabs as $name => $options) {
            if (is_string($options)) {
                $component = $options;
                $options = [];
            } else {
                $component = $options["component"] ?? $name;
            }

            $position =
                ($options["position"] ?? "") === "before" ? "before" : "after";
            $comp = $blueprint = static::$components->load($component);
            $comp = A::merge($comp, $options);
            static::$tabs[$position][$name] = $comp;
            $comp = A::merge($comp, $options);
            static::$tabs[$position][$name]['label'] = static::getName($comp, $name);
        }
    }
}
