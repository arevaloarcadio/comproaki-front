<template>
  <ion-app>
    <ion-router-outlet  :animation="sampleAnimation"></ion-router-outlet>
  </ion-app>
</template>

<script >
import { IonApp,IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import sampleAnimation from "@/plugins/animation/transition";

export default defineComponent({
  name: 'App',
  components : {
    IonApp,
    IonRouterOutlet
  },
  setup() {
    return { sampleAnimation };
  },
});
</script>
