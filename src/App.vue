<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <header>
    <Navbar />
  </header>
  <RouterView />
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
