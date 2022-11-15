<template>
  <Skeleton v-if="loading"></Skeleton>
  <div v-else class="overflow-x-none">
    <table
      class="w-10/12 mx-auto shadow-md text-sm text-left text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 px-6 text-center">Origanl Text</th>
          <th scope="col" class="py-3 px-1 text-center">From - To</th>
          <th scope="col" class="py-3 px-6 text-center">Translated Text</th>
          <th scope="col" class="py-3 px-6 text-center">Audio</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="record in records"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-wrap dark:text-white"
          >
            {{ record.text.S }}
          </th>
          <td class="py-4 px-1 text-center">
            {{ record.detectedLang.S }} - {{ record.desiredLang.S }}
          </td>
          <td class="py-4 px-6 text-center">{{ record.translation.S }}</td>
          <td class="py-4 px-6 text-center">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Play</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import Skeleton from "@/components/Skeleton.vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

defineExpose({
  fetchDBEntries,
});

const authStore = useAuthStore();
authStore.authUser();

const records = ref();
const loading = ref(true);

async function fetchDBEntries() {
  const headers = {
    Authorization: authStore.getAccessToken,
    "Content-type": "*/*",
  };
  const userId = authStore.getUserId;
  axios
    .get(`${import.meta.env.VITE_POST_API_ENDPOINT}/records?userId=${userId}`, {
      headers,
    })
    .then((response) => {
      records.value = response.data.body.records;
      console.log(records.value);
      loading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchDBEntries();
</script>
<style></style>
