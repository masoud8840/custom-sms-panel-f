<template>
  <main class="messages-view">
    <nav>
      <ul class="grid grid-cols-3 gap-4">
        <li class="grid" v-for="(link, counter) in helpLinks" :key="counter">
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
    <NuxtPage />
  </main>
</template>

<script lang="ts" setup>
import { IconsMessageText, IconsUserGroup } from "#components";

useHead({
  title: "راهنمای سامانه",
});

const helpLinks = shallowRef([
  {
    icon: IconsMessageText,
    text: "راهنمای پیامکها",
    caption: "راهنمای مربوط به پیامک ها را مطالعه کنید",
    to: "/help/messages",
  },
  {
    icon: IconsUserGroup,
    text: "راهنمای اعضاء",
    caption: "راهنمای مربوط به اعضاء را مطالعه کنید",
    to: "/help/members",
  },
]);
</script>
