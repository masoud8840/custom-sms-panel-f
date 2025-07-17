<template>
  <main class="codes-view">
    <Suspense>
      <template #fallback>
        <content-loader
          viewBox="0 0 500 150"
          :speed="1.25"
          primaryColor="#f3f3f3" secondaryColor="#ecebeb"
        >
          <rect x="490" y="0" rx="0" ry="0" width="10" height="13" />
          <rect x="350" y="16" rx="0" ry="0" width="150" height="13" />
          <rect x="450" y="32" rx="0" ry="0" width="50" height="13" />
          <rect x="397" y="32" rx="0" ry="0" width="50" height="13" />
          <rect x="0" y="0" rx="0" ry="0" width="300" height="75" />
        </content-loader>
      </template>
      <template #default>
        <CodesList />
      </template>
    </Suspense>
  </main>
</template>

<script lang="ts" setup>
import { ContentLoader } from "vue-content-loader";
useHead({
  title: "عملیات پیامکها | کد های عملیاتی",
});
</script>
