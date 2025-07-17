<template>
  <main class="send-normal">
    <h3
      class="border-r-2 mb-6 pr-2 text-text-main border-text-link font-bold text-xl"
    >
      ارسال از طرف شخص
    </h3>
    <ul class="hints mb-6">
      <li
        class="hints-item border-r-orange-400 border-r-2 px-2 py-1 flex items-start gap-2"
      >
        <IconsInfo class="size-6 text-orange-400" />
        <p class="font-medium text-orange-400">
          توجه داشته باشید در صورت استفاده از این روش پیامک ارسال شده توسط شخص
          در گزارش گیری های پنل سایت ایده پردازان ذخیره نخواهد شد.
        </p>
      </li>
    </ul>
    <Suspense>
      <template #fallback>
        <content-loader
          viewBox="0 0 500 150"
          :speed="1.25"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="450" y="0" rx="0" ry="0" width="50" height="13" />
          <rect x="0" y="16" rx="0" ry="0" width="500" height="15" />
          <rect x="450" y="42" rx="0" ry="0" width="50" height="13" />
          <rect x="0" y="58" rx="0" ry="0" width="500" height="15" />
          <rect x="440" y="84" rx="0" ry="0" width="60" height="15" />
        </content-loader>
      </template>
      <template #default>
        <SendFromForm @on-submit="onSendFrom" />
      </template>
    </Suspense>
  </main>
</template>

<script lang="ts" setup>
import { ContentLoader } from "vue-content-loader";
useHead({
  title: "عملیات پیامکها | ارسال از شخص",
});
const onSendFrom = async (id: string) => {
  console.log(id);
};
</script>
