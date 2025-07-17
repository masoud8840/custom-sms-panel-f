export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (!authStore.getUser) {
    return navigateTo("/");
  }
});
