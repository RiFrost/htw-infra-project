<template>
  <div class="overflow-x-none">
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
            {{ record.org_text }}
          </th>
          <td class="py-4 px-1 text-center">
            {{ record.org_lang }} - {{ record.org_lang }}
          </td>
          <td class="py-4 px-6 text-center">{{ record.trans_text }}</td>
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
const records = [
  { org_text: "", org_lang: "DE", trans_lang: "EN", trans_text: "" },
  { org_text: "", org_lang: "EN", trans_lang: "DE", trans_text: "" },
  { org_text: "", org_lang: "SP", trans_lang: "DE", trans_text: "" },
]; // comes through props from RecordsView
</script>
<style></style>
