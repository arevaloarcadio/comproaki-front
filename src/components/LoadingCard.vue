<template>
   <ion-row>
    <ion-col v-for="dat in 4" :key="dat" sizeLg="3" sizeMd="4" sizeXs="6">
      <ion-card>
        <ion-thumbnail>
          <ion-skeleton-text :animated="true"></ion-skeleton-text>
        </ion-thumbnail>
        <ion-card-header>
          <ion-card-title>
            <ion-skeleton-text :animated="true" style="width: 80%;"></ion-skeleton-text>
          </ion-card-title>
          <ion-card-subtitle>
            <ion-skeleton-text :animated="true" style="width: 80%;"></ion-skeleton-text>
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-skeleton-text :animated="true" style="width: 30%;"></ion-skeleton-text>
        </ion-card-content>
      </ion-card>
    </ion-col>
  </ion-row>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import {
    IonButton,
    IonRow,
    IonCol,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSkeletonText,
    IonThumbnail,
  } from '@ionic/vue';

export default defineComponent({
  name: 'LoadingCard',
  components :{
    IonButton,
    IonRow,
    IonCol,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSkeletonText,
    IonThumbnail,
  }
});

</script>

