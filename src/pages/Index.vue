<script>

import { defineComponent } from 'vue';
import { mapGetters } from "vuex";
import { useUserStore } from '@/plugins/store'

export default defineComponent({
	name: 'Index',
  	beforeMount(){
		const store = useUserStore()
		const user = store.getUser

      	if (user == null) {
			this.$router.push('/pages/login')
    	}else{
			this.$router.push('/dashboard')
		}
	}
});
</script>

<template>
	<!--<base-view id="home-page">
		<template #default-view-title>
			<div class="text-center">Home Page</div>
		</template>
		<template #default-view-body>
			<div class="row welcome-page">
				<ion-card class="col-xl-4 col-lg-5 col-md-5 col-sm-6 col-12">
					<ion-card-header>
						<ion-card-subtitle>First Page</ion-card-subtitle>
						<ion-card-title>Welcome Home</ion-card-title>
					</ion-card-header>

					<ion-card-content class="text-center">
						<p>{{ welcomeText }}</p>
						<ion-button class="pt-1" router-link="/about">Click Me</ion-button>
					</ion-card-content>
				</ion-card>
			</div>
		</template>
	</base-view>-->
</template>
