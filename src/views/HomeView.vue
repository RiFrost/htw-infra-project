<script setup>
import Authenticator from "../components/Authenticator.vue";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>

<template>
  <main class="main">
    <Authenticator v-if="!authStore.getUser"></Authenticator>
    <div v-else>only visible to logged in user</div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
}
</style>
