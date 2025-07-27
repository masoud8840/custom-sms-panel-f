<template>
  <h3
    class="border-r-2 mb-6 pr-2 text-text-main border-text-link font-bold text-xl"
  >
    صندوق دریافتی
  </h3>

  <section class="table-container">
    <section class="table-search">
      <form
        class="search-form grid grid-cols-4 gap-4 mb-8"
        autocomplete="off"
        @submit.prevent="handleSearchMessages"
      >
        <section
          class="input-group"
          v-for="(group, index) in filters"
          :key="index"
        >
          <label
            :for="group.name"
            class="leading-loose font-medium text-text-main mb-1 inline-block"
            >{{ group.label }}</label
          >
          <input
            type="text"
            :id="group.name"
            :placeholder="`${group.label} (اختیاری)`"
            class="text-sm placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
            v-model="group.value"
          />
        </section>
        <section class="input-group flex col-span-2 gap-4">
          <button
            type="submit"
            class="w-fit flex gap-2 items-center px-6 py-1.5 text-base font-medium cursor-pointer hover:bg-primary hover:text-white rounded-lg border border-primary text-primary"
          >
            <IconsSearch class="size-6" />
            جستجو
          </button>
          <button
            type="button"
            class="w-fit flex gap-2 items-center px-4 py-1.5 text-base font-medium cursor-pointer hover:bg-text-main/10 rounded-lg text-text-main"
            @click="downloadMessages"
          >
            <IconsDownload class="size-6" />
            بارگیری پیامکها
          </button>
        </section>
      </form>
    </section>
    <section class="table-header">
      <div
        class="table-header-row p-4 rounded-t-lg font-semibold text-text-main bg-text-secondary/15"
      >
        <h5>نام</h5>
        <h5>نام خانوادگی</h5>
        <h5>کد شناسایی</h5>
        <h5>تلفن همراه</h5>
        <h5>زمان ارسال</h5>
        <h5>متن پیامک</h5>
      </div>
    </section>
    <section class="table-body">
      <ul
        class="rounded-b-lg space-y-3 border border-text-main/25 border-t-0 py-3"
      >
        <li
          class="table-body-row py-1 px-4 text-text-main font-medium"
          v-for="message in messages"
          :key="message._id"
        >
          <h5>{{ message.from_id.fname }}</h5>
          <h5>{{ message.from_id.lname }}</h5>
          <h5>{{ message.from_id.personalCode }}</h5>
          <h5>{{ message.from }}</h5>
          <h5>
            {{
              new Date(message.createdAt).toLocaleDateString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            }}
          </h5>
          <h5 class="truncate">{{ message.text }}</h5>
        </li>
      </ul>
    </section>
  </section>
</template>
<script lang="ts" setup>
import moment from "jalali-moment";
import type { IMessage, IRequest } from "~/types/types";

const filters = ref([
  {
    name: "cellphone",
    value: "9370700162",
    label: "تلفن همراه",
  },
  {
    name: "text",
    value: "",
    label: "متن پیامک",
  },
  {
    name: "fromDate",
    value: "",
    label: "از تاریخ",
  },
  {
    name: "toDate",
    value: "",
    label: "تا تاریخ",
  },
]);

const messages = ref<IMessage[]>();
const baseUrl = useRuntimeConfig().public.baseUrl;
const fetchMessages = async () => {
  try {
    const response = await $fetch<IRequest<IMessage[]>>(
      `${baseUrl}/messages`,
      {}
    );
    messages.value = response.data;
  } catch (error) {
    console.log("Error", error);
  }
};
await fetchMessages();

const extractQueryParams = () => {
  const cellphone = filters.value[0];
  const text = filters.value[1];
  const fromDate = filters.value[2];
  const toDate = filters.value[3];
  let gregorianFrom, gregorianTo;
  if (fromDate.value)
    gregorianFrom = moment.from(fromDate.value, "fa", "jYYYY/jMM/jDD HH:mm");
  if (toDate.value)
    gregorianTo = moment.from(toDate.value, "fa", "jYYYY/jMM/jDD HH:mm");

  const params = new URLSearchParams();

  if (gregorianFrom?.isValid()) {
    params.append("from", gregorianFrom.toISOString());
  }
  if (gregorianTo?.isValid()) {
    params.append("to", gregorianTo.toISOString());
  }
  if (cellphone.value) {
    params.append("cellphone", cellphone.value);
  }
  if (text.value) {
    params.append("text", text.value);
  }

  return params;
};
const handleSearchMessages = async () => {
  const params = extractQueryParams();

  try {
    const response = await $fetch<IRequest<IMessage[]>>(
      `${baseUrl}/messages?${params.toString()}`,
      {
        method: "GET",
      }
    );
    messages.value = response.data;
  } catch (error) {}
};

const downloadMessages = async () => {
  const params = extractQueryParams();

  try {
    const response = await $fetch<Blob>(
      `${baseUrl}/messages/download?${params.toString()}`,
      {
        method: "GET",
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([response]));

    // Original code for download remains the same
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "messages_export.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // Clean up the blob URL
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
</script>
