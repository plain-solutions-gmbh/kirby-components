<?php

namespace Microman;

/**
 * @package   Kirby Components
 * @author    Roman Gsponer <kirby@microman.ch>
 * @link      https://microman.ch/
 * @copyright Roman Gsponer
 * @license   https://license.microman.ch/license/
 */

use Kirby\Form\Field;
use Kirby\Form\Form;
use Kirby\Form\Field\BlocksField;
use Kirby\Exception\InvalidArgumentException;
use Kirby\Toolkit\A;
use Kirby\Toolkit\Str;

class ComponentsField extends BlocksField
{
    protected $fieldsets;
    protected $fields;
    protected $tabs;
    protected $components;
    protected static $formCache;
    protected static $fieldsetCache;

    public function __construct(array $params = [])
    {
        $this->setTabs($params["tabs"] ?? []);
        parent::__construct($params);
    }

    public function fieldsets()
    {
        return $this->fieldsets ?? [];
    }

    public function tabs()
    {
        return $this->tabs ?? [];
    }

    public function components(): array
    {
        return array_keys($this->fieldsets()->toArray());
    }

    public function blocksToValues($components, $to = "values"): array
    {
        $result = [];
        $fields = [];

        foreach ($components as $key => $component) {
            try {
                $type = $component["type"];
                $content = $component["content"] ?? null;
                $fields = $this->fields($component["type"]);

                if (empty($content)) {
                    //Get default from fiels
                    $content = A::map($fields, fn($a) => $a["default"] ?? "");
                    //Get default from this field
                    $content = A::merge($content, $this->default() ?? []);
                }

                $content = $this->form($fields, $content)->$to();

                $component["content"] = $content;

                $result[$key] = $component;
            } catch (Throwable) {
                $result[$key] = $component;
                continue;
            }
        }

        return $result;
    }

    public function fill($value = null)
    {
        $value = ComponentCollection::parse($value);

        $value = array_values($value);
        $blocks = ComponentCollection::factory($value);

        $this->value = $this->blocksToValues($blocks->toArray());
    }

    public function form(array $fields = null, $input = []): Form
    {
        $hash = md5(serialize($fields) . serialize($input));
        if (isset(static::$formCache[$hash])) {
            return static::$formCache[$hash];
        }

        return static::$formCache[$hash] = new Form([
            "fields" => $fields,
            "model" => $this->model(),
            "strict" => true,
            "values" => $input,
        ]);
    }

    public function routes(): array
    {
        $field = $this;

        return [
            [
                "pattern" => "/_component_/(:any)/fields/(:any)/(:all?)",
                "method" => "ALL",
                "action" => function (
                    string $fieldsetType,
                    string $fieldName,
                    string $path = null
                ) use ($field) {
                    $fieldsetType = Str::replace($fieldsetType, "__", "/");

                    $fields = $field->fields($fieldsetType);
                    $field = $field->form($fields)->field($fieldName);

                    $fieldApi = $this->clone([
                        "routes" => $field->api(),
                        "data" => array_merge($this->data(), [
                            "field" => $field,
                        ]),
                    ]);

                    return $fieldApi->call(
                        $path,
                        $this->requestMethod(),
                        $this->requestData()
                    );
                },
            ],
            [
                "pattern" => "_component_/(:any)",
                "method" => "GET",
                "action" => function ($fieldsetType) use ($field) {
                    $fieldsetType = Str::replace($fieldsetType, "__", "/");
                    $fields = $field->fields($fieldsetType);
                    $defaults = $field->form($fields, [])->data(true);
                    $content = $field->form($fields, $defaults)->values();

                    return Component::factory([
                        "content" => $content,
                        "type" => $fieldsetType,
                    ])->toArray();
                },
            ],
        ];
    }

    public function setFieldsets($fieldsets, $model)
    {
        if (empty($fieldsets)) {
            throw new InvalidArgumentException("Missing component definition");
        }
        $fieldsets = A::wrap($fieldsets);

        $fieldsets = ComponentFieldsets::factory($fieldsets, [
            "parent" => $model,
            "tabs" => $this->tabs,
        ]);

        //To remove?
        $this->fields = $fieldsets->fields();

        $this->fieldsets = $fieldsets;
    }

    protected function setComponents($components)
    {
        $this->components = A::wrap($components);
    }

    protected function setTabs($tabs)
    {
        $this->tabs = $tabs;
    }
}
