<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Inbox</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Inbox</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <MessageListItem v-for="message in messages" :key="message.id" :message="message" />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import MessageListItem from '@/components/MessageListItem.vue';

export default defineComponent({
  name: 'App',
  components : {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    MessageListItem
  },
  data(){
    return{
      messages : [
        {
          fromName: 'Matt Chorsey',
          subject: 'New event: Trip to Vegas',
          date: '9:32 AM',
          id: 0
        },
        {
          fromName: 'Lauren Ruthford',
          subject: 'Long time no chat',
          date: '6:12 AM',
          id: 1
        },
        {
          fromName: 'Jordan Firth',
          subject: 'Report Results',
          date: '4:55 AM',
          id: 2

        },
        {
          fromName: 'Bill Thomas',
          subject: 'The situation',
          date: 'Yesterday',
          id: 3
        },
        {
          fromName: 'Joanne Pollan',
          subject: 'Updated invitation: Swim lessons',
          date: 'Yesterday',
          id: 4
        },
        {
          fromName: 'Andrea Cornerston',
          subject: 'Last minute ask',
          date: 'Yesterday',
          id: 5
        },
        {
          fromName: 'Moe Chamont',
          subject: 'Family Calendar - Version 1',
          date: 'Last Week',
          id: 6
        },
        {
          fromName: 'Kelly Richardson',
          subject: 'Placeholder Headhots',
          date: 'Last Week',
          id: 7
        }
      ],
    }
  },
  setup(){ 
    
    const refresh = (ev) => {
      setTimeout(() => {
        ev.detail.complete();
      }, 3000);
    };

    return{
      refresh,
    }
  },
  methods :{
    getMessage(id){
      return this.messages.find(m => m.id === id);
    }
  }
});

</script>
