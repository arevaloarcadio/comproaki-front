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

    <div class="text">
      <p class="h3">{{title}}</p>
      <p class="p">{{description}}</p> 

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

import { 
  bookmarkOutline,
  cart as cartIcon
} from 'ionicons/icons';

import axios from 'axios'
import { setUrl } from '@/plugins/utils/img-src' 

export default {
  name: 'Card',
  props: {
    title: String,
    description: String,
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
  setup (){
    return{
      bookmarkOutline,
      cartIcon
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
        data: this.data
      })
    },
    click(data){
      this.$emit("clickData",{
        ...this.data
      })
    }
  }
};
</script>

<style type="text/css">
 
 .CartBtn {
  min-width: 200px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background-color: var(--ion-color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition-duration: .5s;
  overflow: hidden;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.103);
  position: relative;
}

.IconContainer {
  position: absolute;
  left: -40px;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 2;
  transition-duration: .5s;
}

.icon-cart {
  border-radius: 1px;
}

.text-cart {
  height: 100%;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 1;
  transition-duration: .5s;
  font-size: 1.04em;
  font-weight: 600;
}

.CartBtn:hover .IconContainer {
  transform: translateX(50px);
  border-radius: 40px;
  transition-duration: .5s;
}

.CartBtn:hover .text {
  transform: translate(10px,0px);
  transition-duration: .5s;
}

.CartBtn:active {
  transform: scale(0.95);
  transition-duration: .5s;
}

.cart{
  color: #fff;
}
</style>