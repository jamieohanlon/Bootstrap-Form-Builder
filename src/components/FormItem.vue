<template>

    <div :class="['element element-'+ el.type]">{{ el.name }} 
        <div class="element-tools">
            <FormItemEdit :item="el" v-show="el.type !== 'container' || el.type !== 'row'"></FormItemEdit>
        </div>

        <draggableChild :items="el.items" v-if="el.container == true"></draggableChild>

    </div>

</template>

<script>

import draggableChild from './draggable-child.vue'
import FormItemEdit from './FormItemEdit.vue'

export default {
    props: ["el", "index", "items"],
    name: "FormItem",
    components: {
        draggableChild,
        FormItemEdit
    }

}
</script>


<style>
.element-tools {
    display: flex;
    position: absolute;
    top: 0.5rem;
    right: 1rem;
}
</style>




