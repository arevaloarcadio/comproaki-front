<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
</script>

<template>
	<ion-page>
		<ion-content class="padding-content">
			<slot name="default-view-body"></slot>
		</ion-content>
		<slot name="default-view-footer"></slot>
		
	</ion-page>
</template>

<style scoped>
	.padding-content{
		--padding-end: 16px;
	}
</style>
