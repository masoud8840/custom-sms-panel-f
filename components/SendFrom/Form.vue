<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <section class="input-group">
      <label
        for="code"
        class="border-r-2 pr-2 leading-relaxed mb-3 block text-text-main border-text-link font-semibold text-base"
      >
        کد عملیاتی
      </label>
      <select
        id="code"
        class="text-sm placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
        v-model="selectedCodeId"
      >
        <option value="default">انتخاب کنید</option>
        <option value="n/a" v-if="!codes?.length">
          کدی برای نمایش وجود ندارد
        </option>
        <option
          :value="code._id"
          v-for="(code, index) in codes"
          :key="index"
          class="max-w-fit"
        >
          {{ `${code.code} - ${code.name}` }}
        </option>
      </select>
    </section>

    <section class="input-group">
      <label
        for="cellphone"
        class="border-r-2 pr-2 leading-relaxed mb-3 block text-text-main border-text-link font-semibold text-base"
        >دریافت کننده</label
      >
      <input
        type="text"
        id="cellphone"
        placeholder="9123456789"
        class="text-sm placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
        v-model="cellphone"
      />
    </section>
    <button
      type="submit"
      class="w-fit px-6 py-2 text-base font-medium cursor-pointer hover:bg-primary hover:text-white rounded-md border border-primary text-primary"
    >
      ارسال پیامک
    </button>
  </form>
</template>
<script lang="ts" setup>
import type { ICode, IRequest } from "~/types/types";

const codes = ref<ICode[]>();
const selectedCodeId = ref("default");
const cellphone = ref("9370700162");
const baseUrl = useRuntimeConfig().public.baseUrl;
const initialFetch = async () => {
  try {
    const response = await $fetch<IRequest<ICode[]>>(`${baseUrl}/codes`);

    codes.value = response.data;
  } catch (error) {
    // @ts-ignore
    console.log(error.response._data);
  }
};
await initialFetch();

const onSubmit = async () => {
  const body = {
    cellphone: cellphone.value,
    codeId: selectedCodeId.value,
  };
  const token = localStorage.getItem("token") || "";
  try {
    const response = await $fetch(`${baseUrl}/messages/sendfrom`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: body,
    });
  } catch (error) {}
};
</script>
