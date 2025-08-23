import { IRole } from "~/types/types";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (!(authStore.getUser?.role == IRole.Admin)) {
    return navigateTo("/");
  }
});
