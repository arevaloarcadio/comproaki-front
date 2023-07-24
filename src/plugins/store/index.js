import { defineStore } from "pinia";
import axios from 'axios'
import jwtToken from "@/plugins/jwt/jwt-token";
import { useLocalStorage } from '@vueuse/core'

export const useUserStore = defineStore("user", {
  state: () => ({
    user: useLocalStorage('user', null),
  }),

  actions: {
    async fetchUser() {
      const res = await axios.post("/user");

      const user = JSON.stringify(res.data.user)
      this.user = user;
    },
    async signUp(firstname,lastname,email,password,password_confirmation ) {
      const res = await axios.post("/users",{
        firstname,
        lastname,
        email,
        password, 
        password_confirmation 
      });
     
      res.data.user ? this.user = JSON.stringify(res.data.user) : null
     
      return res
    },
    async signIn(email, password) {
      const res = await axios.post("/auth/login",{
         email, 
         password,
      });
     
      res.data.user ? this.user = JSON.stringify(res.data.user) : null
      res.data.access_token ? jwtToken.setToken(res.data.access_token) : null
     
      return res
    },
    async editProfile(data) {
      const res = await axios.post("/auth/editProfile",data);
     
      res.data.data ? this.user = JSON.stringify(res.data.data) : null
      console.log(this.user)
      return res
    },
    async logout() {
      const res = await axios.post("/auth/logout");
      this.user = null
      return res
    },
  },
  getters: {
    getUser: (state) => {
      return JSON.parse(state.user) 
    },
  },
});