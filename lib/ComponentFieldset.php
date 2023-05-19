<?php

namespace Microman;

/**
 * @package   Kirby Components
 * @author    Roman Gsponer <kirby@microman.ch>
 * @link      https://microman.ch/
 * @copyright Roman Gsponer
 * @license   https://license.microman.ch/license/
 */

use Kirby\Cms\Fieldsets;
use Kirby\Cms\Fieldset;
use Kirby\Filesystem\Asset;
use Kirby\Form\Form;
use Kirby\Toolkit\Str;

class ComponentFieldset extends Fieldset
{
    protected $image;
    protected $savename;
    protected $root;
    protected static $formCache;

    public const ITEMS_CLASS = ComponentFieldsets::class;

    public function __construct(array $params = [])
    {
        $this->setImage($params["image"] ?? "");
        $this->savename =
            $params["savename"] ?? Str::replace($this->type, "/", "__");
        $this->fields = $params["fields"] ?? [];

        parent::__construct($params);

        $this->name = $this->createName(
            $params["title"] ??
                ($params["name"] ?? Str::ucfirst($this->subtype()))
        );
    }

    public function image()
    {
        return $this->image;
    }

    public function setImage($image)
    {
        $this->image = $image;
    }

    public function saveName()
    {
        return $this->savename;
    }

    public function subtype()
    {
        $split_type = explode("/", $this->type);
        return $split_type[1] ?? $split_type[0];
    }

    public function form($fields = null, array $input = [])
    {
        $fields ??= $this->fields() ?? [];

        $hash = md5(serialize($fields) . serialize($input));
        if (isset(static::$formCache[$hash])) {
            return static::$formCache[$hash];
        }

        return static::$formCache[$hash] = new Form([
            "fields" => $fields,
            "model" => $this->model,
            "strict" => true,
            "values" => $input,
        ]);
    }
}
