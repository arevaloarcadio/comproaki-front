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
                @keyup.enter="searchStores($event.target.value)" 
                v-model="search_store" 
                placeholder="Buscar" 
                id="search_store"  
                class="input-text-box-search"
              >
            </div>
          </div>
          <ListAutoComplete 
            v-if="search_store != '' && show_list" 
            :data="filter_store" 
            @clickData="searchStores($event)"
          />
        </ion-col>
      </ion-row>
      <LoadingBar v-if="loading_bar && search_store != ''"/>
		</template>

    <template #default-view-body>
      <LoadingCard v-if="!loading"/>
      <ion-row v-if="loading">
        <ion-col 
          v-for="(store,key) in stores.data" 
          :key="key" 
          sizeLg="3" 
          sizeMd="4" 
          sizeXs="12"
        >
          <CardStore 
            :title="store.name"
            :image="store.image"
            :data="store"
            label="store"
            :cart="false"
            :icon="false"
            heightImg='120px'
            @click="getKeyStore(store)"
          ></CardStore>
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
import CardStore from '@/components/CardStore.vue'
import ListAutoComplete from '@/components/ListAutoComplete.vue'

export default {
  name: 'Dashboard',
  components : {
    ListAutoComplete,
    CardStore,
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
      loading: false,
      loading_bar: false,
      awaiting_search : false,
      show_list: false,
      search_store: '',
      stores:[],
      filter_store: []
    }
  },
  mounted(){
    this.getStores()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
    });
    this.getStores()
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
    search_store: function () {
      if (!this.awaiting_search) {
        setTimeout(() => {
          this.searchListStores()
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
    getKeyStore(store){
      this.$router.push({
        path : '/store/'+store.id, 
        query : {...store}
      })
    },
    getStores(){
      this.loading = false
      axios.get('/api/stores')
      .then(res => {
        this.stores = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(()=>{
        this.loading = true
      })
    },
    searchListStores(){
      this.loading_bar = true;
      
      if(this.search_store == ''){
        this.getStores();
        return
      }
      
      axios.post('/api/stores/filter?all=true',{
        search: this.search_store
      })
      .then(res => {
        this.filter_store = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(()=>{
        this.loading_bar = false;
        this.loading = true
      })
    },
    searchStores(search){
      
      this.loading_bar = true;
      document.querySelector('#search_store').value = search
      this.show_list = false
      this.filter_store = []

      axios.post('/api/stores/filter',{
        search: search
      })
      .then(res => {
        this.stores = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(()=>{
        this.loading_bar = false;
        this.loading = true
      })
    },
  }
};

</script>
