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
  <!-- <button @click="sendAPIRequest">Test Request</button>
  <p>Result: {{ res }}</p> -->
</template>

<style>
.amplify-button[data-variation="link"]:hover {
  background: none;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.amplify-button[data-variation="primary"] {
  background: var(--amplify-colors-teal-80);
}

.amplify-button[data-variation="primary"]:hover {
  background-color: var(
    --amplify-components-button-primary-hover-background-color
  );
  border-color: var(--amplify-components-button-primary-hover-border-color);
  color: var(--amplify-components-button-primary-hover-color);
}
</style>
