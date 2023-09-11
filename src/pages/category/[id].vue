<template>
  <base-view>
    <template #slot-view-title>
      <ion-header :id="'main-content-'+key">
        <ion-toolbar>
          
          <ion-buttons slot="start">
            <ion-button @click="$router.go(-1)">
              <ion-icon :icon="arrowBackOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
          
          <ion-title>
            <div class="hearder-app">
              {{store.name}}
            </div>
          </ion-title>
          
          <ion-buttons slot="end">
            <ion-menu-toggle>
              <ion-icon :icon="menuOutline" size="large"></ion-icon>
            </ion-menu-toggle>
          </ion-buttons>
       
        </ion-toolbar>
      </ion-header>
    </template>

    <template  #default-view-body>
      <LoadingCard v-if="loading"/>
       <ion-row v-if="!loading">
        <ion-col 
          v-for="(product,key) in products.data" 
          :key="key" 
          sizeLg="3" 
          sizeMd="4" 
          sizeXs="6"
        >
          <Card 
            :title="product.name"
            :image="product.image"
            :data="product"
            label="product"
            :cart="true"
            :icon="true"
            heightImg='120px'
            @click="getKeyStore(product)"
          ></Card>
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
  arrowBackOutline ,
  bookmarkOutline
} from 'ionicons/icons';
import { useUserStore } from '@/plugins/store'
import axios from 'axios'
import { setUrl } from '@/plugins/utils/img-src' 
import { checkFollow_ , setFollow_, setNotFollow_ } from '@/plugins/utils/follower' 
import Card from '@/components/Card.vue'

export default defineComponent({
  name: 'App',
  components : {
    IonHeader,
    Card
  },
  setup(){ 
    return{
      storefrontOutline,
      pricetagsOutline,
      bookmarkOutline,
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
      products: [],
      store: {name : "Cargando" , image : ''},
      store_id: null,
      category_id: null,
      follow : 0,
      user: null,
      loading : true,
      loadingProducts : true,
    }
  },
  created(){
    const store = useUserStore()
    this.user = store.getUser
    this.store_id = this.$route.query.store_id
    this.category_id = this.$route.params.id
    this.checkFollow()
    this.getProducts()
    this.getStore()
    //this.getRelatedProducts()
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
      this.$router.push({
        path : '/product/'+product.id, 
        query : {
          ...product
        }
      })
    },
    getProducts(){
      axios.get('/api/products/byCategory/'+this.category_id)
      .then(res => {
        this.products = res.data.data
        console.log(this.products)
      }).catch(error => {
        console.log(error)
      }).finally(()=>{
        this.loading = false
      })
    },
    getStore(){
      axios.get('/api/stores/'+this.store_id)
      .then(res => {
        this.store = res.data.data
      }).catch(error => {
        console.log(error)
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
      
      this.setNotFollow_(this.user.id,this.store_id)
      .then(res => {
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    checkFollow(){
      this.checkFollow_(this.user.id,this.store_id)
      .then(res => {
        this.follow = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
  }
});

</script>

<style scoped="true">

  .store-selected {
    background-color: #bfcbc3;    
  }

  ion-card-subtitle{
    font-weight: 600;
  }

  .img-details{
    border-radius: 10px; height: 200px;width: 265px;
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