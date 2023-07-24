<template>
  <ion-row>
    <ion-col v-for="(dat,key) in data" :key="dat" sizeLg="3" sizeMd="4" sizeXs="6">
      <ion-card 
        class="touchstart" 
        :id="label+'-'+key" 
        @touchstart="touch($event,dat)"
      >
        <ion-img 
          :id="'img-'+key"
          :alt="dat.name" 
          style="height: 200px;width: auto;" 
          :src="baseURL+dat.image" 
        />
        <ion-card-header 
          :id="'header-'+key"
        >
          <ion-card-title 
            :id="'title-'+key"
          >
            <b>
              {{dat.name}}
            </b>
          </ion-card-title>
          <ion-card-subtitle 
            :id="'subtitle-'+key"
          >
            {{dat?.store?.name}}
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content 
          :id="'content-'+key"
        >
        </ion-card-content>
      </ion-card>
    </ion-col>
  </ion-row>
  
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

import axios from 'axios'

export default {
  name: 'Card',
  props: {
    data: Array,
    label: String,
    touch:{
      type: Boolean,
      default: false
    },
  },
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
      baseURL: axios.defaults.baseURL,
      dataSelected: null,
    }
  },
  mounted(){
  },
  updated(){
  },
  methods:{
    touch(ev,data){
      this.$emit("touchData",{
        event: ev,
        data: data
      })
    }
  }
};
</script>
<style>
  .data-selected {
    background-color: #bfcbc3;    
  }
</style>