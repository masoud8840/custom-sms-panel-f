<template>
  <main class="send-normal">
    <h3
      class="border-r-2 mb-6 pr-2 text-text-main border-text-link font-bold text-xl"
    >
      ارسال از طرف شخص
    </h3>
    <ul class="hints">
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
      <template #fallback>Loading...</template>
      <template #default>
        <SendFromForm @on-submit="onSendFrom" />
      </template>
    </Suspense>
  </main>
</template>

<script lang="ts" setup>
useHead({
  title: "عملیات پیامکها | ارسال از شخص",
});
const onSendFrom = async (id: string) => {
  console.log(id);
};
</script>
