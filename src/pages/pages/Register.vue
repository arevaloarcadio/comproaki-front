<template>
  <base-view-page>
    <template #default-view-body>
    <div>
      <br>
      <div style="text-align: center;"><ion-title size="large">Comproaki</ion-title></div>  
      <br>
        <div>
          <ion-row>
            <ion-col  sizeLg="4" sizeMd="4" sizeXs="12"></ion-col>
            <ion-col  sizeLg="4" sizeMd="4" sizeXs="12">
             <ion-row>
              <ion-col  sizeXs="12">
                <div class="container">
                  <label class="label-input">Nombre</label>
                  <div class="input-container">
                    <input type="text" v-model="first_name" class="input-text">
                  </div>
                </div>
              </ion-col>  

              <ion-col  sizeXs="12">
                <div class="container">
                  <label class="label-input">Apellido</label>
                  <div class="input-container">
                    <input type="text" v-model="last_name" class="input-text">
                  </div>
                </div>
              </ion-col> 

              <ion-col  sizeXs="12">
                <div class="container">
                  <label class="label-input">Correo electrónico</label>
                  <div class="input-container">
                    <input type="text" v-model="email" class="input-text">
                  </div>
                </div>
              </ion-col> 

              <ion-col  sizeXs="12">
                <div class="container">
                  <label class="label-input">Contraseña</label>
                  <div class="input-container">
                    <input type="password" v-model="password" class="input-text">
                  </div>
                </div>
              </ion-col> 

              <ion-col  sizeXs="12">
                <div class="container">
                  <label class="label-input">Confirmar contraseña</label>
                  <div class="input-container">
                    <input type="password" v-model="password_confirmation" class="input-text">
                  </div>
                </div>
              </ion-col> 
              </ion-row>
              <br>
              <div style="text-align: center;">
                <ion-button color="primary" @click="register()">
                  Enviar
                </ion-button>
                <br>
                <ion-button class="pt-1" router-link="/pages/login">
                  Login
                </ion-button>
                <br><br>
                <ion-label>
                  <b>
                    o
                  </b>
                </ion-label>
                <div style="justify-content: center;display: flex;">
                  <img src="/icon/icon-facebook.png" @click="loginFacebook" >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img src="/icon/icon-google.png" @click="loginGoogle">
                </div>
              </div>
              </ion-col>
            <ion-col  sizeLg="4" sizeMd="4" sizeXs="12"></ion-col>
          </ion-row>
        </div>
      </div>
    </template>
  </base-view-page>
</template>

<script lang="ts">

import axios from 'axios'
import toast from '@/plugins/toast'
import jwtToken from '@/plugins/jwt/jwt-token'
import { IonButton, IonCol, IonRow } from "@ionic/vue";
import { useUserStore } from '@/plugins/store';
import { useRouter } from 'vue-router';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

export default {
  name: "register",
  components: {
    IonCol,
    IonRow,
    IonButton
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      first_name : null,
      last_name : null,
      email : null,
      password : null,
      password_confirmation : null,
    };
  },
  created(){
   this.initFacebook()
   this.initGoogle()
  },
  methods: {
    async initFacebook(){
      await FacebookLogin.initialize({ appId: '687712269149585' });
    },
    async initGoogle(){
      await GoogleAuth.initialize();
    },
    async loginFacebook(){
      
      const FACEBOOK_PERMISSIONS = [
        'email',
        'user_birthday',
        'user_photos',
        'user_gender',
      ];
      
      const result = await ((
        FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS })
      ));

      if (result.accessToken) {
        // Login successful.
        var loading = await toast.showLoading()

        loading.present();

        const profile = await FacebookLogin.getProfile<{
          email: string;
          name: string;
          picture: object;
        }>({ fields: ['email','name','picture','id'] });
        
        this.userStore.signUpProvider(
          profile.name,
          profile.email,
          profile.picture.data.url,
          'facebook'
        )
        .then((res:any) => {
          loading.dismiss()
          console.log(res)
          jwtToken.setToken(res.data.access_token);
          this.$router.push('/dashboard')
        }).catch((error:any) => {
          loading.dismiss()
          if (error.response.status == 400) {
            toast.openToast("Creendenciales Invalidas","error",10000);
          }
          console.log(error)
        })
      
      }
    },
    async loginGoogle(){
      const result = await GoogleAuth.signIn();
      
      console.log(result);
      
      if(result.authentication.accessToken){
        var loading = await toast.showLoading()

        loading.present();

        this.userStore.signUpProvider(
          result.name,
          result.email,
          result.imageUrl,
          'google'
        )
        .then((res:any) => {
          loading.dismiss()
          console.log(res)
          jwtToken.setToken(res.data.access_token);
          this.$router.push('/dashboard')
        }).catch((error:any) => {
          loading.dismiss()
          if (error.response.status == 400) {
            toast.openToast("Creendenciales Invalidas","error",10000);
          }
          console.log(error)
        })
      }
      
    },
    async register(){

      var loading = await toast.showLoading()

      loading.present();

      this.userStore.signUp(
        this.first_name,
        this.last_name,
        this.email,
        this.password, 
        this.password_confirmation
      )
      .then((res:any) => {
        loading.dismiss()
        if(res.status == 201){
          toast.openToast("Registro exitoso","success",2000)
          this.$router.push('/pages/login')
        }
      })
      .catch((error:any) => { 
        loading.dismiss()
        console.log(error);
      });
    },
  }
};
</script>

<style scoped>

ion-input {
  background: rgba(63,81,181,.15);
  border-radius: 20px;
  padding: 5px 8px !important;
  margin: 10px 0;

}
ion-button{
 width: 150px;
}

</style>



