<template>
  <ion-page>
    <ion-header class="ion-padding">
      <ion-row>
        <ion-col size="10" style="margin-top: 10px;">
          <div class="container-box-search">
            <div class="input-container-box-search input-icons" style="height: 55px;">
              <i style="margin-top: 7px;margin-left: 18px;">
                <img src="/assets/icon/search.svg">
              </i>
              <input type="text"  placeholder="Buscar"  class="input-text-box-search">
            </div>
          </div>
        </ion-col>
        <ion-col size="2">  
          <div style="display: flex;justify-content: center;">
            <ion-icon @click="$router.push('/profile')" style="margin-top: 22px;" :icon="storefrontOutline" size="large"></ion-icon>
          </div>
        </ion-col>
      </ion-row>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="true" style="height: 800px;">
      <ion-row>
        <ion-col v-for="(product,key) in products" :key="product" sizeLg="3" sizeMd="4" sizeXs="6" @click="$router.push({name : 'details_product',params:{id :product.id},query:{...product}})">
          <ion-card :id="'product-'+key">
            <img :alt="product.name" style="height: 200px;width: 265px;" :src="baseURL+product.image" />
            <ion-card-header>
              <ion-card-title><b>{{product.name}}</b></ion-card-title>
              <ion-card-subtitle >{{product.store.name}}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-content>
    <MenuTabs/>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import MenuTabs from '@/components/MenuTabs'
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage
} from '@ionic/vue';
import { storefrontOutline } from 'ionicons/icons';
import axios from 'axios'

export default defineComponent({
  name: 'App',
  components : {
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    MenuTabs
  },
  data(){
    return{
      products: [],
      baseURL: axios.defaults.baseURL,
    }
  },
  mounted(){
    this.getProducts()
  },
  setup(){ 
    
    const refresh = (ev) => {
      setTimeout(() => {
        ev.detail.complete();
      }, 3000);
    };

    return{
      refresh,
      storefrontOutline
    }
  },
  methods :{
    getMessage(id){
      return this.messages.find(m => m.id === id);
    },
    getProducts(){
      axios.get('/api/products')
      .then(res => {
        this.products = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
  }
});

</script>
