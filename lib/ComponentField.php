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

        $this->setDefault($params["default"] ?? []);
        parent::__construct($params);
        $this->setSelector($params["selector"] ?? []);
    }

    public function setFieldsets($fieldsets, $model): void
    {
        if (empty($fieldsets)) {
            throw new NotFoundException("No component(s) set.");
        }
        $fieldsets = A::wrap($fieldsets);
        $this->isSingle = count($fieldsets) === 1;
        parent::setFieldsets($fieldsets, $model);
    }
    
	public function pasteBlocks(array $blocks): array
	{
		$blocks = $this->blocksToValues($blocks);

		foreach ($blocks as $index => &$block) {
			$block['id'] = Str::uuid();

			// remove the block if it's not available
			try {
				$this->fieldset($block['type']);
				
			} catch (Throwable) {
				unset($blocks[$index]);
			}
		}

		// don't add blocks that exceed the maximum limit
		if ($max = $this->max()) {
			$blocks = array_slice($blocks, 0, $max);
		}

		return $blocks;
	}

    private function prefill($value = null)
    {
        $out = array();

        foreach ($this->components() as $componentName) {
            $component = $value[$componentName] ?? [];
            $default_item = $this->params["selector"]["default"] ?? "";
            $component["isSelected"] ??= $default_item === $componentName;

            //If there is only one component: Select them
            if ($this->isSingle) {
                $component["isSelected"] = true;
            }

            $component["type"] ??= $componentName;

            //Input is a regulary block
            if (Components::isComponent($componentName) === false) {
                $component["type"] = Components::subComponent($componentName);
                $block = Block::factory($component)
                    ->content()
                    ->toArray();
                $component["content"] = $block;
                $component["type"] = $componentName;
            }

            $component['content'] ??= $this->default[$componentName] ?? $this->default ?? [];
            $component["id"] ??= Str::uuid();

            $out[$componentName] = $component;
        }

        return $out;
    }
    public function fill($value = null): void
    {
        $value = ComponentCollection::parse($value);
        $value = $this->prefill($value);

        $this->value = $this->blocksToValues($value);
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
                "text" => $fieldset->name(),
                "value" => $fieldset->type(),
            ];
        }
        $this->selector = Field::factory("imagetoggles", $props);
    }

	protected function setDefault($default = null): void
	{
        $this->default = $default;
	}
}
