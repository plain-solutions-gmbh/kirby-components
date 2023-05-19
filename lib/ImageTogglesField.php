<?php

namespace Microman;

/**
 * @package   Kirby Components
 * @author    Roman Gsponer <kirby@microman.ch>
 * @link      https://microman.ch/
 * @copyright Roman Gsponer
 * @license   https://license.microman.ch/license/
 */

use Kirby\Form\FieldClass;
use Kirby\Toolkit\A;
use Kirby\Toolkit\Str;
use Kirby\Filesystem\F;

class ImagetogglesField extends FieldClass
{
    protected $options = [];
    protected static $optionCache = [];

    public function __construct(array $params = [])
    {
        $this->params = $params;
        $this->setOptions($params["options"] ?? [], $params["root"] ?? "");
        parent::__construct($params);
    }

    public function setOptions(array $options = [], string $root = "")
    {
        $hash = md5(serialize($options));

        if (isset(static::$optionCache[$hash])) {
            return $this->options = static::$optionCache[$hash];
        }

        $root = Str::trim($root, "/");
        $kirby_path = kirby()->root();
        $media_path = kirby()->root("media");
        $media_url = kirby()
            ->urls()
            ->media();

        foreach ($options as $key => &$option) {
            if (isset($option["image"])) {
                $image = $kirby_path . "/" . $root . "/" . $option["image"];
                $to =
                    "/plugins/microman/imagetoggle/" .
                    $hash .
                    "/" .
                    $option["image"];

                if (F::exists($image)) {
                    F::link($image, $media_path . $to, "symlink");
                    $option["image"] = $media_url . $to;
                    $option["icon"] = null;
                } else {
                    $option["image"] = null;
                }
            }
        }

        $this->options = static::$optionCache[$hash] = $options;
    }

    public function hasImages(): bool
    {
        $imageCount = A::filter(
            $this->options,
            fn($item) => !is_null($item["image"] ?? null)
        );
        return count($imageCount) > 0;
    }

    public function options(): array
    {
        return $this->options;
    }

    public function props(): array
    {
        $props = parent::props();

        $props["columns"] = $this->params["columns"] ?? count($this->options());
        $props["background"] = $this->params["background"] ?? "#fff";
        $props["ratio"] = $this->params["ratio"] ?? "1/1";
        $props["fit"] = $this->params["fit"] ?? "contain";
        $props["gap"] = $this->params["gap"] ?? "1px";
        $props["root"] = $this->params["root"] ?? kirby()->root("assets");
        $props["mobile"] = $this->params["mobile"] ?? true;
        $props["options"] = $this->options();
        $props["hasimages"] = $this->hasImages();

        return $props;
    }
}
