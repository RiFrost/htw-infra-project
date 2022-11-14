<script setup>
import Navbar from "@/components/Navbar.vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { ref } from "vue";

const authStore = useAuthStore();

authStore.authUser();
const res = ref(null);

async function sendAPIRequest() {
  const headers = {
    Authorization: authStore.getAccessToken,
    "Content-type": "Application/json",
  };
  const data = {
    text: "Lorem Ipsum",
    desiredLang: "SP",
  };

  axios
    .post(`${import.meta.env.VITE_POST_API_ENDPOINT}/translate`, data, {
      headers,
    })
    .then(function (response) {
      console.log(response.data.body);
      res.value = response;
    })
    .catch(function (error) {
      console.log(error);
      res.value = error;
    });
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
