<template>
	<div
		:data-empty="blocks.length === 0"
		:data-multi-select-key="isMultiSelectKey"
		class="k-blocks"
	>
		<template v-if="hasFieldsets">
			<k-draggable v-bind="draggableOptions" class="k-blocks-list k-grid" @sort="save">
				<k-component-block
					v-for="(block, index) in blocks"
					:ref="'block-' + block.id"
					:key="block.id"
					v-bind="block"
					:endpoints="endpoints"
					:fieldset="fieldset(block)"
					:is-batched="isSelected(block) && selected.length > 1"
					:is-last-selected="isLastSelected(block)"
					:is-full="isFull"
					:is-hidden="block.isHidden === true"
					:is-mergable="isMergable"
					:is-selected="isSelected(block)"
					:next="prevNext(index + 1)"
					:prev="prevNext(index - 1)"
					@append="add($event, index + 1)"
					@chooseToAppend="choose(index + 1)"
					@chooseToConvert="chooseToConvert(block)"
					@chooseToPrepend="choose(index)"
					@click.native.prevent.stop="onClickBlock(block, $event)"
					@close="isEditing = false"
					@confirmToRemoveSelected="confirmToRemoveSelected"
					@copy="copy()"
					@duplicate="duplicate(block, index)"
					@focus="onFocus(block)"
					@focusPrev="focusPrev(index)"
					@focusNext="focusNext(index)"
					@hide="hide(block)"
					@merge="merge()"
					@open="isEditing = true"
					@paste="pasteboard()"
					@prepend="add($event, index)"
					@remove="remove(block)"
					@show="show(block)"
					@selectDown="selectDown"
					@selectUp="selectUp"
					@sortDown="sort(block, index, index + 1)"
					@sortUp="sort(block, index, index - 1)"
					@split="split(block, index, $event)"
					@update="update(block, $event)"
				/>
				<template #footer>
					<k-empty
						class="k-blocks-empty k-column"
						style="--width: 1/1"
						icon="box"
						@click="choose(blocks.length)"
					>
						{{ empty || $t("field.blocks.empty") }}
					</k-empty>
				</template>
			</k-draggable>

			<k-block-selector
				ref="selector"
				:fieldsets="fieldsets"
				:fieldset-groups="fieldsetGroups"
				@add="add"
				@convert="convert"
				@paste="paste($event)"
			/>

			<k-remove-dialog
				ref="removeAll"
				:text="$t('field.blocks.delete.confirm.all')"
				:submit-button="$t('delete.all')"
				@submit="removeAll"
			/>

			<k-remove-dialog
				ref="removeSelected"
				:text="$t('field.blocks.delete.confirm.selected')"
				@submit="removeSelected"
			/>

			<k-block-pasteboard ref="pasteboard" @paste="paste($event)" />
		</template>
		<template v-else>
			<k-box theme="info"> No fieldsets yet </k-box>
		</template>
	</div>
</template>
<script>

export default {
  //Extends because the endpoint
  extends: "k-blocks",
  inheritAttrs: false,
  methods: {

    async add(type = "text", index) {

		if(type === "text") {
			type = "textblocks/text";
		}
		const block = await this.$api.get(
			this.endpoints.field + "/_component_/" + type
		);
		this.blocks.splice(index, 0, block);
		this.save();

		this.$nextTick(() => this.focusOrOpen(block));
	},

	async split(block, index, contents) {
			// prepare old block with reduced content chunk
			const oldBlock = this.$helper.clone(block);
			oldBlock.content = { ...oldBlock.content, ...contents[0] };
			// create a new block and merge in default contents as
			// well as the newly splitted content chunk
			const newBlock = await this.$api.get(
				this.endpoints.field + "/_component_/" + block.type
			);
			newBlock.content = {
				...newBlock.content,
				...oldBlock.content,
				...contents[1]
			};
			// in one go: remove old block and onsert updated and new block
			this.blocks.splice(index, 1, oldBlock, newBlock);
			this.save();
			this.$nextTick(() => this.focus(newBlock));
		},

    async convert(type, block) {
			const index = this.findIndex(block.id);

			if (index === -1) {
				return false;
			}

			const fields = (fieldset) => {
				let fields = {};

				for (const tab of Object.values(fieldset?.tabs ?? {})) {
					fields = {
						...fields,
						...tab.fields
					};
				}

				return fields;
			};

			const oldBlock = this.blocks[index];
			const newBlock = await this.$api.get(
				this.endpoints.field + "/_component_/" + type
			);

			const oldFieldset = this.fieldsets[oldBlock.type];
			const newFieldset = this.fieldsets[type];

			if (!newFieldset) {
				return false;
			}

			let content = newBlock.content;

			const newFields = fields(newFieldset);
			const oldFields = fields(oldFieldset);

			for (const [name, field] of Object.entries(newFields)) {
				const oldField = oldFields[name];

				if (oldField?.type === field.type && oldBlock?.content?.[name]) {
					content[name] = oldBlock.content[name];
				}
			}

			this.blocks[index] = {
				...newBlock,
				id: oldBlock.id,
				content: content
			};

			this.save();
		},
  },
};
</script>

<style>

	.k-blocks-list.k-grid {
		grid-row-gap: 0;
	}

</style>