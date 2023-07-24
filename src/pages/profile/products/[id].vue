<template>
  <base-view>
    
    <template #default-view-title>
      <div class="hearder-app">
        Editar Producto
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
                    <ion-select  interface="popover" v-model="store_id" class="input-text">
                      <ion-select-option v-for="store in stores" :key="store" :value="store.id">
                        {{store.name}}
                      </ion-select-option>
                    </ion-select>
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
      </diV>
    </template>
  </base-view>
</template>

<script>
import { 
  defineComponent 
} from 'vue';

import { IonAvatar ,IonSelectOption, IonSelect, IonTextarea } from '@ionic/vue';

import { 
  pricetagsOutline,
  storefrontOutline,
  add,
  arrowBackOutline 
} from 'ionicons/icons';
import toast from '@/plugins/toast'
import axios from 'axios'
import countries from '@/data/countries.js'
import data_states from '@/data/states.json'

export default defineComponent({
  name: 'App',
  components: { 
    IonAvatar,
    IonSelectOption,
    IonSelect,
    IonTextarea
  },
  setup(){ 
    return{
      storefrontOutline,
      pricetagsOutline,
      add,
      arrowBackOutline
    }
  },
  data() {
    return {
      baseURL: axios.defaults.baseURL,
      countries,
      stores: [],
      states: [],
      store_id: null,
      id: null,
      name: null,
      state: null,
      country: null,
      phone: null,
      description: null,
      image : null
    }
  },
  mounted(){
    this.getStores()
    this.getStore()
    this.id = this.$route.query.id 
    this.name = this.$route.query.name  
    this.description  = this.$route.query.description 
    document.querySelector('#image-store').src = this.baseURL+this.$route.query.image  
   // this.getStates()
  },
  methods:{
    async postStore(){
      var loading = await toast.showLoading()

      loading.present();
      
      var formData = new FormData();

      formData.append("name",this.name)
      //formData.append("store_id",this.store_id)
      formData.append("image",this.image)
      formData.append("description",this.description)

      axios.post('/api/products/'+this.id,formData)
      .then(res => {
        toast.openToast("Producto modificado exitosamente","success",2000)
        loading.dismiss()
        this.$router.go(-1)
        console.log(res.data)
      }).catch(error => {
         loading.dismiss()
        console.log(error)
      })
    },
    getStores(){
      axios.get('/api/stores')
      .then(res => {
        this.stores = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    getStore(){
      axios.get('/api/products/'+this.$route.query.id)
      .then(res => {
        const product = res.data.data
        this.store_id = product.store.id
      }).catch(error => {
        console.log(error)
      })
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
