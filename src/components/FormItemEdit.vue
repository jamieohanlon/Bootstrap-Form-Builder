<template>
<div class="centerx">
    <vs-button class="element-edit" @click="active=true" vs-color="primary" vs-type="flat" vs-size="small">Edit</vs-button>
    <vs-popup class="holamundo" :title="'Editing: '+item.name" :active.sync="active" @vs-cancel="active=false">
    <div class="row">
        <div class="col-12">
            <div class="edit-options" v-if="item.type == 'input' || item.type == 'textarea'">
                <div class="edit-options__item">
                    <vs-input class="inputx" vs-label="Element Name" :placeholder="item.name" v-model="item.name"/>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="edit-options__item">
                            <vs-input class="inputx" vs-label="Element Class" :placeholder="item.class" v-model="item.class"/>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="edit-options__item">
                            <vs-input class="inputx" vs-label="Element ID" :placeholder="item.classId" v-model="item.classId"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div v-if="item.label" class="edit-options__item">
                            <vs-input class="inputx" vs-label="Label Text" :placeholder="item.labelText" v-model="item.labelText"/>
                        </div>
                    </div>
                    <div class="col-6">
                        <div v-if="item.placeholder" class="edit-options__item">
                            <vs-input class="inputx" vs-label="Placeholder Text" :placeholder="item.placeholderText" v-model="item.placeholderText"/>
                        </div>
                    </div>
                </div>
                <div class="edit-options__item-group">
                    <div class="edit-options__item edit-options__item--switch">
                        <label for="">Enable placeholder</label>
                        <vs-switch v-model="item.placeholder"/>
                    </div>
                </div>
                <div class="edit-options__item-group">
                    <div class="edit-options__item edit-options__item--switch">
                        <label for="">Enable label</label>
                        <vs-switch v-model="item.label"/>
                    </div>
                </div>
                <div class="edit-options__item edit-options__item--switch">
                    <label for="">Required</label>
                    <vs-switch v-model="item.required"/>
                </div>
            </div>
            <div class="edit-options" v-if="item.type == 'column'">
                <div class="edit-options__item">
                    <vs-input-number min="2" max="12" v-model="item.columnSize"/>
                </div>
            </div>
            <div class="edit-options" v-if="item.type == 'button'">
                 <div class="edit-options__item">
                    <vs-input class="inputx" vs-label="Button Text" :placeholder="item.buttonText" v-model="item.buttonText"/>
                </div>
                <div class="edit-options__item">
                    <span>Select the button type (<a href="https://getbootstrap.com/docs/4.1/components/buttons/">See here for examples</a>):</span>
                     <vs-select class="selectExample" label="Figuras" v-model="item.buttonType">
                        <vs-select-item  vs-value="primary" vs-text="Primary" />
                        <vs-select-item  vs-value="secondary" vs-text="Secondary" />
                        <vs-select-item  vs-value="success" vs-text="Success" />
                        <vs-select-item  vs-value="danger" vs-text="Danger" />
                        <vs-select-item  vs-value="warning" vs-text="Warning" />
                        <vs-select-item  vs-value="info" vs-text="Info" />
                        <vs-select-item  vs-value="light" vs-text="Light" />
                        <vs-select-item  vs-value="dark" vs-text="Dark" />
                        <vs-select-item  vs-value="link" vs-text="Link" />
                    </vs-select>

              
                </div>
            </div>
            <div class="edit-options" v-if="item.type == 'panel'">
                 <div class="edit-options__item">
                    <vs-input class="inputx" vs-label="Panel Title" :placeholder="item.name" v-model="item.name"/>
                </div>
                <div class="edit-options__item">
                    <span>Select the button type (<a href="https://getbootstrap.com/docs/4.1/components/buttons/">See here for examples</a>):</span>
                     <vs-select class="selectExample" label="Figuras" v-model="item.backgroundColor">
                        <vs-select-item  vs-value="primary" vs-text="Primary" />
                        <vs-select-item  vs-value="secondary" vs-text="Secondary" />
                        <vs-select-item  vs-value="success" vs-text="Success" />
                        <vs-select-item  vs-value="danger" vs-text="Danger" />
                        <vs-select-item  vs-value="warning" vs-text="Warning" />
                        <vs-select-item  vs-value="info" vs-text="Info" />
                        <vs-select-item  vs-value="light" vs-text="Light" />
                        <vs-select-item  vs-value="dark" vs-text="Dark" />
                        <vs-select-item  vs-value="link" vs-text="Link" />
                    </vs-select>

              
                </div>
            </div>
        </div>
        <!--<div class="col-6">
            <div class="edit-options__preview">
                ELEMENT PREVIEW
            </div>
        </div>-->
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
  }
}
</script>

<style>

.vs-popup-text {
    overflow-x: hidden !important;
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

.edit-options__item-group .edit-options__item {
    margin: 0;
}

.edit-options__preview {
    color: #73b1c7;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ecfaff;
}

.element-button .element-edit {
    color: white;
}

.input-select {
    width: 100%;
}

.vs-component .vs-switch {
    border-radius: 12px !important;
}
</style>


