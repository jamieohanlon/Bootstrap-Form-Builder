<template>

    <div :class="['element element-'+ el.type]">{{ el.name }} 
        <FormItemEdit :item="el"></FormItemEdit>

        <draggableChild :items="el.items" v-if="el.container == true"></draggableChild>

    </div>

</template>

<script>

import draggableChild from './draggable-child.vue'
import FormItemEdit from './FormItemEdit.vue'

export default {
    props: ["el"],
    name: "FormItem",
    components: {
        draggableChild,
        FormItemEdit
    }

}
</script>



