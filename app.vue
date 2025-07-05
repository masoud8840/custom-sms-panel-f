<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
onMounted(async () => {
  await authStore.validate();
});
</script>
