<template>
    <div class="container ">
        <form>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email">
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="loginUser">Submit</button>
        </form>
        <p class="alert ">{{ feedback }}</p>
    </div> 
  </template>
  
  <script setup>
  
    import {ref} from "vue"
    import { useAuth } from '@/store/auth'
    import router from "@/router";
  
    const store = useAuth()
  
    const email = ref("")
    const password = ref("")
    const feedback = ref("")
  
    const loginUser = async ()  => {
      feedback.value = "Enviando..."
      const response = await store.login(email.value, password.value)
  
      if(!response) {
        feedback.value = "Error en el logeo"
      } else {
        router.push({name: "home"})
      }
    }
  
  </script>
    