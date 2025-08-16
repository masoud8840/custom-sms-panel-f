<template>
  <main class="messages-view">
    <nav>
      <ul class="grid grid-cols-3 gap-4">
        <li
          class="grid"
          v-for="(link, counter) in linkWithPermission"
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
    <!-- <NuxtPage /> -->
  </main>
</template>

<script lang="ts" setup>
import {
  IconsHashtag,
  IconsInboxArrow,
  IconsKey,
  IconsSend,
  IconsSendFrom,
} from "#components";
import { IRole } from "~/types/types";

useHead({
  title: "عملیات پیامکها",
});
definePageMeta({
  middleware: ["auth-guard"],
});

const authStore = useAuthStore();
const messagesLinks = shallowRef([
  {
    icon: IconsSend,
    text: "ارسال سریع*",
    caption: "به اشخاص مورد نظر پیامک ارسال کنید",
    to: "/messages/send",
    visibility: authStore.getUser?.role == IRole.Admin,
  },
  {
    icon: IconsSendFrom,
    text: "ارسال از شخص",
    caption: "از طرف اشخاص پیامک ارسال کنید",
    to: "/messages/send-from",
    visibility: true,
  },
  {
    icon: IconsInboxArrow,
    text: "صندوق دریافتی",
    caption: "پیامک های دریافت شده را ببینید",
    to: "/messages/inbox",
    visibility: true,
  },
  {
    icon: IconsHashtag,
    text: "کد های عملیاتی*",
    caption: "کد های قابل دریافت توسط سامانه را ببینید",
    to: "/messages/codes",
    visibility: authStore.getUser?.role == IRole.Admin,
  },
  {
    icon: IconsKey,
    text: "پیامکهای بازیابی رمز*",
    caption: "درخواست های بازیابی رمز عبور را ببینید",
    to: "/messages/reset-password",
    visibility: authStore.getUser?.role == IRole.Admin,
  },
]);

const linkWithPermission = computed(() =>
  messagesLinks.value.filter((m) => m.visibility == true)
);
</script>
