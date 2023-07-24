<template>
  <base-view>

    <template #default-view-title>
      <ion-row>
        <ion-col size="10" style="margin-top: 10px;">
          <div class="container-box-search">
            <div class="input-container-box-search input-icons" style="height: 55px;">
              <i style="margin-top: -49px;margin-left: 9px;;">
                <ion-icon 
                  style="margin-top: 22px;" 
                  :icon="search" 
                  size="large"
                ></ion-icon>
          
              </i>
              <input type="text"  placeholder="Buscar" class="input-text-box-search">
            </div>
          </div>
        </ion-col>
        <ion-col size="2">  
          <div style="display: flex;justify-content: center;">
            <ion-icon @click="$router.push('/profile')" style="margin-top: 22px;" :icon="storefrontOutline" size="large"></ion-icon>
          </div>
        </ion-col>
      </ion-row>
		</template>

    <template #default-view-body>
      <CardDashboard v-if="loading" :data="products" @clickData="getKeyProduct($event)"></CardDashboard>
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

//import MenuTabs from '@/components/MenuTabs'

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
import CardDashboard from '@/components/CardDashboardComponent.vue'

export default {
  name: 'Dashboard',
  components : {
    CardDashboard,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonRow,
    IonCol
  },
  data(){
    return{
      products: [],
      baseURL: axios.defaults.baseURL,
      loading: false
    }
  },
  updated(){
    this.getProducts()
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
  methods :{
    getMessage(id){
      return this.messages.find(m => m.id === id);
    },
    getKeyProduct(product){
      this.$router.push({path : '/product/'+product.id, query : {...product}})
    },
    getProducts(){
      axios.get('/api/products')
      .then(res => {
        this.loading = true
        this.products = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
  }
};

</script>
