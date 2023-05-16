import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: () =>  import('@/views/HomePage.vue') 
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () =>  import('@/views/dashboard/Dashboard.vue') 
  },
  {
    path: '/prueba',
    component: import('@/components/MenuGuia.vue'),
    children: [
       {
        path: '',
        name: 'prueba',
        component: () =>  import('@/views/dashboard/Dashboard.vue') 
      },

    ],
  },
 
  {
    path: '/profile',
    name: 'profile',
    component: () =>  import('@/views/profile/Profile.vue') 
  },
  {
    path: '/my_products',
    name: 'my_products',
    component: () =>  import('@/views/profile/MyProducts.vue') 
  },
  {
    path: '/my_stores',
    name: 'my_stores',
    component: () =>  import('@/views/profile/MyStores.vue') 
  },
  {
    path: '/add_store',
    name: 'add_store',
    component: () =>  import('@/views/profile/AddStore.vue') 
  },
  {
    path: '/details_product/:id',
    name: 'details_product',
    component: () =>  import('@/views/dashboard/DetailsProduct.vue') 
  },
  {
    path: '/add_product',
    name: 'add_product',
    component: () =>  import('@/views/profile/AddProduct.vue') 
  },
  {
    path: '/edit_store/:id',
    name: 'edit_store',
    component: () =>  import('@/views/profile/EditStore.vue') 
  },
  {
    path: '/edit_product/:id',
    name: 'edit_product',
    component: () =>  import('@/views/profile/EditProduct.vue') 
  },
  {
    path: '/message/:id',
    component: () => import('../views/ViewMessagePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
