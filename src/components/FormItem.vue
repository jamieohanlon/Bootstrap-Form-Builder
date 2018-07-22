<template>

    <div :class="['element element-'+ el.type]">{{ el.name }} 

        <draggableChild :items="el.items" v-if="el.container == true"></draggableChild>

    </div>

</template>

<script>

import draggableChild from './draggable-child.vue'

export default {
    props: ["el"],
    name: "FormItem",
    components: {
        draggableChild
    }

}
</script>



