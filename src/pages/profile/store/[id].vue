<template>
  <base-view>
    <template #default-view-title>
      <div class="hearder-app">
        Editar Tienda
      </div>
		</template>

    <template #default-view-body>
      <div style="padding-right: 14px;">
        <ion-row>
          <ion-col sizeLg="4" sizeMd="4" sizeXs="12"></ion-col>
          <ion-col sizeLg="4" sizeMd="4" sizeXs="12">
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
              <!--
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
              -->
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
      </div>
    </template>
  </base-view>
</template>



<script>
import { 
  defineComponent 
} from 'vue';

import { IonAvatar,IonSelectOption, IonSelect, IonTextarea } from '@ionic/vue';

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
      country: 'España',
      id: null,
      name: null,
      state: null,
      city: null,
      postal_code: null,
      phone: null,
      address: null,
      image : null
    }
  },
  mounted(){

    this.id = this.$route.query.id 
    this.name = this.$route.query.name  
    this.state = this.$route.query.state  
    this.city = this.$route.query.city  
    this.postal_code  = this.$route.query.postal_code 
    this.phone  = this.$route.query.phone 
    this.address  = this.$route.query.address 
    document.querySelector('#image-store').src = this.baseURL+this.$route.query.image  
    this.getStates()
    this.state = this.$route.query.state  
  },
  methods:{
    async postStore(){
      var loading = await toast.showLoading()

      loading.present();
      
      var formData = new FormData();

      formData.append("name",this.name)
      formData.append("state",this.state)
      formData.append("city",this.city)
      formData.append("postal_code",this.postal_code)
      formData.append("phone",this.phone)
      formData.append("address",this.address)
      formData.append("image",this.image)

      axios.post('/api/stores/'+this.id,formData)
      .then(res => {
        toast.openToast("Tienda modificado exitosamente","success",2000)
        loading.dismiss()
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
