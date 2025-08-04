import dayjs from "dayjs";
import jalali from "jalali-plugin-dayjs";

export default defineNuxtPlugin((nuxtApp) => {
  const dayjsPlugin = dayjs.extend(jalali);
  return nuxtApp.provide("dayjs", dayjsPlugin);
});
