<template>
  <main class="codes-current">
    <form class="grid grid-cols-5 gap-4" @submit.prevent="onEdit">
      <section class="codes-description col-span-2 space-y-4">
        <input
          class="text-text-main font-medium text-base leading-relaxed placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
          type="text"
          v-model="code.code"
          placeholder="کد عملیاتی جدید*"
        />
        <input
          class="text-text-main font-medium text-base leading-relaxed placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
          type="text"
          v-model="code.name"
          placeholder="نام کد عملیاتی جدید*"
        />

        <section class="flex items-center gap-4">
          <button
            type="submit"
            class="flex w-fit gap-1 px-4 py-2 items-center font-medium cursor-pointer hover:bg-primary hover:text-white rounded-md border border-primary text-primary"
          >
            <IconsCheck class="size-6" />
            ثبت ویرایش
          </button>
          <NuxtLink to="/messages/codes" class="text-primary hover:underline"
            >بازگشت</NuxtLink
          >
        </section>
      </section>
      <textarea
        class="codes-response col-span-3 text-text-main text-sm min-h-40 placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
        placeholder="پاسخی برای این کد تعیین کنید*"
        v-model="code.response"
      ></textarea>
    </form>
  </main>
</template>
<script lang="ts" setup>
useHead({
  title: "کد های عملیاتی |",
});
const code = ref({
  code: "",
  name: "",
  response: "",
});

const initialFetch = async () => {
  try {
    const runtimeConfigs = useRuntimeConfig();
    const response = await $fetch(
      `${runtimeConfigs.public.baseUrl}/codes/${useRoute().params.slug}`
    );

    code.value = response.data;
    useHead({
      title: `کد های عملیاتی | ${response.data.name}`,
    });
  } catch (error) {}
};
await initialFetch();

const onEdit = async () => {
  // "CODE" name clash
  const { code: keyCode, name, response } = code.value;
  const isCodeANumber = Number(keyCode);
  if (!!!isCodeANumber) return;
  // if (!keyCode.length || !name.length || !response.length) return; // some error
  try {
    const runtimeConfigs = useRuntimeConfig();
    const baseUrl = runtimeConfigs.public.baseUrl;

    const fetchResponse = await $fetch(
      `${baseUrl}/codes/${useRoute().params.slug}`,
      {
        method: "PUT",
        body: code.value,
      }
    );

    return navigateTo("/messages/codes");
  } catch (error) {}
};
</script>
