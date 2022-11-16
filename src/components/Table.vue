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
          <td class="py-4 px-1 text-center capitalize">
            {{ record.detectedLang.S }} - {{ record.desiredLang.S }}
          </td>
          <td class="py-4 px-6 text-center">{{ record.translation.S }}</td>
          <td class="py-4 px-6 text-center">
            <a
              href="#"
              @click="playAudio(record.UUID.S)"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Play</a
            >
            <audio v-if="hasAudio" :src="audio" autoplay>Play</audio>
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
const hasAudio = ref(false);
const audio = ref();

async function fetchDBEntries() {
  const headers = {
    Authorization: authStore.getAccessToken,
    "Content-type": "*/*",
  };
  const userId = authStore.getUserId;
  audio.value = null;
  axios
    .get(`${import.meta.env.VITE_POST_API_ENDPOINT}/records?userId=${userId}`, {
      headers,
    })
    .then((response) => {
      records.value = response.data.body.records;
      console.log(records.value);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
}

function playAudio(uuid) {
  let audioStream;
  const headers = {
    Authorization: authStore.getAccessToken,
    "Content-type": "*/*",
  };
  axios
    .get(`${import.meta.env.VITE_POST_API_ENDPOINT}/audio?uuid=${uuid}`, {
      headers,
    })
    .then((response) => {
      console.log(response);
      audioStream = response.data.audio.AudioStream.data;

      var uInt8Array = new Uint8Array(audioStream);
      var arrayBuffer = uInt8Array.buffer;
      var blob = new Blob([arrayBuffer]);
      var url = URL.createObjectURL(blob);

      audio.value = url;
      hasAudio.value = true;
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchDBEntries();
</script>
<style></style>
