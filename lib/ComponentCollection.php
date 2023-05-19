<?php

namespace Microman;

/**
 * @package   Kirby Components
 * @author    Roman Gsponer <kirby@microman.ch>
 * @link      https://microman.ch/
 * @copyright Roman Gsponer
 * @license   https://license.microman.ch/license/
 */

use Kirby\Cms\Blocks;
use Kirby\Cms\Field;

class ComponentCollection extends Blocks
{
    public const ITEM_CLASS = Component::class;

    public static function parseField( Field $field, $extends = [], $controller = []) {

        $items = static::parse($field->value());

        //Component field works with associative array. Make indexed
        $items = array_values($items);

        $components = static::factory($items, [
            "parent" => $field->parent(),
            "field" => $field,
            "options" => [
                "extends" => $extends,
                "controller" => $controller
            ],
        ]);

        return $components->filter("isHidden", false);
    }
}
