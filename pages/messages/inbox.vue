<template>
  <Suspense>
    <template #default>
      <MessagesInboxList />
    </template>
    <template #fallback>
      <content-loader
        viewBox="0 0 500 150"
        :speed="1.25"
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <!-- مستطیل‌های اصلی -->
        <rect x="0" y="32" rx="4" ry="4" width="117.5" height="25" />
        <rect x="127.5" y="32" rx="4" ry="4" width="117.5" height="25" />
        <rect x="255" y="32" rx="4" ry="4" width="117.5" height="25" />
        <rect x="382.5" y="32" rx="4" ry="4" width="117.5" height="25" />

        <!-- مستطیل بالای سمت راست با فاصله عمودی 10 پیکسل -->
        <rect x="430" y="7" rx="0" ry="0" width="70" height="15" />

        <!-- دو مستطیل پایین کنار هم با عرض بیشتر و ارتفاع 20 -->
        <rect x="345" y="67" rx="4" ry="4" width="75" height="20" />
        <rect x="430" y="67" rx="4" ry="4" width="70" height="20" />
      </content-loader>
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import { ContentLoader } from "vue-content-loader";
useHead({
  title: "عملیات پیامکها | صندوق دریافتی",
});
definePageMeta({
  middleware: ["auth-guard"],
});
</script>
