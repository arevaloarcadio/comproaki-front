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
                    <label class="label-input">Email</label>
                    <div class="input-container">
                      <input type="text" v-model="email" class="input-text">
                    </div>
                  </div>
                </ion-col>  
                
                <br>

                <ion-col  sizeXs="12">
                  <div class="container">
                    <label class="label-input">Contraseña</label>
                    <div class="input-container">
                      <input type="password" v-model="password" class="input-text">
                    </div>
                  </div>
                </ion-col>
              </ion-row>

              <center>
                <ion-button color="primary" @click="login()">
                  Enviar
                </ion-button>
                <br>
                <ion-button color="primary" @click="redirect()">
                  Registro
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
      email : '',
      password : ''
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
      location.href = "/register"
    },
    async login(){

      var loading = await toast.showLoading()

      loading.present();

      let data = {
        email : this.email,
        password : this.password
      }

      axios.post('/auth/login',data)
      .then(res =>{
      console.log(res)
        
        loading.dismiss()
        
        user.setUser(res.data.user)
        jwtToken.setToken(res.data.access_token);
        this.setAuthUser(res.data.user)
        location.href = '/dashboard'
        
        //this.$router.push('/user/envios')
      }).catch(error => {
        loading.dismiss()
        if (error.response.status == 400) {
          toast.openToast("Creendenciales Invalidas","error",10000);
        }
        console.log(error)
      })
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



