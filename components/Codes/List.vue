<template>
  <ul class="space-y-6 mb-6">
    <li v-for="code in codes" :key="code._id" class="grid grid-cols-5 group">
      <section class="codes-description col-span-2">
        <span class="text-xl font-semibold text-text-main leading-relaxed">{{
          code.code
        }}</span>
        <h4 class="text-text-main font-medium text-base leading-relaxed">
          {{ code.name }}
        </h4>
        <section
          class="actions flex gap-2 mt-2 group-hover:opacity-100 opacity-0 translate-y-1 group-hover:translate-y-0 duration-200 transition"
        >
          <NuxtLink
            :to="`/messages/codes/${code._id}`"
            class="flex items-center gap-2 px-4 py-1 text-sm cursor-pointer hover:bg-blue-500 hover:text-white rounded-md border border-blue-500 text-blue-500"
          >
            <icons-pen class="size-4" />ویرایش
          </NuxtLink>
          <button
            class="flex items-center gap-2 px-4 py-1 text-sm cursor-pointer hover:bg-red hover:text-white rounded-md border border-red text-red"
            @click="onDelete(code._id)"
          >
            <icons-trash class="size-4" />حذف
          </button>
        </section>
      </section>
      <textarea
        class="codes-response col-span-3 text-text-main text-sm min-h-40 placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
        placeholder="پاسخی برای این کد تعیین کنید."
        :value="code.response"
      ></textarea>
    </li>
  </ul>
  <NuxtLink
    to="/messages/codes/new"
    class="flex w-fit gap-1 px-4 py-2 items-center text-base font-medium cursor-pointer hover:bg-primary hover:text-white rounded-md border border-primary text-primary"
  >
    <IconsPlus class="size-6" />
    افزودن کد
  </NuxtLink>
</template>
<script lang="ts" setup>
import type { ICode, IRequest } from "~/types/types";
const token = localStorage.getItem("token") || "";

const codes = ref<ICode[]>();
const initialFetch = async () => {
  try {
    const runtimeConfigs = useRuntimeConfig();
    const response = await $fetch<IRequest<ICode[]>>(
      `${runtimeConfigs.public.baseUrl}/codes`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log(response);
    codes.value = response.data;
  } catch (error) {
    // @ts-ignore
    console.log(error.response._data);
  }
};
await initialFetch();

const onDelete = async (id: string) => {
  const notif = push.promise("در حال حذف کد عملیاتی...");
  try {
    const runtimeConfigs = useRuntimeConfig();
    const response = await $fetch<IRequest<{}>>(
      `${runtimeConfigs.public.baseUrl}/codes/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    notif.resolve(response.message);
    await initialFetch();
  } catch (error) {
    // @ts-ignore
    notif.reject(error.response._data.message);
  }
};
</script>
