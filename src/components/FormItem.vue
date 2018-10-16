<template>

    <div :class="['element element-'+ el.type]">{{ el.name }} 
        <div class="element-tools">
            <FormItemEdit :item="el" v-show="el.type !== 'container' || el.type !== 'row'"></FormItemEdit>
            <vs-button @click="deleteItem" color="danger" vs-size="small" vs-type="flat">&#x2715;</vs-button>
        </div>

        <draggableChild :items="el.items" :parent="items" v-if="el.container == true"></draggableChild>

    </div>

</template>

<script>

import draggableChild from './draggable-child.vue'
import FormItemEdit from './FormItemEdit.vue'
import Vue from 'vue';

export default {
    props: ["el", "index", "items"],
    name: "FormItem",
    components: {
        draggableChild,
        FormItemEdit
    },
    methods: {
        deleteItem: function() {
            console.log("Index: ", this.index);
            console.log("Items: ", this.items);
           this.items.splice(this.index, 1);
        }
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




