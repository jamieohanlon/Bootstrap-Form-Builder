<template>
    <div style="min-height: 25px;padding-top: 0.75rem;">

        <draggable class="form-stage__drag row" :options="{group: 'elements'}" :list="items"  @add="onAdd">

            <div v-for="(el, index) in items" :key="el.id" :class="[ el.column ? 'col-'+el.columnSize: 'col-12']">

                <FormItem :el="el" :items="items" :index="index"></FormItem>

            </div>

        </draggable>
        

    </div>
    
</template> 



<script>
import FormItem from './FormItem.vue'
import draggable from 'vuedraggable'


export default {
    props: ['parent','items'],
    name: 'draggableChild',
    components: {
        draggable
    },
    methods: {
        onAdd: function() {
            this.$emit('childAdded');
        }
    }
}
</script>


