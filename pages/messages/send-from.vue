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

    <form class="space-y-6 mt-6" @submit.prevent="handleUploadFile">
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
        >
          <option value="n/a">انتخاب کنید</option>
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
          placeholder="09123456789"
          class="text-sm placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
        />
      </section>
      <button
        type="submit"
        class="w-fit px-6 py-2 text-base font-medium cursor-pointer hover:bg-primary hover:text-white rounded-md border border-primary text-primary"
      >
        ارسال پیامک
      </button>
    </form>
  </main>
</template>

<script lang="ts" setup>
useHead({
  title: "عملیات پیامکها | ارسال از شخص",
});
const fileInput = ref({
  name: "",
  size: "",
  file: null as File | null,
});

const handleFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files?.length) {
    const file = target.files[0];
    fileInput.value.file = file;
    fileInput.value.size = Number((file.size / 1024).toFixed(0)).toLocaleString(
      "fa-IR"
    );
    fileInput.value.name = file.name;
  } else {
    fileInput.value = {
      file: null,
      name: "",
      size: "",
    };
  }
};

const handleUploadFile = async () => {
  console.log(fileInput.value.file);
};
</script>
