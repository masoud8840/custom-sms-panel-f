<template>
  <main class="login-view">
    <h3
      class="border-r-2 pr-2 text-text-main border-text-link font-bold text-xl"
    >
      ایجاد حساب کاربری
    </h3>
    <form class="mt-4 grid gap-4" @submit.prevent="signup" autocomplete="off">
      <section class="input-group">
        <label
          for="fullname"
          class="block font-semibold text-text-main text-base leading-loose mb-1"
          >نام و نام خانوادگی</label
        >
        <input
          type="text"
          id="fullname"
          placeholder="نام و نام خانوادگی (اجباری)"
          class="text-sm placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-4 py-3"
          v-model="signupCreds.fullname"
        />
      </section>
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
          v-model="signupCreds.username"
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
          v-model="signupCreds.password"
        />
      </section>

      <section
        class="input-group"
        v-if="authStore.getUser?.role == IRole.Admin"
      >
        <label
          for="role"
          class="block font-semibold text-text-main text-base leading-loose mb-1"
          >سطح دسترسی</label
        >
        <button
          type="button"
          :class="[
            'mr-2 text-base cursor-pointer text-text-main/50 leading-loose mb-1 border border-text-main/15 px-6 py-1.5 rounded-lg font-medium',
            {
              'text-white bg-primary border-transparent':
                signupCreds.role == IRole.User,
            },
          ]"
          @click="toggleRole(IRole.User)"
        >
          کاربر عادی
        </button>
        <button
          type="button"
          :class="[
            'mr-4 text-base cursor-pointer text-text-main/50 leading-loose mb-1 border border-text-main/15 px-6 py-1.5 rounded-lg font-medium',
            {
              'text-white bg-primary border-transparent':
                signupCreds.role == IRole.Admin,
            },
          ]"
          @click="toggleRole(IRole.Admin)"
        >
          مدیریت
        </button>
      </section>
      <section class="input-group">
        <button
          type="submit"
          class="w-fit px-6 py-2 text-base font-medium cursor-pointer hover:bg-primary hover:text-white rounded-md border border-primary text-primary"
        >
          ایجاد حساب کاربری
        </button>
      </section>
    </form>
  </main>
</template>

<script lang="ts" setup>
import { IRole } from "~/types/types";

useHead({
  title: "عملیات حساب | ایجاد",
});
const signupCreds = ref({
  fullname: "",
  username: "",
  password: "",
  role: IRole.User,
});

const authStore = useAuthStore();
const signup = async () => {
  const { fullname, password, username, role } = signupCreds.value;
  await authStore.signup(fullname, username, password, role);
};

const toggleRole = (role: number) => {
  signupCreds.value.role = role;
};
</script>
