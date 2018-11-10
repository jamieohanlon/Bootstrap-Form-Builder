<template>

    <div :class="['element element-'+ el.type]"><span>{{ el.type !== "text" ? el.name : el.body }}</span>
        <span class="element-col" v-if="el.type == 'column'">({{ el.columnSize }} of 12)</span>
        <div class="element-tools">
            <FormItemEdit :item="el" v-show="noEdit"></FormItemEdit>
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
    data() {
        return {
            dupIndex: 0
        }
    },
    methods: {
        deleteItem: function() {
           this.items.splice(this.index, 1);
        }
    },
    computed: {
        noEdit() {
            return this.el.type !== "container" && this.el.type !== "row";
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
.element-col {
    font-size: 12px;
    color: darkgrey;
}
</style>




