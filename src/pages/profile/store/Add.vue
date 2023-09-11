<template>
  <base-view>
    
    <template #default-view-title>
      <div class="hearder-app">
        Agregar Tienda
      </div>
		</template>

    <template #default-view-body>
      <div style="padding-right: 14px;">
        <ion-row>
          <ion-col  sizeLg="4" sizeMd="4" sizeXs="12"></ion-col>
          <ion-col  sizeLg="4" sizeMd="4" sizeXs="12">
            <ion-row>
              <ion-col  sizeXs="12">
                <div style="justify-content: center;display: flex;">
                  <ion-avatar @click="file">
                    <img alt="avatar" id="image-store" src="/card-media.png" />
                  </ion-avatar>
                  <button  @click="file" class="button-edit-profile">
                    <ion-icon style="margin-left: 3px;margin-top: 3px;" :icon="createOutline" ></ion-icon>
                  </button>
                  <input type="file" @change="getImage" style="display: none"  ref="picture"  id="file-input" name="file-input" accept="image/x-png,image/jpeg" />
                </div>
              </ion-col> 
              <ion-col  sizeXs="12">
                <div class="container">
                  <label class="label-input">Nombre</label>
                  <div class="input-container">
                    <input type="text" v-model="name" class="input-text">
                  </div>
                </div>
              </ion-col>  
              <br>
           
              <ion-col  sizeXs="12">
                <div class="container">
                  <label class="label-input">Estado o Provincia</label>
                  <div class="input-container">
                    <ion-select interface="action-sheet" v-model="state" class="input-text">
                      <ion-select-option v-for="state in states" :key="state">
                        {{state.name}}
                      </ion-select-option>
                    </ion-select>
                  </div>
                </div>
              </ion-col>
              
              <ion-col  sizeXs="12">
                <div class="container">
                  <label class="label-input">Tipo de Tienda</label>
                  <div class="input-container">
                    <ion-select interface="action-sheet" v-model="type" class="input-text">
                      <ion-select-option v-for="type in types" :key="type" :value="type">
                        {{type}}
                      </ion-select-option>
                    </ion-select>
                  </div>
                </div>
              </ion-col>

              <ion-col  sizeXs="12">
                <div class="container">
                  <label class="label-input">Ciudad</label>
                  <div class="input-container">
                    <input type="text" v-model="city" class="input-text">
                  </div>
                </div>
              </ion-col>
              <ion-col  sizeXs="12">
                <div class="container">
                  <label class="label-input">Código Postal</label>
                  <div class="input-container">
                    <input type="text" v-model="postal_code" class="input-text">
                  </div>
                </div>
              </ion-col>
              <ion-col  sizeXs="12">
                <div class="container">
                  <label class="label-input">Teléfono</label>
                  <div class="input-container">
                    <input type="text" v-model="phone" class="input-text">
                  </div>
                </div>
              </ion-col>
              
              <ion-col sizeXs="12">
                <div class="container">
                  <label class="label-input">Etiquetas</label>
                  <div class="input-container">
                    <template v-if="selected_tags.length == 0">
                      <input 
                        type="text" 
                        @click="selectTags" 
                        class="input-text" 
                        id="input-text-tags"
                        readonly
                      >
                      <i>
                        <ion-icon :icon="caretDownOutline" class="tag-icon"></ion-icon>
                      </i>
                    </template>
                    <div v-else id="container-items-tag" class="input-multiselect" @click="selectTags">
                      <ion-row id="ion-row-items-tag">
                        <div v-for="(tag,key) in selected_tags" :key="tag" id="container-row-items-tag" class="row-tags">
                          <div :id="'item-tags-'+key" class="item-tag">
                            {{tag.name}}
                            <ion-icon 
                              :id="'icon-'+key"
                              @click="removeTag(key)"
                              :icon="closeOutline" 
                              style="position: absolute;margin-top: 1px;"
                            ></ion-icon>
                          </div>
                        </div>
                      </ion-row>
                     
                    </div>
                  </div>
                </div>
              </ion-col>
              
              <ion-col sizeXs="12">
                <div class="container">
                  <label class="label-input">Dirección</label>
                  <div class="input-container">
                    <ion-textarea  
                      v-model="address" 
                      :auto-grow="true" 
                      class="input-textarea"
                    ></ion-textarea>
                  </div>
                </div>
              </ion-col>
              <ion-col sizeXs="12">
                <div style="justify-content: center;display: flex;">
                  <ion-button color="primary" @click="postStore()">
                    Enviar
                  </ion-button>
                </div>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col  sizeLg="4" sizeMd="4" sizeXs="12"></ion-col>
        </ion-row>
      </div>
      <ion-popover
        :is-open="is_open_popover_tag"
        :event="event_tag_popover"
        trigger-action="click"
        @didDismiss="is_open_popover_tag = false"
      >
        <PopoverSelect 
          :options="tags"
          :options_selected="selected_tags" 
          @clickData="getTagsSelected"
        ></PopoverSelect>
      </ion-popover>
    </template>
    
    <template #default-view-footer>
      <ion-footer>
			  <ion-toolbar>
				  <MenuTabs/>
			  </ion-toolbar>
		  </ion-footer>
    </template>
    
  </base-view>
