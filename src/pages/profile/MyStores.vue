<template>
  <base-view>
    
    <template #default-view-title>
      <div class="hearder-app">
        Mis Tiendas
      </div>
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
            :id="label+'-'+key"
            :title="store.name"
            :image="store.image"
            :data="store"
            label="store"
            :cart="false"
            :icon="false"
            heightImg='120px'
            @touchData="touchStore($event,key)"
            @click="clickStore($event,key)"
          ></CardStore>
        </ion-col>
      </ion-row>
      <!--v-if="!fabActivated && stores?.data?.length == 0" -->
      <ion-fab
        v-if="!fabActivated" 
        slot="fixed" 
        vertical="bottom" 
        horizontal="end"
      >
        <ion-fab-button 
          id="fab" 
          @click="$router.push('/profile/store/add')"
        >
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
        
      <ion-fab 
        v-if="fabActivated" 
        slot="fixed" 
        vertical="bottom" 
        horizontal="end" 
        :activated="true"
      >
        <ion-fab-button 
          id="fab-edit" 
          @click="fabActivated = false"
        >
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button 
            @click="edit"
          >
            <ion-icon :icon="pencilOutline"></ion-icon>
          </ion-fab-button>
          <ion-fab-button>
            <ion-icon :icon="trashOutline"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>
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
  defineComponent 
} from 'vue';
import axios from 'axios'
import CardStore from '@/components/CardStore.vue'
import { 
  pencilOutline,
  trashOutline,
  addOutline
} from 'ionicons/icons';

export default defineComponent({
  name: 'App',
  components : {
    CardStore
  },
  data() {
    return {
      fabActivated: false,
      stores: [],
      loading : false,
      label: 'store',
      storeSelected: null
    }
  },
  setup(){ 
    return{
      pencilOutline,
      trashOutline,
      addOutline
    }
  },
  mounted(){
    this.getStores()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
    })
    this.getStores()
  },
  beforeRouteLeave(){
    this.fabActivated = false
  },
  methods:{
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
    edit(){
      this.$router.push({
        path: '/profile/store/'+this.storeSelected.id, 
        query: {
          ...this.storeSelected
        }
      })
    },
    touchStore(ev,key){
      const btn = document.querySelector('#'+this.label+'-'+key)
      const self = this
      
      const btns = document.querySelectorAll(".touchstart");
      
      const stay_touch = setTimeout(function() { 
        btns.forEach((btn) => {
          btn.classList.remove("data-selected");
          btn.classList.remove("card-active");
        })
        
        self.storeSelected = self.stores.data[key]
        btn.classList.add("data-selected");
        btn.classList.add("card-active");
        self.fabActivated = true
      }, 500);
    },
    clickStore(ev,key){
      const btn = document.querySelector('#'+this.label+'-'+key)
      const self = this
      
      const btns = document.querySelectorAll(".touchstart");
      
      btns.forEach((btn) => {
        btn.classList.remove("data-selected");
        btn.classList.remove("card-active");
      })
      
      self.storeSelected = self.stores.data[key]
    
      btn.classList.add("data-selected");
      btn.classList.add("card-active");
      self.fabActivated = true
    }
  }
});

</script>

<style>

</style>