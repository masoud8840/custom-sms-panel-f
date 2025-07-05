<template>
  <main class="home-view text-center">
    <section class="info" v-if="authStore.getUser === null">
      <h3 class="text-xl font-bold text-text-main leading-loose">
        برای استفاده از پنل کمکی پیامکی ابتدا وارد حساب کاربری خود شوید.
      </h3>
      <NuxtLink
        to="/auth"
        class="border border-primary text-primary py-1 px-4 inline-block rounded-lg hover:text-white hover:bg-primary"
        >ورود به حساب کاربری</NuxtLink
      >
    </section>
  </main>
</template>
<script lang="ts" setup>
useHead({
  title: "صفحه اصلی",
});
const authStore = useAuthStore();
</script>
