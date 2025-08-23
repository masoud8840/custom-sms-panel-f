<template>
  <main class="identity-view">
    <ul class="users-list space-y-6">
      <li
        class="users-item text-text-main border border-text-secondary/15 hover:border-text-main/100 duration-150 transition rounded-lg grid py-3 px-4"
        v-for="user in usersExceptCurrentUser"
        :key="user._id"
      >
        <ul class="grid grid-cols-6 gap-4 items-end">
          <li>
            <h5 class="font-semibold text-text-main/50 leading-relaxed text-sm">
              نام و نام خانوادگی
            </h5>
            <p class="text-text-main">{{ user.fullname }}</p>
          </li>
          <li>
            <h5 class="font-semibold text-text-main/50 leading-relaxed text-sm">
              نام کاربری
            </h5>
            <p class="text-text-main">{{ user.username }}</p>
          </li>
          <li>
            <h5 class="font-semibold text-text-main/50 leading-relaxed text-sm">
              سطح دسترسی
            </h5>
            <p class="text-text-main">
              {{ user.role == IRole.Admin ? "مدیریت" : "کاربر" }}
            </p>
          </li>
          <li>
            <h5 class="font-semibold text-text-main/50 leading-relaxed text-sm">
              وضعیت حساب کاربری
            </h5>
            <p
              :class="['', user.verified === true ? 'text-green' : 'text-red']"
            >
              {{ user.verified ? "تایید شده" : "در انتظار تایید" }}
            </p>
          </li>
          <li class="col-span-2">
            <div class="flex gap-2" v-if="!user.verified">
              <button
                type="button"
                class="flex gap-2 items-center justify-center py-1.5 px-4 text-sm font-medium cursor-pointer hover:bg-green hover:text-white rounded-lg border border-green text-green"
                @click="onVerify(user._id)"
              >
                <IconsCheck class="size-6" />
                تایید حساب
              </button>
              <button
                type="button"
                class="flex gap-2 items-center justify-center py-1.5 px-4 text-sm font-medium cursor-pointer hover:bg-red hover:text-white rounded-lg border border-red text-red"
                @click="onDelete(user._id)"
              >
                <IconsTrash class="size-6" />
                حذف درخواست
              </button>
            </div>
            <button
              type="button"
              class="flex gap-2 items-center justify-center py-1.5 px-4 text-sm font-medium cursor-pointer hover:bg-primary hover:text-white rounded-lg border border-primary text-primary"
              @click="onVerify(user._id)"
              v-else
            >
              <IconsAlert class="size-6" />
              غیرفعال کردن حساب
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </main>
</template>

<script lang="ts" setup>
import { IRole, type IRequest, type IUser } from "~/types/types";
definePageMeta({
  middleware: ["auth-guard", "admin-gaurd"],
});
useHead({
  title: "عملیات حساب | مدیریت",
});
const authStore = useAuthStore();
const baseUrl = useRuntimeConfig().public.baseUrl;
const users = ref<IUser[]>();
const token = localStorage.getItem("token") || "";
const initFetch = async () => {
  try {
    const response = await $fetch<IRequest<IUser[]>>(`${baseUrl}/users`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response);
    users.value = response.data;
  } catch (error) {}
};
await initFetch();

const onVerify = async (id: string) => {
  try {
    const response = await $fetch(`${baseUrl}/users/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    await initFetch();
  } catch (error) {}
};

const onDelete = async (id: string) => {
  try {
    const response = await $fetch(`${baseUrl}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    await initFetch();
  } catch (error) {}
};
const usersExceptCurrentUser = computed(() =>
  users.value?.filter((u) => u._id !== authStore.getUser?._id)
);
</script>
