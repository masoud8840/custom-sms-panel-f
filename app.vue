<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Notivue v-slot="item">
    <NotivueSwipe :item="item">
      <Notification :item="item" :theme="theme">
        <NotificationProgress :item="item" />
      </Notification>
    </NotivueSwipe>
  </Notivue>
</template>

<script lang="ts" setup>
import { lightTheme, type NotivueTheme } from "notivue";

const theme: NotivueTheme = {
  ...lightTheme,
  "--nv-title-size": "1rem",
  "--nv-spacing": ".75rem",
  "--nv-icon-size": "1.5rem",
  "--nv-progress-height": "2px",
  "--nv-width": "500px"
};
const authStore = useAuthStore();
onMounted(async () => {
  await authStore.validate();
});
</script>
