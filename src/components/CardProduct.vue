<template>
  <div 
    class="card touchstart"
  >
    <div 
      class="img"  
      :style="{ 
        backgroundImage: 'url('+setUrl(image)+')',
        backgroundSize: 'cover',
        position: 'relative',
        backgroundPosition: 'center',
        height : heightImg
      }"
    >
      <div v-if="icon" class="save">
        <ion-icon :icon="bookmarkOutline"></ion-icon>
      </div>
    </div>

    <div class="text-product">
      <p class="price-product">{{price}} €</p>
      <p class="title-product">{{title}}</p> 

      <div v-if="cart" class="icon-box">
        <p class="span">
          <button class="CartBtn">
          <span class="IconContainer"> 
            <ion-icon style="height: 20px;width: 20px;" :icon="cartIcon" class="cart"></ion-icon>
          </span>
          <p class="text-cart">Agregar al Carrito</p>
        </button>
        </p>
      </div>
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
import { bookmarkOutline } from 'ionicons/icons';
import axios from 'axios'
import { setUrl } from '@/plugins/utils/img-src'

export default {
  name: 'Card',
  props: {
    title: String,
    price: String,
    label: String,
    image:String,
    data: Array,
    cart: Boolean,
    icon: Boolean,
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
    return{
      setUrl,
      bookmarkOutline
    }
  }
};
</script>

<style >
  .price-product{
     font-size: 20px ;
    font-weight: 600;
    color: #000;
  }

  .text-product{
    padding-left: 10px;
  }

  .title-product {
    color: #999999;
    font-size: 14px;
    font-weight: 600;
    padding: 5px;
  }
</style>