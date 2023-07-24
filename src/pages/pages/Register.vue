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
              </div>
              </ion-col>
            <ion-col  sizeLg="4" sizeMd="4" sizeXs="12"></ion-col>
          </ion-row>
        </div>
      </div>
    </template>
  </base-view-page>
</template>

<script>

import { IonButton,IonCol,IonRow } from "@ionic/vue";
import axios from 'axios'
import toast from '@/plugins/toast'
import { useUserStore } from '@/plugins/store';
import { useRouter } from 'vue-router';

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
  mounted(){
  
  },
  methods: {
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
      .then(res => {
        loading.dismiss()
        if(res.status == 201){
          toast.openToast("Registro exitoso","success",2000)
          this.$router.push('/pages/login')
        }
      })
      .catch(error => { 
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



