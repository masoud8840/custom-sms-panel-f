<template>
  <main class="members-update">
    <h3
      class="border-r-2 pr-2 mb-6 text-text-main border-text-link font-bold text-xl"
    >
      بروزرسانی اعضاء
    </h3>

    <ul class="hints">
      <li
        class="hints-item border-r-orange-400 border-r-2 px-2 py-1 flex items-center gap-2"
      >
        <IconsInfo class="size-6 text-orange-400" />
        <p class="font-medium text-orange-400">
          در صورت امکان ، فایل اعضاء را به قسمت های کوچک تقسیم کنید.
        </p>
      </li>
    </ul>

    <form class="space-y-6" @submit.prevent="handleUploadFile">
      <section
        class="input-group relative grid mt-6 border border-dashed rounded-lg"
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
          accept=".xlsx"
        />
      </section>
      <button
        type="submit"
        class="w-fit px-6 py-2 text-base font-medium cursor-pointer hover:bg-primary hover:text-white rounded-md border border-primary text-primary"
      >
        ارسال فایل اعضاء
      </button>
    </form>
  </main>
</template>
<script lang="ts" setup>
useHead({
  title: "عملیات اعضاء | بروزرسانی",
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

let inProgress = false;
const baseUrl = useRuntimeConfig().public.baseUrl;
const token = localStorage.getItem("token") || "";
const handleUploadFile = async () => {
  inProgress = true;
  if (!fileInput.value.file) return;
  const formData = new FormData();
  formData.append("file", fileInput.value.file);

  try {
    const response = await $fetch(`${baseUrl}/members/update`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
  } finally {
    inProgress = false;
  }
};

const fetchCancelUpdate = async () => {
  try {
    const response = await $fetch(`${baseUrl}/members/abort`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {}
};
onBeforeRouteLeave(async (to, from, next) => {
  if (inProgress) {
    const answer = confirm(
      "فرایند بروزرسانی در حال اجراست برای خروج از فرایند اطمینان دارید؟"
    );
    if (answer) {
      await fetchCancelUpdate();
      next();
    } else {
      next(false); // جلوگیری از ترک صفحه
    }
  } else {
    next();
  }
});
</script>
