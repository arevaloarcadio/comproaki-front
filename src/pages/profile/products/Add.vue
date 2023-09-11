<template>
  <base-view>
    
    <template #default-view-title>
      <div class="hearder-app">
        Agregar Producto
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

              <ion-col sizeXs="12">
                <div class="container">
                  <label class="label-input">Tienda</label>
                  <div class="input-container">
                    <ion-select  interface="popover" v-model="store_id" class="input-text" disabled="true">
                      <ion-select-option v-for="store in stores.data" :key="store" :value="store.id">
                        {{store.name}}
                      </ion-select-option>
                    </ion-select>
                  </div>
                </div>
              </ion-col>
              
              <ion-col sizeXs="12">
                <div class="container">
                  <label class="label-input">Precio</label>
                  <div class="input-container">
                    <input type="number" v-model="price" class="input-text">
                  </div>
                </div>
              </ion-col> 
              
              <ion-col  sizeXs="12">
                <div class="container">
                  <label class="label-input">Categoria</label>
                  <div class="input-container" @click="selectCategory">
                    <input type="text" v-model="category.name"  class="input-text">
                    <i>
                      <ion-icon :icon="caretDownOutline" style="margin-top: -6px" class="tag-icon"></ion-icon>
                    </i>
                  </div>
                </div>
              </ion-col>

              <ion-col  sizeXs="12">
                <div class="container">
                  <label class="label-input">Descripción</label>
                  <div class="input-container">
                    <ion-textarea  v-model="description" :auto-grow="true" class="input-textarea"></ion-textarea>
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
        :is-open="is_open_popover_category"
        :event="event_category_popover"
        trigger-action="click"
        @didDismiss="is_open_popover_category = false"
      >
        <PopoverSelect 
          :options="categories"
          :option_selected="category" 
          @clickData="getCategorySelected"
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
import { 
  defineComponent 
} from 'vue';

import {
  IonAvatar,
  IonSelectOption,
  IonSelect,
  IonTextarea,
  IonPopover
} from '@ionic/vue';

import { 
  pricetagsOutline,
  storefrontOutline,
  add,
  arrowBackOutline,
  createOutline,
  caretDownOutline
} from 'ionicons/icons';
import toast from '@/plugins/toast'
import axios from 'axios'
import countries from '@/data/countries.js'
import data_states from '@/data/states.json'
import PopoverSelect from '@/components/PopoverSelect.vue'

export default defineComponent({
  name: 'App',
  components: { 
    IonAvatar,
    IonSelectOption,
    IonSelect,
    IonTextarea,
    IonPopover,
    PopoverSelect
  },
  setup(){ 
    return{
      storefrontOutline,
      pricetagsOutline,
      createOutline,
      add,
      arrowBackOutline,
      caretDownOutline
    }
  },
  data() {
    return {
      countries,
      is_open_popover_category: false,
      event_category_popover: null,
      stores: [],
      states: [],
      categories: [],
      name: null,
      state: null,
      store_id: null,
      country: null,
      phone: null,
      description: null,
      category: {
        id :null,
        name:null
      },
      image : null
    }
  },
  mounted(){
    this.getStores()
    
  },
  methods:{
     getStores(){
      axios.get('/api/stores/byUser')
      .then(res => {
        this.stores = res.data.data
        this.store_id = this.stores.data[0].id
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.getCategories()
      })
    },
    getCategories(){
      axios.get('/api/categories/byStore/'+this.store_id +'/all')
      .then(res => {
        this.categories = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    async postStore(){
      var loading = await toast.showLoading()

      loading.present();
      
      var formData = new FormData();

      formData.append("name",this.name)
      formData.append("price",this.price)
      formData.append("store_id",this.store_id)
      formData.append("category_id",this.category.id)
      formData.append("image",this.image)
      formData.append("description",this.description)

      axios.post('/api/products',formData)
      .then(res => {
        toast.openToast("Producto registrada exitosamente","success",2000)
        loading.dismiss()
        this.$router.go(-1)
        console.log(res.data)
      }).catch(error => {
         loading.dismiss()
        console.log(error)
      })
    },
    selectCategory(Event){
      this.is_open_popover_category = true
      this.event_category_popover = Event
    },
    getCategorySelected(category){
      this.is_open_popover_category = false
      this.category = category
    },
    getStates(){
      var country = data_states.data.find(country => {
        return country.name == this.country
      })
      this.states = country.states
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
.select-disabled, .item-select-disabled ion-label {
    opacity: 1;
}
</style>