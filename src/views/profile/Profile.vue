<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
         <ion-icon :icon="arrowBackOutline" class="position-icon-back" size="large" @click="ionRouter.push('/dashboard')"  router-link="/detail"></ion-icon>
        <ion-title>
          <div class="hearder-app">
            Mi Perfil
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content  class="ion-padding" style="height: 800px;">
      <ion-row style="font-size: 18px;" @click="$router.push('/my_products')">
        <ion-icon :icon="pricetagsOutline" size="large"></ion-icon>
        &nbsp;&nbsp;
        Mis Productos
      </ion-row>
      <ion-row style="font-size: 18px;margin-top: 14px;" @click="$router.push('/my_stores')">
        <ion-icon :icon="storefrontOutline" size="large"></ion-icon>
        &nbsp;&nbsp;
        Mis Tiendas
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script>

import { 
  defineComponent 
} from 'vue';

import {
  IonContent
} from '@ionic/vue';

import { useIonRouter } from '@ionic/vue';
import { 
  pricetagsOutline,
  storefrontOutline,
  arrowBackOutline 
} from 'ionicons/icons';

export default defineComponent({
  name: 'App',
  components : {
    IonContent
  },
  setup(){ 
    const ionRouter = useIonRouter();
    
    return{
      storefrontOutline,
      pricetagsOutline,
      arrowBackOutline,
      ionRouter
    }
  }
});

</script>
