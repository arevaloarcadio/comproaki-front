<template>
  <ion-row>
    <ion-col 
      v-for="(dat,key) in data" 
      :key="dat" 
      sizeLg="3" 
      sizeMd="4" 
      sizeXs="6"
    >
      <ion-card 
        class="touchstart" 
        :id="label+'-'+key" 
        @touchstart="touch($event,dat)"
        @click="click(dat)"
      >
        <ion-img 
          :id="'img-'+key"
          :alt="dat.name" 
          style="height: 200px;width: auto;" 
          :src="setUrl(dat.image)" 
        />
        <ion-card-header 
          :id="'category-header-'+key"
        >
          <ion-card-title 
            :id="'category-title-'+key"
          >
            <b>
              {{dat.name}}
            </b>
          </ion-card-title>
          <ion-card-subtitle 
            :id="'category-subtitle-'+key"
          >
            {{dat?.store?.name}}
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content 
          :id="'category-content-'+key"
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
import { setUrl } from '@/plugins/utils/img-src' 

export default {
  name: 'Card',
  props: {
    data: Array,
    label: String,
    touch:{
      type: Boolean,
      default: false
    },
    tags:{
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
      setUrl,
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
    },
    click(data){
      this.$emit("clickData",{
        ...data
      })
    }
  }
};
</script>