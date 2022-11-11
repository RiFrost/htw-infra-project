<script setup>
import Navbar from "@/components/Navbar.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

authStore.authUser();
</script>

<template>
  <header>
    <Navbar />
  </header>
  <RouterView />
</template>
