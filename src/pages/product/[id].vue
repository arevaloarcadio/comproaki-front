<template>
  <base-view>
    <template  #default-view-body>
      <br>
      <ion-row>
        <ion-col sizeLg="3" sizeMd="4" sizeXs="12">
          
          <ion-card>
            <div style="text-align: center;">
              <ion-spinner v-if="loading" class="product-spinner" name="circular"></ion-spinner>
            </div> 
            <ion-img v-if="!loading" :alt="store.name" :src="setUrl(store.image)" />
            <ion-card-content style="width: 400px;">
              <ion-list>
                <ion-item-group>
                  <ion-item lines="none">
                    <ion-row>
                      <ion-col>
                        <ion-label class="not-white-space">{{store?.name}}</ion-label>
                      </ion-col>
                      
                      <ion-col v-if="follow" sizeLg="6" sizeXs="12">
                        <button class="button-follower" color="primary" @click="setNotFollow">
                          Seguiendo
                        </button>
                      </ion-col>
                      <ion-col sizeLg="6" sizeXs="12" v-else>
                        <button class="button-follow" color="primary" @click="setFollow">
                          Seguir
                        </button>
                      </ion-col>
                    </ion-row>
                  </ion-item>
                </ion-item-group>
              </ion-list>
            </ion-card-content>
          </ion-card>
        </ion-col>
        <ion-col>
          
        </ion-col>
        <ion-col sizeLg="8" sizeMd="7" sizeXs="12">
          <ion-card>
            <ion-row>
              <ion-col sizeLg="4" sizeMd="6" sizeXs="12">
                <ion-title><b>{{product?.name}}</b></ion-title>
                <ion-img :alt="product.name" :src="setUrl(product.image)" />
              </ion-col>
              <ion-col sizeLg="8" sizeMd="6" sizeXs="12">
                <br/>
             
                <ion-item lines="none">
                  <ion-label class="not-white-space">{{product?.description}}</ion-label>
                </ion-item>
                <br/>
                <ion-item lines="none">
                  <ion-label class="not-white-space">Precio: {{product?.price}} €</ion-label>
                </ion-item>
                <ion-button style="margin-left: 16px;" color="primary" @click="postStore()">
                  Comprar
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-card>
          <LoadingCard v-if="loadingProducts"/>
          <CardDashboard v-if="!loadingProducts" :data="products" @clickData="getKeyStore($event)"></CardDashboard>
        </ion-col>
        <ion-col>
        
        </ion-col>
      </ion-row>
    </template>
    <template #default-view-footer>
      <MenuTabs></MenuTabs>
    </template>
  </base-view>
</template>

<script>

import { 
  defineComponent 
} from 'vue';

import {
  IonHeader
} from '@ionic/vue';

import { 
  pricetagsOutline,
  storefrontOutline,
  add,
  trashOutline,
  pencilOutline,
  arrowBackOutline 
} from 'ionicons/icons';
import { useUserStore } from '@/plugins/store'
import axios from 'axios'
import { setUrl } from '@/plugins/utils/img-src' 
import { checkFollow_ , setFollow_, setNotFollow_ } from '@/plugins/utils/follower' 
import CardDashboard from '@/components/CardProduct.vue'

export default defineComponent({
  name: 'App',
  components : {
    IonHeader,
    CardDashboard
  },
  setup(){ 
    return{
      storefrontOutline,
      pricetagsOutline,
      add,
      trashOutline,
      pencilOutline,
      arrowBackOutline,
      checkFollow_,
      setFollow_, 
      setNotFollow_ 
    }
  },
  data() {
    return {
      setUrl,
      baseURL: axios.defaults.baseURL,
      product: null,
      store: {name : "Cargando" , image : ''},
      follow : 0,
      user: null,
      loading : true,
      loadingProducts : true,
    }
  },
  created(){
    const store = useUserStore()
    this.user = store.getUser
    this.product = this.$route.query
    this.checkFollow()
    this.getStore()
    this.getRelatedProducts()
  },
  mounted(){
    this.hideHeader()
  },
  beforeRouteEnter(to, from,next) {
    next(vm => {
    });
    this.hideHeader();
  },
  beforeRouteLeave(to, from) {
    this.showHeader();
  },
  methods:{
    hideHeader(){
      const elements = document.querySelectorAll('.header-default-view-title')
      elements.forEach(element => {
        element.style.display = 'none';
      })
    },
    showHeader(){
      const elements = document.querySelectorAll('.header-default-view-title')
      elements.forEach(element => {
        element.style.display = 'block';
      })
    },
    getKeyStore(product){
      console.log(product)
      this.$router.push({
        path : '/product/'+product.id, 
        query : {
          ...product
        }
      })
    },
    getStore(){
      axios.get('/api/stores/'+this.product.store_id)
      .then(res => {
        this.store = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(()=>{
        this.loading = false
      })
    },
    getRelatedProducts(){
      axios.get('/api/products/relatedProducts/'+this.product.store_id)
      .then(res => {
        this.products = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(()=>{
        this.loadingProducts = false
      })
    },
    setFollow(){
      this.follow = 1
      
      this.setFollow_(this.user.id,this.product.store_id)
      .then(res => {
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    setNotFollow(){
      this.follow = 0
      
      this.setNotFollow_(this.user.id,this.product.store_id)
      .then(res => {
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    checkFollow(){
      this.checkFollow_(this.user.id,this.product.store_id)
      .then(res => {
        this.follow = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
  }
});

</script>

<style>
  .store-selected {
    background-color: #bfcbc3;    
  }

  ion-card-subtitle{
    font-weight: 600;
  }

  ion-img{
    border-radius: 10px; 
  }

  .button-follow{
    border: 1px solid #2dd36f;
    background: rgb(255, 255, 255);
    border-radius: 10px;
    padding: 15px 22px;

    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #2dd36f;
    width: 151px;
  }

  .button-follower{
    border: 1px solid #2dd36f;
    background: rgb(255, 255, 255);
    border-radius: 10px;
    padding: 15px 22px;
    background: #2dd36f;
    border-radius: 10px;
    color: #FFFFFF;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    width: 151px;
  }

  .product-name{
    font-size: 20px;
  }

  .product-description{
    color: #2dd36f;font-weight: 600;font-size: 20px;
  }

  .product-address{
    color: #2dd36f;font-weight: 600;font-size: 20px;
  }

  .product-spinner {
    width: 100px;
    height: 100px;
  }

  .button-follow{
  border: 1px solid #2dd36f;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 5px 5px;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #2dd36f;
  width: 120px;
}

.button-follower{
  border: 1px solid #2dd36f;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 5px 5px;
  background: #2dd36f;
  border-radius: 10px;
  color: #FFFFFF;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  width: 120px;
}
</style>