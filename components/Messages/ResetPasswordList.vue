<template>
  <template v-if="messages.length">
    <h3
      class="border-r-2 mb-6 pr-2 text-text-main border-text-link font-bold text-xl"
    >
      صندوق دریافتی
    </h3>
    <section class="table-container mb-6">
      <section class="table-search"></section>
      <section class="table-header">
        <div
          class="table-header-row p-4 rounded-t-lg font-semibold text-text-main bg-text-secondary/15"
        >
          <h5>
            <input
              type="checkbox"
              class="checkbox-base align-middle appearance-none w-[22px] h-[22px] border border-text-main/25 rounded-sm bg-white relative checked:before:absolute checked:before:w-[16px] checked:before:h-[16px] checked:before:bg-text-secondary checked:before:top-[2px] checked:before:left-[2px] checked:before:rounded-xs"
              @input="syncChilds"
              :checked="syncParent"
            />
          </h5>
          <h5>ردیف</h5>
          <h5>نام</h5>
          <h5>نام خانوادگی</h5>
          <h5>کد شناسایی</h5>
          <h5>کد ملی</h5>
        </div>
      </section>
      <section class="table-body">
        <ul class="rounded-b-lg border border-text-main/25 border-t-0 py-3">
          <li
            class="table-body-row"
            v-for="(message, index) in messages"
            :key="message._id"
            @click="addChecked(message._id)"
          >
            <h5>
              <input
                type="checkbox"
                :name="message.from"
                class="checkbox-base align-middle appearance-none w-[22px] h-[22px] border border-text-main/25 rounded-sm bg-white relative checked:before:absolute checked:before:w-[16px] checked:before:h-[16px] checked:before:bg-text-secondary checked:before:top-[2px] checked:before:left-[2px] checked:before:rounded-xs"
                :checked="checkedCells.includes(message._id)"
              />
            </h5>
            <h5>{{ index + 1 }}</h5>
            <h5>{{ message.from_id.fname }}</h5>
            <h5>{{ message.from_id.lname }}</h5>
            <h5>{{ message.from_id.personalCode }}</h5>
            <h5>{{ message.from_id.nationalityCode }}</h5>
          </li>
        </ul>
      </section>
    </section>
    <button
      type="button"
      class="w-fit flex gap-2 items-center px-6 py-1.5 text-base font-medium cursor-pointer hover:bg-primary hover:text-white rounded-lg border border-primary text-primary"
      @click="fetchSendingResponseMessages"
    >
      <IconsSearch class="size-6" />
      جستجو
    </button>
  </template>
  <h3 v-else class="msg-text">هیچ پیام بازیابی رمز عبوری دریافت نشده است!</h3>
</template>
<script lang="ts" setup>
import type { IMessage, IRequest } from "~/types/types";

const messages = ref<IMessage[]>([]);
const checkedCells = ref<string[]>([]);
const baseUrl = useRuntimeConfig().public.baseUrl;
const token = localStorage.getItem("token") || "";

const fetchMessages = async () => {
  try {
    const response = await $fetch<IRequest<IMessage[]>>(
      `${baseUrl}/messages?text=4`
    );
    messages.value = response.data;
  } catch (error) {
    console.log("Error", error);
  }
};
await fetchMessages();

const fetchSendingResponseMessages = async () => {
  try {
    const response = await $fetch(`${baseUrl}/messages/reset`, {
      method: "POST",
      body: {
        ids: checkedCells.value,
        headers: {
          Authorization: token,
        },
      },
    });
    console.log(response);
  } catch (error) {}
};

const addChecked = (id: string) => {
  if (checkedCells.value.includes(id))
    checkedCells.value = checkedCells.value.filter((_id) => _id !== id);
  else checkedCells.value.push(id);
};

const syncChilds = (e: Event) => {
  const target = e.target as HTMLInputElement;
  console.log(target.checked);
  if (target.checked) {
    messages.value.map((message) => {
      checkedCells.value.push(message._id);
    });
  } else {
    checkedCells.value = [];
  }
};

const syncParent = computed(
  () => checkedCells.value.length === messages.value.length
);
</script>
