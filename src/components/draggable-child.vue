<template>
    <div style="min-height: 25px;padding-top: 0.75rem;">

        <draggable class="form-stage__drag row" :options="{group: 'elements'}" :list="items">

            <div v-for="el in items" :key="el.id" :class="[ el.column ? 'col-6': 'col-12']">

                <div :class="['element element-'+ el.type]">{{ el.name }} 

                    <draggable-child :items="el.items" v-if="el.container == true"></draggable-child>

                </div>

            </div>

        </draggable>

    </div>
    
</template> 



<script>
import draggable from 'vuedraggable'
export default {
    props: ['items'],
    name: 'draggableChild',
    components: {
        draggable
    }
}
</script>


