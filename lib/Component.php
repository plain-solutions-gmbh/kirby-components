<?php

namespace Microman;

/**
 * @package   Kirby Components
 * @author    Roman Gsponer <kirby@microman.ch>
 * @link      https://microman.ch/
 * @copyright Roman Gsponer
 * @license   https://license.microman.ch/license/
 */

use Kirby\Exception\InvalidArgumentException;
use Kirby\Cms\App;
use Kirby\Cms\Block;
use Kirby\Cms\Blocks;
use Kirby\Cms\Content;
use Kirby\Toolkit\A;
use Kirby\Template\Snippet;
use Kirby\Filesystem\F;
use Kirby\Toolkit\Str;
use microman\Components;

class Component extends Block
{
    public const ITEMS_CLASS = ComponentCollection::class;

    protected $isSelected;
    protected $isComponent = true;
    protected $controller;
    protected $subComponent;
    protected $type = "";

    public function __construct(array $params = [])
    {
        $params['content'] ??= [];

        $this->isSelected = $params["isSelected"] ?? true;
        $this->isComponent = Components::isComponent($params["type"] ?? "");
        $this->subComponent = Components::subComponent($params["type"] ?? "");
        $this->controller = $params["options"]["controller"] ?? null;
        $extends = $params["options"]["extends"] ?? null;

        // Inject content object if possible
        // Preset cause parent will kill it
        if ($params['content'] instanceof Content) {
            $content = $params['content'];
        }

        parent::__construct($params);

        if(isset($content)) {
            $this->content = $content;
        }

        //Extends content

        if (is_null($extends)) {
            return;
        }

		if (is_array($extends)) {
            $this->content->update($extends);
        } else {
            //Try to take data from kirby objects
            try {
                $extends = $extends->content()->toArray();
                $this->content->update($extends);
            } catch (\Throwable $th) {
                throw new InvalidArgumentException('Could not resolve extension data');
            }
        }
    }


    public function __call(string $method, array $args = [])
    {

        if ($this->hasMethod($method)) {
            return $this->callMethod($method, $args);
        }

        return $this->content()->get($method);
    }

    public function subComponent(): string
    {
        return $this->subComponent;
    }

    public function isSelected(): bool|null
    {
        return $this->isSelected;
    }

    public function isComponent(): bool
    {
        return $this->isComponent;
    }

    public function controller(): array
    {
        $controller = parent::controller();

        if ($this->isComponent() === false) {
            $params = $controller["block"]->params;
            $params["type"] = $this->subComponent();
            $controller["block"] = Block::factory($params);
            return $controller;
        }

        $controller['component'] = $this;
        unset($controller["block"]);

        return $controller;
    }

    public function toHtml(): string
    {
        try {
            $snippet = $this->type();

            if ($this->isComponent()) {
                $snippet = "_components/" . $snippet;
            }

            $kirby = $this->parent()->kirby();
            return (string) $kirby->snippet(
                $snippet,
                $this->controller(),
                true
            );
        } catch (\Throwable $e) {
            if ($kirby->option("debug") === true) {
                return '<p>Block error: "' .
                    $e->getMessage() .
                    '" in block type: "' .
                    $this->type() .
                    '"</p>';
            }

            return "";
        }
    }

    public function toArray(): array
    {
        return A::merge(parent::toArray(), [
            "isComponent" => $this->isComponent(),
            "isSelected" => $this->isSelected(),
        ]);
    }
}
