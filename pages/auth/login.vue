<template>
  <main class="login-view">
    <h3
      class="border-r-2 pr-2 text-text-main border-text-link font-bold text-xl"
    >
      ورود به حساب کاربری
    </h3>
    <form
      class="mt-4 grid grid-cols-2 gap-4"
      @submit.prevent="handleLogin"
      autocomplete="off"
    >
      <section class="input-group">
        <label
          for="username"
          class="block font-semibold text-text-main text-base leading-loose mb-1"
          >نام کاربری</label
        >
        <input
          type="text"
          id="username"
          placeholder="نام کاربری (اجباری)"
          class="text-sm placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-4 py-3"
          v-model="loginCreds.username"
        />
      </section>
      <section class="input-group">
        <label
          for="password"
          class="block font-semibold text-text-main text-base leading-loose mb-1"
          >رمز عبور</label
        >
        <input
          type="password"
          id="password"
          placeholder="رمز عبور (اجباری)"
          class="text-sm placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-4 py-3"
          v-model="loginCreds.password"
        />
      </section>
      <button
        type="submit"
        class="w-fit px-6 py-2 text-base font-medium cursor-pointer hover:bg-primary hover:text-white rounded-md border border-primary text-primary"
      >
        ورود به حساب کاربری
      </button>
    </form>
  </main>
</template>

<script lang="ts" setup>
useHead({
  title: "عملیات حساب | ورود",
});

const authStore = useAuthStore();
const loginCreds = ref({
  username: "",
  password: "",
});
const handleLogin = async () => {
  const { username, password } = loginCreds.value;

  await authStore.login(username, password);
};
</script>
