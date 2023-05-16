<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
         <ion-icon :icon="arrowBackOutline" class="position-icon-back" size="large" @click="$router.push('/dashboard')"></ion-icon>
        <ion-title>
          <div class="hearder-app">
            {{store.name}}
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="true" style="height: 800px;">
      <br>
      <div style="justify-content:center;display:flex;">
        <img :alt="product.name" class="img-details" :src="baseURL+product.image" />
      </div>
      <br>
      <ion-row>
        <ion-col size="12" style="font-size: 20px"><b>{{product.name}}</b></ion-col>
        <ion-col size="12" style="color: #2dd36f;font-weight: 600;font-size: 20px;">Descripción</ion-col>
        <ion-col size="12" style="font-size: 18px">{{product.description}}</ion-col>
        <ion-col size="12" style="color: #2dd36f;font-weight: 600;font-size: 20px;">Ubicación</ion-col>
        <ion-col size="12" style="font-size: 18px">{{product.country}}, {{product.state}}</ion-col>
       <ion-col size="6">
          <button v-if="follow" style="margin-top: 30px;" class="button-follower" color="primary" @click="setNotFollow">
            Seguiendo
          </button>
          <button v-else style="margin-top: 30px;" class="button-follow" color="primary" @click="setFollow">
            Seguir
          </button>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script>

import { 
  defineComponent 
} from 'vue';

import {
  IonHeader
} from '@ionic/vue';

import { 
  pricetagsOutline,
  storefrontOutline,
  add,
  trashOutline,
  pencilOutline,
  arrowBackOutline 
} from 'ionicons/icons';
import { mapGetters } from 'vuex'
import axios from 'axios'

export default defineComponent({
  name: 'App',
  components : {
    IonHeader
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  setup(){ 
    return{
      storefrontOutline,
      pricetagsOutline,
      add,
      trashOutline,
      pencilOutline,
      arrowBackOutline
    }
  },
  data() {
    return {
      baseURL: axios.defaults.baseURL,
      product: null,
      store: {name : "Cargando"},
      follow : 0,
    }
  },
  created(){
    this.product = this.$route.query
    this.checkFollow()
    this.getStore()
  },
  methods:{
    getStore(){
      axios.get('/api/stores/'+this.product.store_id)
      .then(res => {
        this.store = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    setFollow(){
      this.follow = 1
      
      axios.post('/api/followers',{
        user_id: this.getUser.id, 
        store_id:this.product.store_id
      })
      .then(res => {
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    setNotFollow(){
      this.follow = 0
      
      axios.post('/api/followers/delete/'+this.getUser.id+'/'+this.product.store_id)
      .then(res => {
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    checkFollow(){
      axios.get('/api/followers/check/'+this.getUser.id+'/'+this.product.store_id)
      .then(res => {
        this.follow = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
  }
});

</script>

<style>
  .store-selected {
    background-color: #bfcbc3;    
  }

  ion-card-subtitle{
    font-weight: 600;
  }

  .img-details{
    border-radius: 10px; height: 200px;width: 265px;
  }

  .button-follow{
    border: 1px solid #2dd36f;
    background: rgb(255, 255, 255);
    border-radius: 10px;
    padding: 15px 22px;

    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #2dd36f;
    width: 151px;
  }

  .button-follower{
    border: 1px solid #2dd36f;
    background: rgb(255, 255, 255);
    border-radius: 10px;
    padding: 15px 22px;
    background: #2dd36f;
    border-radius: 10px;
    color: #FFFFFF;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    width: 151px;
  }
</style>