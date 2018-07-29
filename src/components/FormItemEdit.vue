<template>
<div class="centerx">
    <vs-button class="element-edit" @click="active=true" vs-color="primary" vs-type="flat" vs-size="small">Edit</vs-button>
    <vs-popup class="holamundo"  :vs-title="'Editing: '+item.name" :vs-active="active" @vs-cancel="active=false">
    <div class="row">
        <div class="col-6">
            <div class="edit-options" v-if="item.type == 'input' || item.type == 'textarea'">
                <div class="edit-options__item">
                    <vs-input class="inputx" vs-label="Element Name" :placeholder="item.name" v-model="item.name"/>
                </div>
                <div class="edit-options__item edit-options__item--switch">
                    <label for="">Enable placeholder</label>
                    <vs-switch v-model="item.placeholder"/>
                </div>
                <div v-if="item.placeholder" class="edit-options__item">
                   <vs-input class="inputx" vs-label="Placeholder Text" :placeholder="item.placeholderText" v-model="item.placeholderText"/>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="edit-options__preview">
                ELEMENT PREVIEW
            </div>
        </div>
     </div>
    </vs-popup>
  </div>
    
</template> 



<script>

export default {
    props: ['item'],
    name: 'FormItemEdit',
    data(){
    return {
      active:false,
    }
  },
    methods: {

    }
}
</script>

<style>

.element-edit {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
}

.edit-options__item {
    margin-bottom: 1.5rem;
}

.edit-options__item--switch {
    display: flex;
    justify-content: space-between;
}

.edit-options__item .vs-con-input-label {
    width: 100%;
}

.edit-options__preview {
    color: #73b1c7;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ecfaff;
}
</style>


