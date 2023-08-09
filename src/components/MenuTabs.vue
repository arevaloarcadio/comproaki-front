<template>
  <ion-footer>
    <ion-toolbar>
      <ion-row>
          <ion-col>
            <ion-tab-button 
              tab="dashboard" 
              :class="{'active' : $route.path == '/dashboard'}" 
              @click="$router.push('/dashboard')"
            >
              <div class="item-center">
                <ion-icon :icon="layersOutline"></ion-icon>
              </div>
              <div class="item-center">
                <ion-label>Dashboard</ion-label>
              </div>
            </ion-tab-button>
          </ion-col>
          <ion-col>
            <ion-tab-button 
              tab="store" 
              :class="{'active' : $route.path == '/store'}" 
              @click="$router.push('/store')"
            >
              <div class="item-center">
                <ion-icon :icon="storefrontOutline"></ion-icon>
              </div>
              <div class="item-center">
                <ion-label>Tiendas</ion-label>
              </div>
            </ion-tab-button>
          </ion-col>
          <!--<ion-col>
            <ion-tab-button 
              tab="products" 
              :class="{'active' : $route.path == '/profile/myproducts'}" 
              @click="$router.push('/profile/myproducts')"
            >
              <div class="item-center">
                <ion-icon :icon="pricetagsOutline"></ion-icon>
              </div>
              <div class="item-center">
                <ion-label>Productos</ion-label>
              </div>
            </ion-tab-button>
          </ion-col>-->
          <ion-col>
            <ion-tab-button 
              tab="profile" 
              :class="{'active' : $route.path == '/profile'}" 
              @click="$router.push('/profile')"
            >
              <div class="item-center">
                <ion-icon :icon="personOutline"></ion-icon>
              </div>
              <div class="item-center">
                <ion-label>Perfil</ion-label>
              </div>
            </ion-tab-button>
          </ion-col>
      </ion-row>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">

import {
  IonImg, 
  IonCard, 
  IonCardContent, 
  IonCardHeader,
  IonFabList,
  IonFab,
  IonFabButton,  
  IonCardSubtitle, 
  IonCardTitle
} from '@ionic/vue'

import { layersOutline, storefrontOutline, pricetagsOutline, personOutline } from 'ionicons/icons';

export default {
  name: 'MenuTabs',
  components : {
    IonImg,
    IonCard, 
    IonCardContent, 
    IonCardHeader,
    IonFabList,
    IonFab,
    IonFabButton,  
    IonCardSubtitle, 
    IonCardTitle
  },
  data() {
    return {
    }
  },
  setup(){ 
    return{
      layersOutline, storefrontOutline, pricetagsOutline, personOutline
    }
  }
};
</script>
<style>
  .data-selected {
    background-color: #bfcbc3;    
  }
  
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: center;
    height: 87px;
    width: 100%;
  }

  .active {
    color: #2dd36f;
  } 

  .item-center {
    text-align: center;
  }
</style>