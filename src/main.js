import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import AmplifyVue from "@aws-amplify/ui-vue";

Amplify.configure(awsExports);

import "flowbite";
import "flowbite-vue";
import "./assets/main.css";

const app = createApp(App);

app.use(AmplifyVue);
app.use(createPinia());
app.use(router);

app.mount("#app");
