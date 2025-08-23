<template>
  <main class="send-normal">
    <h3
      class="border-r-2 mb-6 pr-2 text-text-main border-text-link font-bold text-xl"
    >
      ارسال سریع
    </h3>
    <ul class="hints">
      <li
        class="hints-item border-r-orange-400 border-r-2 px-2 py-1 flex items-center gap-2"
      >
        <IconsInfo class="size-6 text-orange-400" />
        <p class="font-medium text-orange-400">
          توجه داشته باشید که سطر اول فایل انتخابی شما باید نام ستون "تلفن
          همراه" را داشته باشد.
        </p>
      </li>
    </ul>

    <form class="space-y-6 mt-6" @submit.prevent="handleUploadFile">
      <label
        for="recievers"
        class="border-r-2 pr-2 leading-relaxed mb-3 block text-text-main border-text-link font-semibold text-base"
      >
        فایل گیرندگان
      </label>
      <section
        class="input-group relative grid border border-dashed rounded-lg"
        :class="fileInput.file ? 'border-text-main' : 'border-text-main/50'"
      >
        <span
          class="absolute w-full text-center leading-relaxed top-1/2 left-1/2 -translate-1/2 font-medium"
          :class="fileInput.file ? 'text-text-main' : 'text-text-main/50'"
        >
          <template v-if="fileInput.file">
            (کیلوبایت {{ fileInput.size }}) - {{ fileInput.name }}
          </template>
          <template v-else>
            <IconsUpload class="size-11 mb-2 mx-auto" />
            فایل را انتخاب کنید<br />(xlsx.)
          </template>
        </span>
        <input
          type="file"
          class="p-14 opacity-0 cursor-pointer"
          @change="handleFileInput"
          id="recievers"
        />
      </section>

      <section class="input-group">
        <label
          for="messageText"
          class="border-r-2 pr-2 leading-relaxed mb-3 block text-text-main border-text-link font-semibold text-base"
          >متن پیامک</label
        >
        <textarea
          id="messageText"
          placeholder="سلام {{fname}} {{lname}} عزیز ،"
          class="text-sm min-h-40 placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
          v-model="text"
        ></textarea>
      </section>
      <button
        type="submit"
        class="w-fit px-6 py-2 text-base font-medium cursor-pointer hover:bg-primary hover:text-white rounded-md border border-primary text-primary"
      >
        ارسال پیامکها
      </button>
    </form>
  </main>
</template>

<script lang="ts" setup>
useHead({
  title: "عملیات پیامکها | ارسال عادی",
});
definePageMeta({
  middleware: ["auth-guard", "admin-gaurd"],
});
const fileInput = ref({
  name: "",
  size: "",
  file: null as File | null,
});
const text = ref("");

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
const token = localStorage.getItem("token") || "";
const handleUploadFile = async () => {
  try {
    if (!fileInput.value.file) {
      return;
    }
    const baseUrl = useRuntimeConfig().public.baseUrl;
    const formData = new FormData();
    formData.append("file", fileInput.value.file);
    formData.append("text", text.value);

    const response = await $fetch(`${baseUrl}/messages/send`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token,
      },
    });

    console.log(response);
  } catch (error) {}
};
</script>
