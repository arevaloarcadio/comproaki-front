<template>
  <ion-content class="ion-padding">
    <div>
      <br>
      <center><ion-title size="large">Comproaki</ion-title></center>  
      <br/>
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
              <center>
                <ion-button color="primary" @click="login()">
                  Enviar
                </ion-button>
                <br>
                <ion-button color="primary" @click="redirect()">
                  Login
                </ion-button>
              </center>
              </ion-col>
            <ion-col  sizeLg="4" sizeMd="4" sizeXs="12"></ion-col>
          </ion-row>
        </div>
      </div>
  </ion-content>
</template>

<script>

import { IonButton,IonCol,IonRow } from "@ionic/vue";
import axios from 'axios'
import jwtToken from "@/plugins/jwt/jwt-token";
import {mapActions, mapGetters} from "vuex";
import user from "@/plugins/jwt/user";
import toast from '@/plugins/toast'

export default {
  name: "login-",
  components: {
    IonCol,
    IonRow,
    IonButton
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
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  mounted(){
    console.log(this.getUser.id)
  },
  methods: {
    ...mapActions([
      'setAuthUser',
    ]),
    redirect(){
      location.href = "/login"
    },

    async login(){

      var loading = await toast.showLoading()

      loading.present();

      axios.post('/users',{
        firstname : this.first_name,
        lastname : this.last_name,
        email : this.email,
        password : this.password, 
        password_confirmation : this.password_confirmation, 
      })
      .then(res => {
        loading.dismiss()
        console.log(res)
        user.setUser(res.data.user)
        jwtToken.setToken(res.data.access_token);
        this.setAuthUser(res.data.user)
        toast.openToast("Registro exitoso","success",10000);
        //this.$router.push('/login')
        location.href = "/login"
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



