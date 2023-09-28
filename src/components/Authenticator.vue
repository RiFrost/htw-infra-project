<template>
  <Authenticator :services="services">
    <template> </template>
  </Authenticator>
</template>
<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";

import { Amplify } from "aws-amplify";
import awsconfig from "@/aws-exports";

import { useAuthStore } from "@/stores/auth";

Amplify.configure(awsconfig);

const authStore = useAuthStore();

const services = {
  async handleSignIn(formData) {
    let { username, password } = formData;
    return authStore.login(username, password);
  },
};
</script>
<style></style>
