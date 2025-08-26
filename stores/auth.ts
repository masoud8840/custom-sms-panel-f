import { defineStore } from "pinia";
import type { IRequest, IRole, IUser, IUserWithToken } from "~/types/types";

interface IState {
  user: IUser | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): IState => ({
    user: null,
  }),

  getters: {
    getUser: (state: IState) => state.user,
  },
  actions: {
    async login(username: string, password: string) {
      const notif = push.promise("در حال ورود به حساب کاربری...");
      const runtimeConfig = useRuntimeConfig();
      const baseUrl = runtimeConfig.public.baseUrl;
      try {
        const response = await $fetch<IRequest<IUserWithToken>>(
          `${baseUrl}/users/login`,
          {
            method: "POST",
            body: {
              username,
              password,
            },
          }
        );
        this.user = response.data;
        localStorage.setItem("token", response.data.token);
        notif.resolve(response.message);
        return navigateTo("/");
      } catch (error) {
        // @ts-ignore
        notif.reject(error.response._data.message);
        // console.log(error.response._data);
      }
    },
    async signup(
      fullname: string,
      username: string,
      password: string,
      role: IRole
    ) {
      const notif = push.promise("در حال ایجاد حساب کاربری جدید...");

      const runtimeConfig = useRuntimeConfig();
      const baseUrl = runtimeConfig.public.baseUrl;
      try {
        const response = await $fetch<IRequest<{}>>(`${baseUrl}/users/signup`, {
          method: "POST",
          body: {
            fullname,
            username,
            password,
            role,
          },
        });
        notif.resolve(response.message);
        return navigateTo("/");
      } catch (error) {
        // @ts-ignore
        notif.reject(error.response._data.message);
        // console.log();
      }
    },
    async validate() {
      const savedToken = localStorage.getItem("token") || "";
      const runtimeConfig = useRuntimeConfig();
      const baseUrl = runtimeConfig.public.baseUrl;
      try {
        const response = await $fetch<IRequest<IUser>>(
          `${baseUrl}/users/validate`,
          {
            // method: "POST",
            headers: {
              Authorization: savedToken,
            },
          }
        );

        // (response);
        this.user = response.data;
        push.success(response.message);

        return navigateTo("/");
      } catch (error) {
        // @ts-ignore
        console.log(error.response._data);
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.user = null;
      return navigateTo("/");
    },
  },
});
