<template>
  <base-view>
    <template #default-view-title>
      <div class="hearder-app">
        Mis Productos
      </div>
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
            :id="label+'-'+key"
            :title="product.name"
            :price="product.price"
            :image="product.image"
            :data="product"
            label="product"
            :cart="false"
            :icon="false"
            heightImg='120px'
            @touchstart="touch($event,key)"
            @click="clickProduct($event,key)"
          ></CardProduct>
        </ion-col>
      </ion-row>
 
      
      <ion-fab v-if="!fabActivated" slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button id="fab" @click="$router.push('/profile/products/add')">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      
      <ion-fab v-if="fabActivated" slot="fixed" vertical="bottom" horizontal="end"  :activated="true">
        <ion-fab-button id="fab-edit" @click="fabActivated = false">
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
import CardProduct from '@/components/CardProduct.vue'
import axios from 'axios'
import { 
  pencilOutline,
  trashOutline,
  addOutline
} from 'ionicons/icons';

export default defineComponent({
  name: 'App',
  components : {
    CardProduct
  },
  data() {
    return {
      products: [],
      loading: false,
      label: 'product',
      productSelected: null,
      fabActivated: false
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
    this.getProducts()

    const shadow = document.querySelector('ion-content').shadowRoot;
    const childNodes = Array.from(shadow.childNodes);
    console.log(shadow.childNodes)
      childNodes.forEach((childNode) => {
        
      if (childNode.nodeName === "STYLE") {
        childNode.textContent = `
          div {
            width: ${elem.getAttribute("l")}px;
            height: ${elem.getAttribute("l")}px;
            background-color: ${elem.getAttribute("c")};
          }
        `;
      }
    });
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
    });
    this.getProducts()
  },
  beforeRouteLeave(){
    this.fabActivated = false
  },
  methods:{
    edit(){
      this.$router.push({
        path: '/profile/products/'+this.productSelected.id, 
        query: {
          ...this.productSelected
        }
      })
    },
    getProducts(){
      axios.get('/api/products/byUser')
      .then(res => {
        this.products = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(()=>{
        this.loading = true
      })
    },
    touch(ev,key){
      const btn = document.querySelector('#'+this.label+'-'+key)
      const self = this
      
      const btns = document.querySelectorAll(".touchstart");
      
      const stay_touch = setTimeout(function() { 
        btns.forEach((btn) => {
          btn.classList.remove("data-selected");
        })
        
        self.productSelected = self.products[key]
        btn.classList.add("data-selected");
        self.fabActivated = true
      }, 500);
    },
    clickProduct(ev,key){
      const btn = document.querySelector('#'+this.label+'-'+key)
      const self = this
      
      const btns = document.querySelectorAll(".touchstart");
      
      btns.forEach((btn) => {
        btn.classList.remove("data-selected");
      })
      self.productSelected = self.products.data[key]
      btn.classList.add("data-selected");
      self.fabActivated = true
    },
    handleScroll(ev){
      console.log(ev)
    }
  }
});

</script>

<style>
  ion-card-subtitle{
    font-weight: 600;
  }
</style>