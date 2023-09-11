<template>
  <base-view>
    
    <template #default-view-title>
      <div class="hearder-app">
        Agregar Categoria
      </div>
		</template>

    <template #default-view-body>
      <div style="padding-right: 14px;">
        <ion-row>
          <ion-col sizeLg="4" sizeMd="4" sizeXs="12" />
          <ion-col sizeLg="4" sizeMd="4" sizeXs="12">
            <ion-row>
              <ion-col  sizeXs="12">
                <div style="justify-content: center;display: flex;">
                  
                  <ion-avatar @click="file">
                    <img alt="avatar" id="image-category" src="/card-media.png" />
                  </ion-avatar>
                  
                  <button  @click="file" class="button-edit-profile">
                    <ion-icon style="margin-left: 3px;margin-top: 3px;" :icon="createOutline" ></ion-icon>
                  </button>
                  
                  <input 
                    type="file" 
                    @change="getImage" 
                    style="display: none"  
                    ref="picture"  
                    id="file-input-category" 
                    name="file-input-category" 
                    accept="image/x-png,image/jpeg" 
                  />
                </div>
              </ion-col> 
              
              <ion-col sizeXs="12">
                <div class="container">
                  <label class="label-input">Nombre</label>
                  <div class="input-container">
                    <input type="text" v-model="name" class="input-text">
                  </div>
                </div>
              </ion-col>  
              
              <br/>
              
              <ion-col sizeXs="12">
                <div class="container">
                  <label class="label-input">Tienda</label>
                  <div class="input-container">
                    <ion-select  interface="popover" v-model="store_id" class="input-text" disabled="true" >
                      <ion-select-option v-for="store in stores.data" :key="store" :value="store.id">
                        {{store.name}}
                      </ion-select-option>
                    </ion-select>
                  </div>
                </div>
              </ion-col>
              
              <br/>
              
              <ion-col sizeXs="12">
                <div class="container">
                  <label class="label-input">Descripción</label>
                  <div class="input-container">
                    <ion-textarea  
                      v-model="description" 
                      :auto-grow="true" 
                      class="input-textarea"
                    ></ion-textarea>
                  </div>
                </div>
              </ion-col>

              <ion-col sizeXs="12">
                <div style="justify-content: center;display: flex;">
                  <ion-button color="primary" @click="postCategory()">
                    Enviar
                  </ion-button>
                </div>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col  sizeLg="4" sizeMd="4" sizeXs="12" />
        </ion-row>
      </div>
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
import { defineComponent } from 'vue';
import { IonTextarea, IonAvatar } from '@ionic/vue';
import { createOutline } from 'ionicons/icons';
import { 
  IonSelectOption,
  IonSelect
} from '@ionic/vue';


export default defineComponent({
  name: 'App',
  components: {
    IonTextarea,
    IonAvatar,
    IonSelectOption,
    IonSelect
  },
  setup(){ 
    return{
      createOutline
    }
  },
  data() {
    return {
      name : null,
      description: null,
      image: null,
      stores: [],
      store_id: null
    }
  },
  mounted(){
    this.getStores()
  },
  methods:{
    async postCategory(){
      
      var loading = await toast.showLoading()

      loading.present();
      
      var formData = new FormData();

      formData.append("name",this.name)
      formData.append("description",this.description)
      formData.append("image",this.image)
      formData.append("store_id",this.store_id)
      
      axios.post('/api/categories',formData)
      .then(res => {
        loading.dismiss()
        toast.openToast("Categoria registrada exitosamente","success",2000)
        this.$router.go(-1)
        console.log(res.data)
      }).catch(error => {
        loading.dismiss()
        console.log(error)
      })
    },
    getStores(){
      axios.get('/api/stores/byUser')
      .then(res => {
        this.stores = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(() => {
         this.store_id = this.stores.data[0].id
      })
    },
    file(){
      document.querySelector('#file-input-category').click()
    },
    getImage($event) {
      this.image = $event.target.files[0];
      document.querySelector('#image-category').src = window.webkitURL.createObjectURL($event.target.files[0])
    },
  }
});

</script>

<style>

</style>