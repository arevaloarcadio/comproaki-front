<template>
  <ion-row>
    <ion-col 
      v-for="(dat,key) in data" 
      :key="dat" 
      sizeLg="3" 
      sizeMd="4" 
      sizeXs="12"
    >
      <div 
        class="card touchstart"
        :id="label+'-'+key" 
        @touchstart="touch($event,dat)"
        @click="click(dat)"
      >
        <div class="img"  :style="{ backgroundImage: 'url(' + setUrl(dat.image) + ')' }">
          <div class="save">
            <ion-icon :icon="bookmarkOutline"></ion-icon>
          </div>
        </div>

        <div class="text">
          <p class="h3"> {{dat.name}}</p>
          <p class="p">{{dat?.store?.name}}</p> 

          <div class="icon-box">
            <p class="span">Add To Cart</p>
          </div>
        </div>
      </div>
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

import { 
  bookmarkOutline
} from 'ionicons/icons';

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
  setup (){
    return{
      bookmarkOutline
    }
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