<script setup lang="ts">
import { IonContent, IonButtons, IonBackButton, IonPage, IonHeader, IonTitle, IonToolbar,IonIcon, IonTabBar, IonTabButton, IonTabs  } from '@ionic/vue';
import { menuOutline } from 'ionicons/icons'
</script>

<template>
	<ion-page>
		<slot name="slot-view-title"></slot>

		<ion-header class="header-default-view-title">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button></ion-back-button>
				</ion-buttons>
				<ion-title>
					<slot name="default-view-title"></slot>
				</ion-title>
			</ion-toolbar>
		</ion-header>
		
		<ion-content class="ion-padding">
			<slot name="default-view-body"></slot>
		</ion-content>
		<slot name="default-view-footer"></slot>
	</ion-page>
</template>
