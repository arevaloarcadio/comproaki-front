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
            <button v-if="follow" class="button-follower" color="primary" @click="setNotFollow">
              Seguiendo
            </button>
            <button v-else class="button-follow" color="primary" @click="setFollow">
              Seguir
            </button>
          </ion-buttons>
          
          <ion-buttons slot="end">
            <ion-menu-toggle>
              <ion-icon :icon="menuOutline" size="large"></ion-icon>
            </ion-menu-toggle>
          </ion-buttons>
       
        </ion-toolbar>
		  </ion-header>
    </template>
    
    <template #default-view-body>
      <!--Inicio del menu-->
      <ion-content>
        <DetailsStore :store="store" :content="key" />
        <LoadingCard v-if="!loading"/>
         <ion-row v-if="loading">
          <ion-col 
            v-for="(category,key) in categories.data" 
            :key="key" 
            sizeLg="3" 
            sizeMd="4" 
            sizeXs="12"
          >
            <Card 
              :title="category.name"
              :image="category.image"
              :data="category"
              label="category"
              :cart="false"
              :icon="false"
              heightImg='120px'
              @click="getKeyCategory(category)"
            ></Card>
          </ion-col>
         </ion-row>
      </ion-content>
      <!--Fin del menu-->
    </template>

    <template #default-view-footer>
      <MenuTabs></MenuTabs>
    </template>
  
  </base-view>
    <!----
      <ion-col size="6">
        <button v-if="follow" style="margin-top: 30px;" class="button-follower" color="primary" @click="setNotFollow">
          Seguiendo
        </button>
        <button v-else style="margin-top: 30px;" class="button-follow" color="primary" @click="setFollow">
          Seguir
        </button>
      </ion-col>
    -->
</template>

<script>

import { 
  defineComponent 
} from 'vue';

import {
  IonHeader,
  IonMenuToggle,
  IonMenu,
  IonButton,
  IonContent,
  IonList, 
  IonItem, 
  IonItemDivider, 
  IonItemGroup, 
  IonLabel,
  IonRow,
  IonCol,  
} from '@ionic/vue';

import { 
  pricetagsOutline,
  storefrontOutline,
  add,
  trashOutline,
  pencilOutline,
  arrowBackOutline,
  menuOutline,
  closeOutline 
} from 'ionicons/icons';
import { useUserStore } from '@/plugins/store'
import axios from 'axios'
import Card from '@/components/Card.vue'
import DetailsStore from '@/components/DetailsStore.vue'
import { setUrl } from '@/plugins/utils/img-src' 
import { checkFollow_ , setFollow_, setNotFollow_ } from '@/plugins/utils/follower' 

export default defineComponent({
  name: 'App',
  components : {
    IonHeader,
    IonMenuToggle,
    IonMenu,
    IonButton,
    IonList,
    IonItem, 
    IonItemDivider, 
    IonItemGroup, 
    IonLabel, 
    Card,
    DetailsStore,
    IonRow,
    IonCol
  },
  setup(){ 
    return{
      storefrontOutline,
      pricetagsOutline,
      add,
      trashOutline,
      pencilOutline,
      arrowBackOutline,
      menuOutline,
      closeOutline,
      checkFollow_ , 
      setFollow_, 
      setNotFollow_ 
    }
  },
  data() {
    return {
      baseURL: axios.defaults.baseURL,
      store: {name : "Cargando"},
      loading: false,
      products :[],
      categories:[],
      follow : 0,
      user: null,
      key: null,
      setUrl
    }
  },
  created(){
    this.key = (Math.random() * 10000).toFixed()
    const store = useUserStore()
    this.user = store.getUser
    this.store = this.$route.query
    this.checkFollow()
    this.getCategoriesByStore()
    //this.getProducts()
    //this.getStore()
  },
  mounted(){
    console.log("mounted")
    this.hideHeader();
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
    getKeyCategory(category){
      console.log(category)
      this.$router.push({
        path: '/category/'+category.id, 
        query:{
          store_id: this.store.id
        }
      })
    },
    getStore(){
      axios.get('/api/stores/'+this.store.id)
      .then(res => {
        this.store = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    getProducts(){
      axios.get('/api/products/byStore/'+this.store.id)
      .then(res => {
        this.products = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.loading = true
      })
    },
    getCategoriesByStore(){
      axios.get('/api/categories/byStore/'+this.store.id)
      .then(res => {
        this.categories = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.loading = true
      })
    },
    setFollow(){
      this.follow = 1
      
      this.setFollow_(this.user.id,this.store.id)
      .then(res => {
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    setNotFollow(){
      this.follow = 0
      
      this.setNotFollow_(this.user.id,this.store.id)
      .then(res => {
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    checkFollow(){
      this.checkFollow_(this.user.id,this.store.id)
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