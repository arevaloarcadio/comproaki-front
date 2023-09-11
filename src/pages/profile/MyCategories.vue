<template>
  <base-view>
    
    <template #default-view-title>
      <div class="hearder-app">
        Mis Categorias
      </div>
		</template>
 
    <template #default-view-body>
      <LoadingCard v-if="!loading"/>
      <ion-row v-if="loading">
        <ion-col 
          v-for="(category,key) in categories.data" 
          :key="key" 
          sizeLg="3" 
          sizeMd="4" 
          sizeXs="6"
        >
          <Card 
            :id="label+'-'+key"
            :title="category.name"
            :image="category.image"
            :data="category"
            label="category"
            :cart="false"
            :icon="false"
            heightImg='120px'
            @touchstart="touchstart($event,key)"
            @click="clickCategory($event,key)"
          ></Card>
        </ion-col>
      </ion-row>

      <ion-fab 
        v-if="!fabActivated" 
        slot="fixed" 
        vertical="bottom" 
        horizontal="end"
      >
        <ion-fab-button 
          id="fab" 
          @click="$router.push('/profile/categories/add')"
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
import { 
  pencilOutline,
  trashOutline,
  addOutline
} from 'ionicons/icons';

export default defineComponent({
  name: 'App',
 
  data() {
    return {
      fabActivated: false,
      categories: [],
      loading : false,
      label: 'category',
      categorySelected: null
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
      axios.get('/api/categories')
      .then(res => {
        this.categories = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(()=>{
        this.loading = true
      })
    },
    edit(){
      this.$router.push({
        path: '/profile/categories/'+this.categorySelected.id, 
        query: {
          ...this.categorySelected
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
        
        self.categorySelected = self.categories.data[key]
        btn.classList.add("data-selected");
        btn.classList.add("card-active");
        self.fabActivated = true
      }, 500);
    },
    clickCategory(ev,key){
      const btn = document.querySelector('#'+this.label+'-'+key)
      const self = this
      
      const btns = document.querySelectorAll(".touchstart");
      
      btns.forEach((btn) => {
        btn.classList.remove("data-selected");
        btn.classList.remove("card-active");
      })

      self.categorySelected = self.categories.data[key]
    
      btn.classList.add("data-selected");
       btn.classList.add("card-active");
      self.fabActivated = true
    }
  }
});

</script>

<style>

</style>