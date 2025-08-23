<template>
  <Suspense>
    <template #default>
      <MessagesResetPasswordList />
    </template>
    <template #fallback>
      <content-loader
        viewBox="0 0 500 150"
        :speed="1.25"
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="430" y="0" rx="0" ry="0" width="70" height="15" />
        <rect x="0" y="23" rx="4" ry="4" width="500" height="20" />
        <rect x="0" y="50" rx="0" ry="0" width="500" height="20" />
        <rect x="0" y="77" rx="0" ry="0" width="500" height="20" />
      </content-loader>
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import { ContentLoader } from "vue-content-loader";
useHead({
  title: "عملیات پیامکها | بازیابی رمز عبور",
});
definePageMeta({
  middleware: ["auth-guard", "admin-gaurd"],
});
</script>
