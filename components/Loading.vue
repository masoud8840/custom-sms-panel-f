<template>
  <section class="loading-overlay flex gap-3 justify-center">
    <span
      v-for="i in 3"
      :class="`w-6 h-6 block rounded-full animate-bounce bg-text-secondary dot-${i}`"
    ></span>
  </section>
</template>