</template>

<script>

import toast from '@/plugins/toast'
import axios from 'axios'
import countries from '@/data/countries.js'
import data_states from '@/data/states.json'
import PopoverSelect from '@/components/PopoverMultiSelect.vue'
import { 
  defineComponent 
} from 'vue';

import { 
  IonSelectOption,
  IonSelect,
  IonTextarea,
  popoverController,
  IonPopover
} from '@ionic/vue';

import { 
  pricetagsOutline,
  storefrontOutline,
  add,
  arrowBackOutline,
  createOutline,
  caretDownOutline,
  closeOutline 
} from 'ionicons/icons';

export default defineComponent({
  name: 'App',
  components: { 
    IonSelectOption,
    IonSelect,
    IonTextarea,
    PopoverSelect,
    IonPopover
  },
  setup(){ 
    return{
      storefrontOutline,
      pricetagsOutline,
      add,
      arrowBackOutline,
      createOutline,
      caretDownOutline,
      closeOutline
    }
  },
  data() {
    return {
      countries,
      stores: [],
      states: [],
      tags: [],
      types: ['Restaurant','Tienda'],
      selected_tags: [],
      event_tag_popover: null,
      is_open_popover_tag: false,
      country: 'España',
      name: null,
      state: null,
      city: null,
      type: null,
      postal_code: null,
      phone: null,
      address: null,
      image : null
    }
  },
  mounted(){
    this.getStates()
    this.getTags()
  },
  methods:{
    async postStore(){
      var loading = await toast.showLoading()

      loading.present();
      
      var formData = new FormData();

      formData.append("name",this.name)
      formData.append("state",this.state)
      formData.append("city",this.city)
      formData.append("type",this.type)
      formData.append("postal_code",this.postal_code)
      formData.append("phone",this.phone)
      formData.append("address",this.address)
      formData.append("image",this.image)
      
      this.selected_tags.forEach(selected_tag => {
        formData.append("tags[]",selected_tag.id)
      });

      axios.post('/api/stores',formData)
      .then(res => {
        loading.dismiss()
        toast.openToast("Tienda registrada exitosamente","success",2000)
        this.$router.go(-1)
        console.log(res.data)
      }).catch(error => {
         loading.dismiss()
        console.log(error)
      })
    },
    getStates(){
      var country = data_states.data.find(country => {
        return country.name == this.country
      })
      this.states = country.states
    },
    getTags(){
      axios.get('/api/tags/all')
      .then(res => {
        this.tags = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    removeTag(key){
      this.selected_tags.splice(key, 1);
    },
    selectTags(Event){
      
      if(Event.target.id.includes("icon")){
        return
      }

      this.is_open_popover_tag = true
      this.event_tag_popover = Event
    },
    getTagsSelected(tag){
      let validate = this.selected_tags.find(selected_tag => selected_tag.id == tag.id)
      
      if(validate === undefined)
        this.selected_tags.push(tag)
    },
    file(){
      document.querySelector('#file-input').click()
    },
    getImage($event) {
      this.image = $event.target.files[0];
      document.querySelector('#image-store').src = window.webkitURL.createObjectURL($event.target.files[0])
    },
  }
});

</script>

<style>

</style>