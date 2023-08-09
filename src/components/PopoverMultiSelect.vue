<template>
  <div 
    style="margin-left: 5%;margin-top: 20px"
  >	
    <template 
      v-for="option in options" 
      :key="option" 
    >
      <div 
        class="hover"
      >
        <ion-row 
          @click="selectClick(option)" 
          class="item-popover"
        >
          <ion-col size="10">
            <ion-label>
              {{option.name}}
            </ion-label>
          </ion-col> 
          <ion-col 
            v-if="options_selected.some(option_selected => option_selected.id === option.id)" 
            size="2" 
          >
            <ion-icon 
              :icon="checkmarkOutline" 
              class="icon-color-primary"
            ></ion-icon>
          </ion-col>
        </ion-row>
      </div>
    <div 
      style="margin-top: 10px"
    >
    </div>
    </template>
    <div 
      style="margin-top: 15px"
    >
    </div>
  </div>	
</template>

<script>

import { defineComponent } from 'vue';
import { popoverController } from '@ionic/vue';
import { checkmarkOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'Popover',
  props : ['options','options_selected'],
  setup(){
    return{
      checkmarkOutline
    }
  },
  methods : {
    async select(option) {
	    const popover = await popoverController
      return popover.dismiss(option);
    },
    async selectClick(option) {
	    this.$emit("clickData",option)
    },
    showSelected(option){

    }
  }
});

</script>

<style scoped="">

.item-popover{
  cursor: pointer;
}

.active{
  font-weight: bold;
}

.hover:focus{
  background: #EAEAEA;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.12);
}

</style>

<style type="text/css">

.my-class .popover-content{
  margin-left: -30px !important;
  height: auto !important;
  border-radius: 10px !important;
}

</style>