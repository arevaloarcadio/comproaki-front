<template>
  <base-view>

    <template #default-view-title>
      <ion-row>
        <ion-col size="12" style="margin-top: 10px;">
          <div class="container-box-search">
            <div class="input-container-box-search input-icons" style="height: 55px;">
              <i style="margin-top: -49px;margin-left: 9px;;">
                <ion-icon 
                  style="margin-top: 22px;" 
                  :icon="search" 
                  size="large"
                ></ion-icon>
              </i>
              <input 
                type="text" 
                @keyup.enter="searchProduct($event.target.value)" 
                v-model="search_product" 
                id="search_product" 
                placeholder="Buscar" 
                class="input-text-box-search"
              >
            </div>
          </div>
          <ListAutoComplete 
            v-if="search_product != '' && show_list" 
            :data="filter_product" 
            @clickData="searchProduct($event)"
          />
        </ion-col>
      </ion-row>
      <LoadingBar v-if="loading_bar && search_product != ''"/>
		</template>

    <template #default-view-body>
      <LoadingCard v-if="!loading"/>
      <ion-row v-if="loading">
        <ion-col 
          v-for="(product,key) in products.data" 
          :key="key" 
          sizeLg="3" 
          sizeMd="4" 
          sizeXs="6"
        >
          <CardProduct 
            :title="product.name"
            :price="product.price"
            :image="product.image"
            :data="product"
            label="store"
            :cart="false"
            :icon="true"
            heightImg='120px'
            @click="getKeyStore(product)"
          ></CardProduct>
        </ion-col>
      </ion-row>
    </template>

    <template #default-view-footer>
      <ion-footer>
			  <ion-toolbar>
				  <MenuTabs/>
			  </ion-toolbar>
		  </ion-footer>
    </template>
  
  </base-view>
</template>

<script>

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonCol
} from '@ionic/vue';
import { storefrontOutline, search } from 'ionicons/icons';
import axios from 'axios'
import CardProduct from '@/components/CardProduct.vue'
import ListAutoComplete from '@/components/ListAutoComplete.vue'

export default {
  name: 'Dashboard',
  components : {
    ListAutoComplete,
    CardProduct,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonRow,
    IonCol
  },
  data(){
    return{
      baseURL: axios.defaults.baseURL,
      products: [],
      loading: false,
      loading_bar: false,
      show_list: false,
      awaiting_search: false,
      search_product: '',
      filter_product : []
    }
  },
  mounted(){
    this.getProductStoreUsers()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
    });
    this.getProductStoreUsers()
  },
  setup(){ 
    
    const refresh = (ev) => {
      setTimeout(() => {
        ev.detail.complete();
      }, 3000);
    };

    return{
      refresh,
      storefrontOutline,
      search
    }
  },
  watch: {
    search_product: function () {
      if (!this.awaiting_search) {
        setTimeout(() => {
          this.searchListProduct()
          this.show_list = true
          this.awaiting_search = false;
        }, 1000); // 1 sec delay
      }
      this.awaiting_search = true;
    },
  },
  methods :{
    getMessage(id){
      return this.messages.find(m => m.id === id);
    },
    searchListProduct(){
      this.loading_bar = true;
      
      if(this.search_product == ''){
        this.getProductStoreUsers();
        return
      }
      
      axios.post('/api/products/filter?all=true',{
        search : this.search_product
      })
      .then(res => {
        this.filter_product = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(()=>{
        this.loading_bar = false;
        this.loading = true
      })
    },
    searchProduct(search){

      this.loading_bar = true;
      document.querySelector('#search_product').value = search
      this.show_list = false
      this.filter_product = []
     
      axios.post('/api/products/filter',{
        search: search
      })
      .then(res => {
        this.products = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(()=>{
        this.loading_bar = false;
        this.loading = true
      })
    },
    getKeyStore(store){
      this.$router.push({
        path : '/product/'+store.id, 
        query : {
          ...store
        }
      })
    },
    getStores(){
      axios.get('/api/stores/byUser')
      .then(res => {
        this.stores = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(()=>{
        this.loading = true
      })
    },
    getProductStoreUsers(){
      this.loading = false
      axios.get('/api/products/byStoreUser')
      .then(res => {
        this.products = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(()=>{
        this.loading = true
      })
    }
  }
};

</script>
