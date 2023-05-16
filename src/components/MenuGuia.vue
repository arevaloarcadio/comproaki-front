<template>
  <ion-app>
     <ion-tabs>
        <ion-router-outlet  :animation="sampleAnimation"></ion-router-outlet>
         <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="playCircle" />
            <ion-label>Listen now</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="radio" href="/radio">
            <ion-icon :icon="radio" />
            <ion-label>Radio</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="library" href="/library">
            <ion-icon :icon="library" />
            <ion-label>Library</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="search" href="/search">
            <ion-icon :icon="search" />
            <ion-label>Search</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>

  </ion-app>
</template>

<script>
  import { IonTabs ,IonTabBar, IonTabButton, IonLabel, IonIcon,IonRouterOutlet } from '@ionic/vue';
  import sampleAnimation from "@/plugins/animation/transition";
  import { playCircle, radio, library, search } from 'ionicons/icons';

  export default {
    name: "MenuTabs",
    components: { IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon,IonRouterOutlet },
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
