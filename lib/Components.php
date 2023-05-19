<?php

namespace Microman;

/**
 * @package   Kirby Components
 * @author    Roman Gsponer <kirby@microman.ch>
 * @link      https://microman.ch/
 * @copyright Roman Gsponer
 * @license   https://license.microman.ch/license/
 */

use Kirby\Cms\App;
use Kirby\Cms\Blueprint;
use Kirby\Data\Data;
use Kirby\Template\Snippet;
use Kirby\Exception\NotFoundException;
use Kirby\Filesystem\F;
use Kirby\Filesystem\Dir;
use Kirby\Toolkit\A;
use Kirby\Toolkit\Str;

class Components
{
    protected $components;

    public static $loaded = [];
    public static $root;

    static function snippets()
    {
        static::$root = option('microman.components.root', App::instance()->root('site') . "/components");
        $snippets = [];

        foreach (Dir::dirs(static::$root) as $super) {
            if (substr($super, 0, 1) === "_") {
                continue;
            }
            foreach (Dir::read(static::root($super)) as $file) {
                if (substr($file, 0, 1) === "_") {
                    continue;
                }
                if (F::extension($file) === "php") {
                    $name = F::name($file);
                    $key = $super === $name ? $name : $super . "/" . $name;
                    $file = static::root($super) . "/" . $file;
                    $snippets["_components/" . $key] = $file;
                }
            }
        }

        return $snippets;
    }

    static function saveName($name)
    {
        return Str::lower(Str::replace($name, "/", "__"));
    }

    static function convertSaveName()
    {
        return Str::lower(Str::replace($name, "__", "/"));
    }

    static function displayName($name)
    {
        $devined = Str::replace(static::subComponentName($name), "_", " ");
        return Str::ucwords($devined);
    }

    static function subComponent($name)
    {
        return A::last(Str::split($name, "/"));
    }

    static function load(string $type, array $extends = [])
    {
        //Get from Cache
        $hash = md5(serialize($type) . serialize($extends));
        if (isset(static::$loaded[$hash]) === true) {
            return static::$loaded[$hash];
        }

        if (substr($type, 0, 7) === "blocks/") {
            //Components are Blocks
            if (empty($extends)) {
                $extends = $type;
            }
            $fieldset = Blueprint::extend($extends);
            $fieldset["label"] ??= Str::ucfirst(substr($type, 7));
        } else {
            $file = static::file($type, "yml");
            $fieldset = A::merge(Data::read($file), $extends);
        }

        $fieldset["image"] = static::image($type);
        $fieldset["type"] = $type;

        return static::$loaded[$hash] = $fieldset;
    }

    static function isComponent($type)
    {
        $type_split = explode("/", $type, 2);
        return $type_split[0] !== "blocks";
    }

    static function image($component)
    {
        if (!str_contains($component, "/")) {
            $component = $component . "/" . $component;
        }
        
        foreach (["png", "jpg", "jpeg", "webp", "svg"] as $extension) {
            $exists = !is_null(static::file($component, $extension, false));
            if ($exists) {
                return $component . "." . $extension;
            }
        }
        return null;
    }

    static function root($component = "")
    {
        return static::$root . '/' . $component;
    }

    static function file($component, $extension = "php", $required = true)
    {
        // resolve main component
        if (!str_contains($component, "/")) {
            $component = $component . "/" . $component;
        }

        $file = static::root($component) . "." . $extension;

        if (F::exists($file) === true) {
            return $file;
        }

        if ($required) {
            throw new NotFoundException("Component {$component} not found.");
        }

        return null;
    }
}
