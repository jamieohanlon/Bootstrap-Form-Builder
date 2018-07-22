<template>
  <div class="form-builder">
      <aside>
          <h2 class="text-center">Form Builder</h2>
          <div class="elements">
              <draggable v-model="elements" :options="{group: {name: 'elements', pull: 'clone', put: 'false'},  sort: false}" :clone="onClone">
                <div v-for="item in elements" :key="item.type">
                    <div class="element" :class="['element-'+ item.type]">{{ item.name }}</div>
                </div>
              </draggable>
          </div>

      </aside>
      <main>
          <vs-button class="html-btn" vs-color="primary" vs-type="gradient" @click="generateHTML()">Build HTML</vs-button>
            <vs-tabs>
            <vs-tab vs-label="Stage">
                <div class="con-tab-ejemplo" style="padding: 2rem;">
                    <div class="form-stage">
                        <draggable class="form-stage__drag" :list="newElements" :options="{group: 'elements'}">

                            <div v-for="item in newElements" :key="item.id">

                                    <div class="element" :class="['element-'+ item.type]">{{ item.name }} 

                                        <draggable-child :items="item.items" v-if="item.container === true"></draggable-child>
                                        
                                    </div>

                            </div>
                            
                        </draggable>
                    </div>
                </div>
            </vs-tab>
            <vs-tab vs-label="Preview">
                <div class="con-tab-ejemplo" style="padding: 2rem;">
                    <div class="form-preview" v-html="liveHtml">
                    </div>
                </div>
            </vs-tab>
            </vs-tabs>

        <div class="code-output">
            <p class="code-output__title">html output</p>
          <code>
              <pre class="code prettyprint lang-html" style="border: none !important;">

              </pre>
          </code>
        </div>
      </main>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import draggableChild from './draggable-child.vue'

export default {
    components: {
        draggable,
        draggableChild
    },
  data(){
    return {
     elIndex: 0,
     elements: [
        { type: "container", name: "Container", container: true, items: [], id: 0},
        { type: "row", name: "Row", container: true, row: true, items: [], id: 0},
        { type: "column", columnSize: 6, name: "Column", container: true, column: true, items: [], id: 0},
        { type: "input", name: "Text Input", id: 0},
        { type: "textarea", name: "Textarea", id: 0}
     ],
     newElements: [

     ],
     liveHtml: ""
    }
  },
  methods: {
      generateHTML: function() {
          var json = JSON.parse(JSON.stringify(this.newElements));
          var html = document.createElement("form");


            var t = this;      
          json.forEach(function(el, i) {
            
            if (el.container == true ) {
                var element = document.createElement("div");

                if (el.type == "column") {
                    element.classList.add("col-"+el.columnSize);
                }
                element.classList.add(el.type);
                
                if (el.items.length !== 0) {
                    el.items.forEach(function(item) {
                        html.appendChild(t.checkTypes(item, element));
                    })
                } else {
                    html.appendChild(element);
                }

             } else if (el.type == "input") {
                 var formGroup = document.createElement("div");
                    formGroup.classList.add("form-group")
                 var element = document.createElement("input");
                    element.setAttribute("type", "text");
                    element.classList.add("form-control");

                    formGroup.appendChild(element);
                    html.appendChild(formGroup);
             } else if (el.type == "textarea") {
                    var formGroup = document.createElement("div");
                    formGroup.classList.add("form-group");

                    var element = document.createElement("textarea")
                        element.setAttribute("rows", 3);
                        element.classList.add("form-control");

                    formGroup.appendChild(element);
                    html.appendChild(formGroup);
             }


             
          })

          var $code = document.querySelector(".code");
          var $preview = t.$refs.formPreview;
          var newHtml = html_beautify(html.outerHTML);

         $code.textContent = newHtml;
         this.liveHtml = html.outerHTML;
         document.querySelector(".code").classList.remove("prettyprinted");
         PR.prettyPrint();
         document.querySelector(".code-output").classList.add("visible");


          

      },
      checkTypes: function(el, parent) {
                var t = this;
              if (el.container == true ) {
                var element = document.createElement("div");

                if (el.type == "column") {
                    element.classList.add("col-"+el.columnSize);
                }
                element.classList.add(el.type);

                if (el.items.length !== 0) {
                    el.items.forEach(function(item) {
                        parent.appendChild(t.checkTypes(item, element));
                    })
                } else {
                    parent.appendChild(element);
                }
                
             } else if (el.type == "input") {
                 var formGroup = document.createElement("div");
                    formGroup.classList.add("form-group")
                 var element = document.createElement("input");
                    element.setAttribute("type", "text");
                    element.classList.add("form-control");

                    formGroup.appendChild(element);
                    parent.appendChild(formGroup);

             } else if (el.type == "textarea") {
                 var formGroup = document.createElement("div");
                    formGroup.classList.add("form-group");

                    var element = document.createElement("textarea")
                        element.setAttribute("rows", 3);
                        element.classList.add("form-control");

                    formGroup.appendChild(element);
                    parent.appendChild(formGroup);
             }

             return parent;

      },
      onClone: function(el) {
          this.elIndex++;

          if (el.type == "container") {

            return {
              type: el.type,
              name: el.name,
              id: this.elIndex,
              container: true,      
              items: []
            }

          } else if (el.type == "column") {

            return {
              type: el.type,
              columnSize: el.columnSize,
              name: el.name,
              id: this.elIndex,
              container: true,
              column: true,
              items: []
            }

          } else if (el.type == "row") {

            return {
              type: el.type,
              columnSize: el.columnSize,
              name: el.name,
              id: this.elIndex,
              container: true,
              row: true,
              items: []
            }

          } else {

            return {
              type: el.type,
              name: el.name,
              id: this.elIndex
            }

          } 
      }
  }
}
</script>

<style>
    .form-builder {
        display: flex;
        font-family: Open Sans, sans-serif;
    }

    aside {
        padding: 2rem;
        flex-basis: 20%;
        background: white;
        height: 100vh;
        box-shadow: 1px 0 20px rgba(0,0,0,0.1);
        position: relative;
        z-index: 2;
    }

    main {
        flex-basis: 80%;
        position: relative;
    }

    pre {
        white-space: pre-wrap;
    }

    .form-stage {
        border: dashed 2px #d2d2d2;
        padding: 1rem;
    }

    .form-stage__drag {
        min-height: 120px;
    }

    .elements {
        margin: 2rem 0;
    }

    .element {
        background: white;
        color: #199fec;
        border: solid 1px;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        margin-bottom: 0.5rem;
    }

    .element-column {
            background: whitesmoke;
    border: none;
    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    }

    .element-container {
        background: white;
        box-shadow: 0 1px 5px rgba(0,0,0,0.2);
        color: #9a9a9a;
        border: none;
        min-height: 25px;
    }

    .element-textarea {
        height: 100px;
    }

    .list-complete-item {
  padding: 4px;
  margin-top: 4px;
  border: solid 1px;
  height: 60px;
}

.list-complete-enter-active {
  overflow: hidden;
  transition: all 1s;
}

.list-complete-leave-active {
  margin-top: 0px;
  overflow: hidden;
  transition: all 1s;
}
.ul-tabs {
    list-style: none;
}


.html-btn {
    position: absolute;
    top: 5px;
    right: 2rem;
    z-index: 1;
}
.code-output {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2rem;
    background: white; 
    max-height: 300px;
    overflow-y: scroll;
    display: none;
}

.code-output.visible {
    display: block;
}

.code-output__title {
    margin: 0 0 1rem 0;
    color: #c3c3c3;
    text-transform: uppercase;
    font-size: 0.7rem;
}
</style>


