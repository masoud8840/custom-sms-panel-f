<template>
  <main class="members-search">
    <h3
      class="border-r-2 pr-2 mb-6 text-text-main border-text-link font-bold text-xl"
    >
      جستجو اعضاء
    </h3>
    <form
      class="search-form grid grid-cols-5 gap-4"
      autocomplete="off"
      @submit.prevent="onSearch"
    >
      <section class="input-group">
        <label
          for="fname"
          class="leading-loose font-medium text-text-main mb-1 inline-block"
          >نام</label
        >
        <input
          type="text"
          id="fname"
          placeholder="نام (اختیاری)"
          class="text-sm placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
          v-model="search.fname"
        />
      </section>
      <section class="input-group">
        <label
          for="lname"
          class="leading-loose font-medium text-text-main mb-1 inline-block"
          >نام خانوادگی</label
        >
        <input
          type="text"
          id="lname"
          placeholder="نام خانوادگی (اختیاری)"
          class="text-sm placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
          v-model="search.lname"
        />
      </section>
      <section class="input-group">
        <label
          for="nationalityCode"
          class="leading-loose font-medium text-text-main mb-1 inline-block"
          >کد ملی</label
        >
        <input
          type="text"
          id="nationalityCode"
          placeholder="کد ملی (اختیاری)"
          class="text-sm placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
          v-model="search.nationalityCode"
        />
      </section>
      <section class="input-group">
        <label
          for="personalCode"
          class="leading-loose font-medium text-text-main mb-1 inline-block"
          >کد شناسایی</label
        >
        <input
          type="text"
          id="personalCode"
          placeholder="کد شناسایی (اختیاری)"
          class="text-sm placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
          v-model="search.personalCode"
        />
      </section>
      <section class="input-group">
        <label
          for="cellphone"
          class="leading-loose font-medium text-text-main mb-1 inline-block"
          >تلفن همراه</label
        >
        <input
          type="text"
          id="cellphone"
          placeholder="تلفن همراه (اختیاری)"
          class="text-sm placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
          v-model="search.cellphone"
        />
      </section>
      <button
        type="submit"
        class="w-fit px-6 py-1.5 text-base font-medium cursor-pointer hover:bg-primary hover:text-white rounded-lg border border-primary text-primary"
      >
        جستجو کن!
      </button>
    </form>
    <template v-if="!isLoading">
      <ul class="mt-8 space-y-4">
        <li
          v-for="member in members"
          :key="member._id"
          class="text-text-main border border-text-secondary/15 hover:border-text-main/100 duration-150 transition rounded-lg grid"
        >
          <MembersSearchItem :member="member" />
        </li>
      </ul>

      <Pagination
        :page="pagination.page"
        :total="pagination.total"
        :total-pages="pagination.totalPages"
        :limit="pagination.limit"
        @change-page="changePage"
        v-if="members.length"
      />
    </template>
    <Loading v-else />
  </main>
</template>
<script lang="ts" setup>
import Loading from "~/components/Loading.vue";

useHead({
  title: "عملیات اعضاء | جستجو",
});

const search = ref({
  fname: "",
  lname: "",
  nationalityCode: "",
  personalCode: "",
  cellphone: "",
});

const pagination = ref({
  total: 0,
  page: 1,
  totalPages: 0,
  limit: 0,
});
const baseUrl = useRuntimeConfig().public.baseUrl;
const members = ref([]);
const isLoading = ref(false);
const onSearch = async () => {
  const { cellphone, fname, lname, nationalityCode, personalCode } =
    search.value;

  if (cellphone || fname || lname || nationalityCode || personalCode) {
    isLoading.value = true;
    const params = new URLSearchParams();
    if (cellphone) params.append("cellphone", cellphone.trim());
    if (fname) params.append("fname", fname.trim());
    if (lname) params.append("lname", lname.trim());
    if (nationalityCode)
      params.append("nationalityCode", nationalityCode.trim());
    if (personalCode) params.append("personalCode", personalCode.trim());
    params.append("page", pagination.value.page.toString());
    scrollTo({ top: 0 });
    try {
      const response = await $fetch(
        `${baseUrl}/members/search?${params.toString()}`
      );

      members.value = response.data;

      pagination.value = { ...response.pagination };

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }
};

const changePage = async (newPage: number) => {
  pagination.value.page = newPage;
  await onSearch();
};
</script>
