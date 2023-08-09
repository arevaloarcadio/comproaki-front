<template>
  <base-view>

    <template #slot-view-title>
      <ion-header  id="main-content">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="$router.go(-1)">
              <ion-icon :icon="arrowBackOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
          
          <ion-title>
            <div class="hearder-app">
              {{store.name}}
              
            </div>
          </ion-title>
          <ion-buttons slot="end">
            <button v-if="follow" class="button-follower" color="primary" @click="setNotFollow">
            Seguiendo
          </button>
          <button v-else class="button-follow" color="primary" @click="setFollow">
            Seguir
          </button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-menu-toggle>
              <ion-icon :icon="menuOutline" size="large"></ion-icon>
            </ion-menu-toggle>
          </ion-buttons>
        </ion-toolbar>
		  </ion-header>
    </template>
    
    <template #default-view-body>
      <!--Inicio del menu-->
      <ion-content>
   
        <ion-menu type="push" content-id="main-content" side="end" style="z-index: 22;">
          <ion-header>
            <ion-img
              :src="setUrl(store.image)"
              :alt="'Logo de '+ store.name"
            />
            <ion-toolbar>
              <ion-title>
                <div class="hearder-app">
                  {{store.name}}
                </div>
              </ion-title>
              <ion-buttons slot="end">
                <ion-menu-toggle>
                  <ion-icon :icon="closeOutline" size="large"></ion-icon>
                </ion-menu-toggle>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          
          <ion-content class="ion-padding">
            <ion-list>
              <ion-item-group>
                <ion-item-divider>
                  <ion-label> Provincia </ion-label>
                </ion-item-divider>

                <ion-item lines="none">
                  <ion-label class="not-white-space">{{store.state}}</ion-label>
                </ion-item>
              </ion-item-group>

              <ion-item-group>
                <ion-item-divider>
                  <ion-label>Cuidad</ion-label>
                </ion-item-divider>

                <ion-item lines="none">
                  <ion-label class="not-white-space">{{store.city}}</ion-label>
                </ion-item>
              </ion-item-group>
              
              <ion-item-group>
                <ion-item-divider>
                  <ion-label>Dirección</ion-label>
                </ion-item-divider>

                <ion-item lines="none">
                  <ion-label class="not-white-space">{{store.address}}</ion-label>
                </ion-item>
              </ion-item-group>

              <ion-item-group>
                <ion-item-divider>
                  <ion-label>Teléfono</ion-label>
                </ion-item-divider>

                <ion-item  lines="none">
                  <ion-label class="not-white-space">{{store.phone}}</ion-label>
                </ion-item>
              </ion-item-group>

            </ion-list>
          </ion-content>
        </ion-menu>
   
        <CardDashboard v-if="loading" :data="products.data" @clickData="getKeyStore($event)"></CardDashboard>
   
      </ion-content>
      <!--Fin del menu-->
    </template>

    <template #default-view-footer>
      <MenuTabs></MenuTabs>
    </template>
  
  </base-view>
    <!----
      <ion-col size="6">
        <button v-if="follow" style="margin-top: 30px;" class="button-follower" color="primary" @click="setNotFollow">
          Seguiendo
        </button>
        <button v-else style="margin-top: 30px;" class="button-follow" color="primary" @click="setFollow">
          Seguir
        </button>
      </ion-col>
    -->
</template>

<script>

import { 
  defineComponent 
} from 'vue';

import {
  IonHeader,
  IonMenuToggle,
  IonMenu,
  IonButton,
  IonContent,
  IonList, 
  IonItem, 
  IonItemDivider, 
  IonItemGroup, 
  IonLabel 
} from '@ionic/vue';

import { 
  pricetagsOutline,
  storefrontOutline,
  add,
  trashOutline,
  pencilOutline,
  arrowBackOutline,
  menuOutline,
  closeOutline 
} from 'ionicons/icons';
import { useUserStore } from '@/plugins/store'
import axios from 'axios'
import CardDashboard from '@/components/CardProduct.vue'
import { setUrl } from '@/plugins/utils/img-src' 

export default defineComponent({
  name: 'App',
  components : {
    IonHeader,
    IonMenuToggle,
    IonMenu,
    IonButton,
    IonList,
    IonItem, 
    IonItemDivider, 
    IonItemGroup, 
    IonLabel, 
    CardDashboard
  },
  setup(){ 
    return{
      storefrontOutline,
      pricetagsOutline,
      add,
      trashOutline,
      pencilOutline,
      arrowBackOutline,
      menuOutline,
      closeOutline
    }
  },
  data() {
    return {
      baseURL: axios.defaults.baseURL,
      store: {name : "Cargando"},
      loading: false,
      products :[],
      follow : 0,
      user: null,
      setUrl
    }
  },
  created(){
    const store = useUserStore()
    this.user = store.getUser
    this.store = this.$route.query
    this.checkFollow()
    this.getProducts()
    //this.getStore()
  },
  mounted(){
    console.log("mounted")
    this.hideHeader();
  },
  beforeRouteEnter(to, from,next) {
    next(vm => {
    });
    this.hideHeader();
  },
  beforeRouteLeave(to, from) {
    this.showHeader();
  },
  methods:{
    hideHeader(){
      const elements = document.querySelectorAll('.header-default-view-title')
      elements.forEach(element => {
        element.style.display = 'none';
      })
    },
    showHeader(){
      const elements = document.querySelectorAll('.header-default-view-title')
      elements.forEach(element => {
        element.style.display = 'block';
      })
    },
    getKeyStore(product){
      console.log(product)
      this.$router.push({
        path : '/product/'+product.id, 
        query : {
          ...product
        }
      })
    },
    getStore(){
      axios.get('/api/stores/'+this.store.id)
      .then(res => {
        this.store = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    getProducts(){
      axios.get('/api/products/byStore/'+this.store.id)
      .then(res => {
        this.products = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.loading = true
      })
    },
    setFollow(){
      this.follow = 1
      
      axios.post('/api/followers',{
        user_id: this.user.id, 
        store_id:this.store.id
      })
      .then(res => {
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    setNotFollow(){
      this.follow = 0
      
      axios.post('/api/followers/delete/'+this.user.id+'/'+this.store.id)
      .then(res => {
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    checkFollow(){
      axios.get('/api/followers/check/'+this.user.id+'/'+this.store.id)
      .then(res => {
        this.follow = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
  }
});

</script>


<style scoped="true">

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
    padding: 5px 5px;

    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #2dd36f;
    width: 120px;
  }

  .button-follower{
    border: 1px solid #2dd36f;
    background: rgb(255, 255, 255);
    border-radius: 10px;
    padding: 5px 5px;
    background: #2dd36f;
    border-radius: 10px;
    color: #FFFFFF;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    width: 120px;
  }

  .product-name{
    font-size: 20px;
  }

  .product-description{
    color: #2dd36f;font-weight: 600;font-size: 20px;
  }

  .product-address{
    color: #2dd36f;font-weight: 600;font-size: 20px;
  }


</style>