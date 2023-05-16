<template>
  <ion-page>


      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="playCircle" />
          <ion-label>Listen now</ion-label>
        </ion-tab-button>
         <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="playCircle" />
          <ion-label>Listen now</ion-label>
        </ion-tab-button>
  
    </div>
  </ion-page>
</template>

<script>
  import { IonPage , IonIcon } from '@ionic/vue';
  import sampleAnimation from "@/plugins/animation/transition";
  import { playCircle, radio, library, search } from 'ionicons/icons';

  export default {
    name: "MenuTabs",
    components: { IonPage, IonIcon},
    data() {
      return {
        playCircle,
        radio,
        library,
        search,
      };
    },
    setup() {
    return { sampleAnimation };
  },
  };
</script>

<style type="text/css">
.footer {
  position: fixed;
  left: 0;
  bottom: -5px;
  width: 100%;
  background-color: #fff;
  text-align: center;
  height: 87px;
}
</style>