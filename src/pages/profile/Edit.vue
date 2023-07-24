<template>
  <base-view>
    
    <template #default-view-title>
      <div class="hearder-app">
         Editar Perfil
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
                    <input type="text" v-model="user.firstname" class="input-text">
                  </div>
                </div>
              </ion-col>  

              <ion-col sizeXs="12">
                <div class="container">
                  <label class="label-input">Apellido</label>
                  <div class="input-container">
                    <input type="text" v-model="user.lastname" class="input-text">
                  </div>
                </div>
              </ion-col> 

              <ion-col sizeXs="12">
                <div class="container">
                  <label class="label-input">Contraseña</label>
                  <div class="input-container">
                    <input type="password" v-model="user.password" class="input-text">
                  </div>
                </div>
              </ion-col> 

              <ion-col sizeXs="12">
                <div class="container">
                  <label class="label-input">Confirmar contraseña</label>
                  <div class="input-container">
                    <input type="password" v-model="user.password_confirmation" class="input-text">
                  </div>
                </div>
              </ion-col> 

              <ion-col sizeXs="12">
                <div style="justify-content: center;display: flex;">
                  <ion-button color="primary" @click="editProfile()">
                    Enviar
                  </ion-button>
                </div>
              </ion-col>
            </ion-row>
        
          </ion-col>
        
          <ion-col sizeLg="4" sizeMd="4" sizeXs="12"></ion-col>
        
        </ion-row>
      </div>
    </template>
  </base-view>
</template>

<script>

import { 
  defineComponent 
} from 'vue';
import { 
  IonSelectOption, 
  IonSelect, 
  IonTextarea 
} from '@ionic/vue';
import { 
  pricetagsOutline,
  storefrontOutline,
  add,
  arrowBackOutline,
  createOutline 
} from 'ionicons/icons';
import toast from '@/plugins/toast'
import axios from 'axios'
import { useUserStore } from '@/plugins/store';

export default defineComponent({
  name: 'App',
  components: { 
    IonSelectOption,
    IonSelect,
    IonTextarea
  },
  setup(){ 
    const userStore = useUserStore();

    return{
      storefrontOutline,
      pricetagsOutline,
      createOutline,
      arrowBackOutline,
      userStore,
      add,
    }
  },
  data() {
    return {
      baseURL: axios.defaults.baseURL,
      user : {
        id:null,
        email: null,
        lastname: null,
        firstname: null, 
        password: null,
        password_confirmation: null,
        image:null
      },
    }
  },
  mounted(){
    this.user = this.userStore.getUser
    document.querySelector('#image-store').src = this.baseURL+this.user.image
  },
  methods:{
    async editProfile(){
      
      const loading = await toast.showLoading()

      loading.present();
      
      var formData = new FormData();

      formData.append("firstname",this.user.firstname)
      formData.append("lastname",this.user.lastname)
      formData.append("password",this.user.password)
      formData.append("password_confirmation",this.user.password_confirmation)
      formData.append("image",this.image)

      this.userStore.editProfile(formData)
      .then(res => {
        loading.dismiss()
        toast.openToast("Edición de perfil exitoso","success",2000)
        this.$router.go(-1)
      })
      .catch(error => { 
        loading.dismiss()
        console.log(error);
      });
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
