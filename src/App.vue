<script setup>
import Navbar from "@/components/Navbar.vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { ref } from "vue";

const authStore = useAuthStore();

authStore.authUser();
const res = ref(null);

async function sendAPIRequest() {
  axios
    .post(
      import.meta.env.VITE_POST_API_ENDPOINT,
      {},
      {
        headers: {
          Authorization: authStore.getAccessToken,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      res.value = response;
    })
    .catch(function (error) {
      console.log(error);
      res.value = error;
    });
  console.log(res.value);
}
</script>

<template>
  <header>
    <Navbar />
  </header>
  <RouterView />
  <button @click="sendAPIRequest">Test Request</button>
  <p>Result: {{ res }}</p>
</template>
