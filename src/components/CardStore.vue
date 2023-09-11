<template>
  <div 
    class="card touchstart"
    :id="label+'-'+key" 
  >
    <div class="img"  
      :style="{ 
        backgroundImage: 'url('+setUrl(image)+')',
        backgroundSize: 'cover',
        position: 'relative',
        backgroundPosition: 'center',
        height : heightImg
      }"
    >
      <div class="save">
        <ion-icon :icon="bookmarkOutline"></ion-icon>
      </div>
    </div>

    <div class="text">
      <p class="h3">{{title}}</p>
      
      <!--<div id="container-items-tag">
        <ion-row id="ion-row-items-tag">
          <div v-for="(tag,key) in data.tags" :key="tag" class="row-tags">
            <div class="item-store-tag">
              {{tag.name}}
            </div>
          </div>
        </ion-row>
      </div>-->
      <ul class="tag" id="container-items-tag">
        <li v-for="(tag,key) in data.tags" :key="tag" class="tag__name">{{tag.name}}</li>
      </ul>
    </div>
  </div>
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

import { 
  bookmarkOutline
} from 'ionicons/icons';

export default {
  name: 'Card',
  props: {
    title: String,
    description: String,
    label: String,
    image:String,
    data: Array,
    heightImg : {
      default : '200px'
    }
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
  setup(){
    return {
      bookmarkOutline
    }
  },
  data() {
    return {
      setUrl,
      baseURL: axios.defaults.baseURL,
    }
  }
};
</script>
<style scope>
    

.tag__name {
  display: inline-block;
  color: #fff;
  font-size: 12px;
  background-color: var(--ion-color-primary);
  padding: 6px 23px 9px;
  border-radius: 70em;
  margin: 8px 6px 8px 0;
  margin-left: 0px;
  position: relative;
  text-transform: lowercase;
  cursor: pointer;
  transition: all .3s ease-in-out;
}

.tag__name::before,.tag__name::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 40%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background:rgb(127 114 233 / 49%);
}

.tag__name::before {
  left: 7px;
}

.tag__name::after {
  right: 7px;
}

.tag__name:hover {
  transform: scale(1.1);
  background-color: #3b7e4d;
}
</style>