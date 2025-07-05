<template>
  <main class="codes-view">
    <Suspense>
      <template #fallback>Loading...</template>
      <template #default>
        <CodesList />
      </template>
    </Suspense>
  </main>
</template>

<script lang="ts" setup>
useHead({
  title: "عملیات پیامکها | کد های عملیاتی",
});
</script>
