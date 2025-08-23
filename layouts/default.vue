<template>
  <section class="layout-default min-h-screen grid">
    <section
      class="view-default container mx-auto grid grid-cols-8 gap-8 py-10"
    >
      <aside class="col-span-2 h-full bg-white p-6 rounded-4xl">
        <nav class="h-full">
          <ul class="flex flex-col gap-2 h-full">
            <li v-for="(link, counter) in navLinks" :key="counter">
              <NuxtLink
                :to="link.to"
                class="flex font-medium tracking-wide items-center gap-3 py-2.5 px-4 text-base rounded-md hover:text-text-secondary text-text-main/50"
                active-class="text-white bg-text-secondary hover:text-white"
              >
                <component :is="link.icon" class="size-7" />
                {{ link.text }}
              </NuxtLink>
            </li>
            <li class="mt-auto" v-if="authStore.getUser">
              <button
                class="flex w-full font-medium tracking-wide items-center gap-3 py-2.5 px-4 text-base rounded-md text-red cursor-pointer"
                @click="authStore.logout"
              >
                <IconsLogout class="size-7" />
                خروج از حساب کاربری
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <section class="view-container col-span-6 bg-white rounded-4xl p-6">
        <h2 class="font-extrabold leading-relaxed text-3xl text-text-main">
          <span v-if="authStore.user"
            >{{ authStore.user.fullname }} عزیز ،</span
          >
          خوش آمدید
        </h2>
        <span class="mb-8 inline-block text-text-main">{{ today }}</span>
        <slot />
      </section>
    </section>
  </section>
</template>

<script lang="ts" setup>
import {
  IconsDocumentBar,
  IconsHome,
  IconsInfo,
  IconsMessageText,
  IconsUserCircle,
  IconsUserGroup,
} from "#components";
import { IRole } from "~/types/types";

const authStore = useAuthStore();
const today = useState("today", () => ref(new Date()));
const navLinks = computed(() => {
  const links = [
    {
      text: "صفحه اصلی",
      icon: IconsHome,
      to: "/",
      visibility: true,
    },
    {
      text: "پیامک ها",
      icon: IconsMessageText,
      to: "/messages",
      visibility: authStore.getUser,
    },
    {
      text: "اعضاء",
      icon: IconsUserGroup,
      to: "/members",
      visibility: authStore.getUser,
    },
    {
      text: "گزارشات",
      icon: IconsDocumentBar,
      to: "/reports",
      visibility: authStore.getUser?.role == IRole.Admin,
    },
    {
      text: "حساب کاربری",
      icon: IconsUserCircle,
      to: "/auth",
      visibility: !authStore.getUser || authStore.getUser.role == IRole.Admin,
    },
    {
      text: "راهنما",
      icon: IconsInfo,
      to: "/help",
      visibility: true,
    },
  ];

  return links.filter((link) => link.visibility);
});
onMounted(() => {
  setInterval(() => {
    today.value = new Date();
  }, 1000);
});
</script>
