<template>
  <ion-footer>
    <ion-toolbar>
      <ion-row>
          <ion-col>
            <ion-tab-button tab="listen" class="active" >
              <div style="text-align: center;">
                <ion-icon :icon="playCircle"></ion-icon>
              </div>
              <div style="text-align: center;">
                <ion-label>Listen Now</ion-label>
              </div>
            </ion-tab-button>
          </ion-col>
          <ion-col>
            <ion-tab-button tab="radio">
              <div style="text-align: center;">
                <ion-icon :icon="radio"></ion-icon>
              </div>
              <div style="text-align: center;">
                <ion-label>Radio</ion-label>
              </div>
            </ion-tab-button>
          </ion-col>
          <ion-col>
            <ion-tab-button tab="library">
              <div style="text-align: center;">
                <ion-icon :icon="library"></ion-icon>
              </div>
              <div style="text-align: center;">
                <ion-label>Library</ion-label>
              </div>
            </ion-tab-button>
          </ion-col>
          <ion-col>
            <ion-tab-button tab="search">
              <div style="text-align: center;">
                <ion-icon :icon="search"></ion-icon>
              </div>
              <div style="text-align: center;">
                <ion-label>Search</ion-label>
              </div>
            </ion-tab-button>
          </ion-col>
      </ion-row>
    </ion-toolbar>
  </ion-footer>
</template>

<script>

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

import { playCircle, radio, library, search } from 'ionicons/icons';

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
      playCircle, radio, library, search
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

  .active{
    color: #2dd36f;
  } 
</style>