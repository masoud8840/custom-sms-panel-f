<template>
  <main class="messages-view">
    <nav>
      <ul class="grid grid-cols-3 gap-4">
        <li
          class="grid"
          v-for="(link, counter) in authLinksOutput"
          :key="counter"
        >
          <NuxtLink
            :to="link.to"
            class="border hover:text-text-secondary hover:border-text-secondary hover:shadow-xl hover:shadow-text-main/10 transition-all duration-150 flex flex-col items-center border-text-main/50 py-4 rounded-2xl text-text-main/50"
          >
            <component :is="link.icon" class="size-10" />
            <h4
              class="font-semibold tracking-wide text-base leading-relaxed mt-2"
            >
              {{ link.text }}
            </h4>
            <p class="text-sm">{{ link.caption }}</p>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script lang="ts" setup>
import { IconsFingerPrint, IconsIdentification, IconsLogin } from "#components";
import { IRole } from "~/types/types";

useHead({
  title: "عملیات حساب",
});

const authStore = useAuthStore();
const authLinks = shallowRef([
  {
    icon: IconsIdentification,
    text: "مدیریت کابران",
    caption: "کاربران سامانه را مدیریت کنید",
    to: "/auth/identity",
    visibility: authStore.getUser?.role == IRole.Admin,
  },
  {
    icon: IconsLogin,
    text: "ورود",
    caption: "وارد حساب کاربری خود شوید",
    to: "/auth/login",
    visibility: !authStore.getUser,
  },
  {
    icon: IconsFingerPrint,
    text: "ثبت نام",
    caption: "حساب کاربری جدید ایجاد کنید",
    to: "/auth/signup",
    visibility: authStore.getUser?.role == IRole.Admin || !authStore.getUser,
    // visibility: !authStore.getUser,
  },
]);

const authLinksOutput = computed(() =>
  authLinks.value.filter((Link) => Link.visibility)
);
</script>
