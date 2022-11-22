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
.amplify-button[data-variation="primary"]:hover {
  /* background-color: var(
    --amplify-components-button-primary-hover-background-color
  ); */
  background-color: pink !important;
  border-color: var(--amplify-components-button-primary-hover-border-color);
  color: var(--amplify-components-button-primary-hover-color);
}
.amplify-button[data-variation="link"]:hover {
  background: none !important;
  text-decoration: underline !important;
  text-underline-offset: 3px !important;
}

.amplify-button[data-variation="primary"] {
  background: var(--amplify-colors-teal-80);
}
</style>
