<template>
  <base-view>
    <template #default-view-title>
      <div style="justify-content: center;display: flex;padding-top: 10px;padding-right: 48px;">
        <ion-avatar @click="file">
          <img alt="avatar" id="image-profile2" src="/card-media.png" />
        </ion-avatar>
      </div>
      <div class="hearder-app">
        {{ user?.firstname }} {{ user?.lastname }}
      </div>
		</template>

    <template #default-view-body>
      <div class="padding-page">
        <ion-row class="row-profile" @click="$router.push('profile/edit')">
          <ion-icon :icon="personOutline" size="large"></ion-icon>
          &nbsp;&nbsp;
          Editar Perfil
        </ion-row>
        <ion-row  class="row-profile" @click="$router.push('profile/mycategories')">
          <ion-icon :icon="ticketOutline" size="large"></ion-icon>
          &nbsp;&nbsp;
          Mis Categorias
        </ion-row>
        <ion-row  class="row-profile" @click="$router.push('profile/mystores')">
          <ion-icon :icon="storefrontOutline" size="large"></ion-icon>
          &nbsp;&nbsp;
          Mis Tiendas
        </ion-row>
        <ion-row  class="row-profile" @click="$router.push('profile/myproducts')">
          <ion-icon :icon="pricetagsOutline" size="large"></ion-icon>
          &nbsp;&nbsp;
          Mis Productos
        </ion-row>
        <ion-row  class="row-profile" @click="logout">
          <ion-icon :icon="exitOutline" size="large"></ion-icon>
          &nbsp;&nbsp;
          Cerra Sesión
        </ion-row>
      </div>
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

import {
  IonContent
} from '@ionic/vue';

import { useIonRouter } from '@ionic/vue';
import { 
  pricetagsOutline,
  storefrontOutline,
  arrowBackOutline,
  personOutline,
  exitOutline,
  ticketOutline
} from 'ionicons/icons';
import { useUserStore } from '@/plugins/store';
import toast from '@/plugins/toast'
import axios from 'axios'

export default defineComponent({
  name: 'App',
  components : {
    IonContent
  },
  data(){
    return{
      user: null,
      baseURL: axios.defaults.baseURL,
    }
  },
  setup(){ 
    
    const ionRouter = useIonRouter();
    const userStore = useUserStore();
    
    return {
      storefrontOutline,
      pricetagsOutline,
      arrowBackOutline,
      personOutline,
      exitOutline,
      ticketOutline,
      userStore,
      ionRouter,
    }
  },
  created(){
    this.user = this.userStore.getUser 
  },
  mounted(){
    document.querySelector('#image-profile2').src = this.baseURL+this.user?.image
  },
  updated(){
    const userStore2 = useUserStore();
    this.user = userStore2.getUser 
    document.querySelector('#image-profile2').src = this.baseURL+this.user?.image
  },
  methods : {
    async logout(){
      var loading = await toast.showLoading()

      loading.present();

      this.userStore.logout()
        .finally(() => {
          loading.dismiss()
          this.$router.push('/pages/login')
        })
    }
  }
});

</script>

<style>
.row-profile{
  font-size: 18px;margin-top: 14px;
}
</style>