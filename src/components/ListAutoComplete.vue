<template>
  <div v-if="data.length" style="position: relative;">
    <ion-list>
      <ion-item v-if="data.length">
        <ion-label>
          <b> 
            Mostrando {{ data.length }} resultados
          </b>
        </ion-label>
      </ion-item>
      <ion-item  
        v-for="dat in data"
        :key="dat.name"
        class="item-results"
        @click="$emit('clickData',dat.name)"
      >
        <ion-label> {{ dat.name }}</ion-label>
      </ion-item>
    </ion-list>
  </div>
  <div v-else>
    <ion-item v-if="!data.length">
      <ion-label>
        <b> 
          No se encontró ningún resultado
        </b>
      </ion-label>
    </ion-item>
  </div>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent, IonItem, IonLabel, IonList } from '@ionic/vue';
  
export default defineComponent({
  name: 'ListAutoComplete',
  components: { IonContent, IonItem, IonLabel, IonList },
  props: {
    data: Array
  },
});

</script>
