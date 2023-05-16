<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
         <ion-icon :icon="arrowBackOutline" class="position-icon-back" size="large" @click="$router.push('/profile')"></ion-icon>
        <ion-title>
          <div class="hearder-app">
            Mis Productos
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="true" style="height: 800px;">
      <ion-row>
        <ion-col v-for="(product,key) in products" :key="product" sizeLg="3" sizeMd="4" sizeXs="6">
          <ion-card class="touchstart" :id="'product-'+key">
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
      <ion-fab  slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button :activated="fabActivated" id="fab" @click="check_redirect">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button @click="$router.push({name: 'edit_product', params: {id :productSelected.id}, query: {...productSelected}})">
            <ion-icon :icon="pencilOutline"></ion-icon>
          </ion-fab-button>
          <ion-fab-button>
            <ion-icon :icon="trashOutline"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>
  </ion-page>
</template>

<script>

import { 
  defineComponent 
} from 'vue';

import {
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  //IonCardSubtitle,
  IonFabList,
  IonFab,
  IonFabButton, 
   
  IonCardTitle
} from '@ionic/vue';

import { 
  pricetagsOutline,
  storefrontOutline,
  add,
  trashOutline,
  pencilOutline,
  arrowBackOutline 
} from 'ionicons/icons';

import axios from 'axios'

export default defineComponent({
  name: 'App',
  components : {
    IonCard, 
    IonCardContent, 
    IonCardHeader,
    IonFabList,
    IonFab,
    IonFabButton,  
    //IonCardSubtitle, 
    IonCardTitle
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
      touchSupport: false,
      products: [],
      fabActivated: false,
      productSelected: null
    }
  },
  mounted(){
    this.getProducts()
  },
  methods:{
    getProducts(){
      axios.get('/api/products')
      .then(res => {
        this.products = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.initTouch()
      })
    },
    check_redirect($event){
      if($event.isTrusted && !this.fabActivated){
        this.$router.push('/add_product')
      }
      this.fabActivated = !this.fabActivated
    },
    initTouch(){
      this.touchSupport = ('ontouchstart' in document.documentElement) ? true : false;
      
      var tStart = 'touchstart';
      var tEnd = 'touchend';
      var btns = document.querySelectorAll(".touchstart");
      var stay_touch;
      var self = this
      
      btns.forEach((btn) =>{
       
        btn.addEventListener(tStart,function() {
          stay_touch = setTimeout(function() { 
            btns.forEach((btn) => {
              btn.classList.remove("store-selected");
            })
            var key = btn.id.split('-')[1]
            self.productSelected = self.products[key]
            btn.classList.add("store-selected");
            document.querySelector('#fab').click()
          }, 500);
        });

        btn.addEventListener(tEnd,function() {
          //btn.classList.remove("store-selected");
          clearInterval(stay_touch);
        }); 
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
</style>