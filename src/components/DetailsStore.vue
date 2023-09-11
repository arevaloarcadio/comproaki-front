<template>
 <div>
  <ion-menu type="push" :content-id="'main-content-'+content" side="end" style="z-index: 22;">
      <ion-header>
        <ion-img
          style="height: 210px;"
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
  </div>
</template>

<script lang="ts">

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
import { setUrl } from '@/plugins/utils/img-src' 
import { 
  closeOutline 
} from 'ionicons/icons';

export default {
  name: 'DetailsStore',
  props: ['store','content'],
  components : {
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
  },
  setup(){
    return{
      setUrl,
      closeOutline
    }
  }
};
</script>
