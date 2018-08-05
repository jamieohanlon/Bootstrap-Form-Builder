<template>
  <div class="form-builder">
      <aside>
          <div class="elements">
              <draggable v-model="elements" :options="{group: {name: 'elements', pull: 'clone', put: 'false'},  sort: false}" :clone="onClone" >
                <div v-for="item in elements" :key="item.type">
                    <div class="element" :class="['element-'+ item.type]">{{ item.name }}</div>
                </div>
              </draggable>
          </div>

      </aside>
      <main>
          <vs-button class="html-btn" vs-color="primary" vs-type="gradient" @click="generateHTML()">Build HTML</vs-button>
            <vs-tabs>
            <vs-tab vs-label="Builder">
                <div class="con-tab-ejemplo" style="padding: 2rem;">
                    <div class="form-stage">
                        <draggable class="form-stage__drag" :list="newElements" :options="{group: 'elements'}">
                            <div v-for="(item, index) in newElements" :key="item.id">
                                <FormItem :el="item" :index="index" :items="newElements"></FormItem>
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
            <vs-tab vs-label="Code" >
                <div class="con-tab-ejemplo" style="padding: 2rem;">
                    <div class="code-output">
                        <p class="code-output__title">html output</p>
                        <code>
                            <pre class="code prettyprint lang-html" style="border: none !important;">{{ code }}</pre>
                        </code>
                    </div>
                </div>
            </vs-tab>
            </vs-tabs>

      </main>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import FormItem from './FormItem.vue'

export default {
    name: "FormBuilder",
    components: {
        draggable,
        FormItem
    },
  data(){
    return {
     elIndex: 0,
     elements: [
        { type: "container", name: "Container", container: true, items: [], id: 0},
        { type: "row", name: "Row", container: true, row: true, items: [], id: 0},
        { type: "column", columnSize: 6, name: "Column", container: true, column: true, items: [], id: 0},
        { type: "panel", name: "Panel", container: true, items: [], id: 0},
        { type: "input", name: "Text Input", id: 0},
        { type: "textarea", name: "Textarea", id: 0},
        { type: "button", name: "Button", id: 0}
     ],
     newElements: [

     ],
     liveHtml: "",
     code: ""
    }
  },
  methods: {
      generateHTML: function() {
          var json = JSON.parse(JSON.stringify(this.newElements));
          var html = document.createElement("form");


            var t = this;      
          json.forEach(function(el, i) {
            
           t.checkTypes(el, html);
             
          })

          var newHtml = html_beautify(html.outerHTML);

         this.code = newHtml;
         this.liveHtml = html.outerHTML;
         //document.querySelector(".code").classList.remove("prettyprinted");
         //PR.prettyPrint();
      },
      checkTypes: function(el, parent) {
                var t = this;
              if (el.container == true ) {
                var element = document.createElement("div");

                if (el.type == "column") {
                    element.classList.add("col-"+el.columnSize);
                }


                if (el.type == "panel") {
                    element.classList.add("card");
                    var header = document.createElement("div");
                        header.classList.add("card-header");
                        var title = document.createElement("div");
                            title.innerText = el.name;
                            header.appendChild(title);
                    var body = document.createElement("div");
                        body.classList.add("card-body");
                        element.appendChild(header);

                        if (el.items.length !== 0) {
                            el.items.forEach(function(item) {
                                parent.appendChild(t.checkTypes(item, body));
                            })
                        } 
                        element.appendChild(body);
                         parent.appendChild(element);


                } else {

                    element.classList.add(el.type);

                    if (el.items.length !== 0) {
                        el.items.forEach(function(item) {
                            parent.appendChild(t.checkTypes(item, element));
                        })
                    } else {
                        parent.appendChild(element);
                    }
                }
                
             }  else if (el.type == "input") {
                 var formGroup = document.createElement("div");
                    formGroup.classList.add("form-group")
                    el.label ? formGroup.appendChild(this.createLabel(el)) : void 0;
                 var element = document.createElement("input");
                    element.setAttribute("type", "text");
                    el.class ? element.classList.add(el.class) : void 0;
                    el.classId ? element.setAttribute("id", el.classId) : element.setAttribute("id", "element" + el.id);
                    el.required ? element.setAttribute("required", true) : void 0;
                    element.classList.add("form-control");

                    if (el.placeholder) {
                        element.setAttribute("placeholder", el.placeholderText);
                    }

                    formGroup.appendChild(element);
                    parent.appendChild(formGroup);

             } else if (el.type == "textarea") {
                 var formGroup = document.createElement("div");
                    formGroup.classList.add("form-group");
                    if (el.label) {
                        formGroup.appendChild(this.createLabel(el));
                    }
                    var element = document.createElement("textarea")
                        element.setAttribute("rows", 3);
                        element.classList.add("form-control");
                        el.class ? element.classList.add(el.class) : void 0;
                        el.classId ? element.setAttribute("id", el.classId) : element.setAttribute("id", "element" + el.id);
                        el.required ? element.setAttribute("required", true) : void 0;

                    formGroup.appendChild(element);
                    parent.appendChild(formGroup);
             } else if (el.type =="button") {
                 var btn = document.createElement("button");
                    btn.setAttribute("type", "submit");
                    btn.classList.add("btn", "btn-"+el.buttonType);
                    btn.innerText = el.buttonText;
                    parent.appendChild(btn);
             }

             return parent;

      },
      createLabel: function(el) {
          var label = document.createElement("label");
             el.classId ? label.setAttribute("for", el.classId) : label.setAttribute("for", "element" + el.id);
             label.innerText = el.labelText;

             return label;
          
      },
      onClone: function(el) {
          this.elIndex++;

          if (el.type == "container" || el.type == "panel") {

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

          } else if (el.type == "button") {

            return {
                type: el.type,
                name: el.name,
                id: this.elIndex,
                buttonText: "Submit",
                buttonType: "primary"
            }
              
          } else {

            return {
              type: el.type,
              showLabel: true,
              labelText: el.name,
              name: el.name,
              id: this.elIndex,
              label: true,
              placeholder: false,
              placeholderText: "",
              class: "",
              classId: "",
              required: false
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
        width: 20%;
        background: white;
        height: 100vh;
        box-shadow: 1px 0 20px rgba(0,0,0,0.1);
        position: fixed;
        z-index: 2;
    }

    main {
        flex-basis: 80%;
        position: relative;
        margin-left: auto;
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
        position: relative;
        min-height: 42px;
    }

    .element-panel {
        background: #d2e8ff;
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

    .element-button {
        background: #007bff;
        color: white;
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
    background: white;
    position: fixed !important; 
    z-index: 1;
}

.contiene-tabs {
    margin-top: 2.5rem;
}

.html-btn {
    position: absolute;
    top: 5px;
    right: 2rem;
    z-index: 2;
}
.code-output {
    width: 100%;
    padding: 2rem;
    background: white; 
    font-size: 1rem;
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


