<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
         <ion-icon :icon="arrowBackOutline" class="position-icon-back" size="large" @click="$router.push('/my_stores')"></ion-icon>
        <ion-title>
          <div class="hearder-app">
            Agregar Tienda
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding" :fullscreen="true" style="height: 800px;">
      <ion-row>
        <ion-col  sizeLg="4" sizeMd="4" sizeXs="12"></ion-col>
        <ion-col  sizeLg="4" sizeMd="4" sizeXs="12">
          <ion-row>
            <ion-col  sizeXs="12">
              <div style="justify-content: center;display: flex;">
                <ion-avatar @click="file">
                  <img alt="Silhouette of a person's head" id="image-store" src="https://ionicframework.com/docs/img/demos/card-media.png" />
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
            <ion-col  sizeXs="12">
              <div class="container">
                <label class="label-input">Pais</label>
                <div class="input-container">
                  <ion-select interface="action-sheet" v-model="country" @ionChange="getStates" class="input-text">
                    <ion-select-option v-for="country in countries" :key="country">
                      {{country.country}}
                    </ion-select-option>
                  </ion-select>
                </div>
              </div>
            </ion-col>
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
                <label class="label-input">Teléfono</label>
                <div class="input-container">
                  <input type="text" v-model="phone" class="input-text">
                </div>
              </div>
            </ion-col>
            <ion-col  sizeXs="12">
              <div class="container">
                <label class="label-input">Dirección</label>
                <div class="input-container">
                  <ion-textarea  v-model="address" :auto-grow="true" class="input-textarea"></ion-textarea>
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
    </ion-content>
  </ion-page>
</template>



<script>
import { 
  defineComponent 
} from 'vue';

import { IonSelectOption,IonSelect,IonTextarea} from '@ionic/vue';

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
      countries,
      stores: [],
      states: [],
      name: null,
      state: null,
      country: null,
      phone: null,
      address: null,
      image : null
    }
  },
  mounted(){
    
  },
  methods:{
    async postStore(){
      var loading = await toast.showLoading()

      loading.present();
      
      var formData = new FormData();

      formData.append("name",this.name)
      formData.append("state",this.state)
      formData.append("country",this.country)
      formData.append("phone",this.phone)
      formData.append("image",this.image)
      formData.append("address",this.address)

      axios.post('/api/stores',formData)
      .then(res => {
        toast.openToast("Tienda registrada exitosamente","success",2000)
        loading.dismiss()
        this.$router.push('/my_stores')
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
