<?php

load(
    [
        "Microman\\ComponentField" => "/lib/ComponentField.php",
        "Microman\\ComponentsField" => "/lib/ComponentsField.php",
        "Microman\\ComponentFieldsets" => "/lib/ComponentFieldsets.php",
        "Microman\\ComponentFieldset" => "/lib/ComponentFieldset.php",
        "Microman\\ComponentCollection" => "/lib/ComponentCollection.php",
        "Microman\\ImagetogglesField" => "/lib/ImageTogglesField.php",
        "Microman\\Components" => "/lib/Components.php",
        "Microman\\Component" => "/lib/Component.php",
        "Microman\\ComponentLicense" => "/lib/ComponentLicense.php",
    ],
    __DIR__
);

use Kirby\Cms\App;
use Kirby\Cms\Blocks;
use Kirby\Cms\Content;
use Kirby\Cms\Page;
use Microman\ComponentField;
use Microman\ComponentsField;
use Microman\ImagetogglesField;
use Microman\Components;
use Microman\Component;
use Microman\ComponentCollection;
use Microman\ComponentLicense;
use Kirby\Exception\InvalidArgumentException;

function component(string $componentName = null, $content = null, $extends = [], $params = [])
{
    $params['type'] ??= $componentName;
    $params['content'] ??= $content;
    $params['options']['extends'] ??= $extends;

    return new Component($params);
}

Kirby::plugin("microman/components", [
    "fields" => [
        "component" => ComponentField::class,
        "components" => ComponentsField::class,
        "imagetoggles" => ImagetogglesField::class,
    ],
    "snippets" => Components::snippets(),
    "fieldMethods" => [
        "toComponents" => function (...$args) {

            return ComponentCollection::parseField(...$args);
            
        },
        "toComponent" => function (...$args) {

            $components = ComponentCollection::parseField(...$args);
            return $components->filter("isSelected", true)->first();

        },
    ],
    "api" => [
        "routes" => [
            [
                "pattern" => "components/license",
                "action" => function () {
                    return ComponentLicense::register(get("key"), get("email"));
                },
            ],
        ],
    ],
]);
