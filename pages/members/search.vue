<template>
  <main class="members-search">
    <h3
      class="border-r-2 pr-2 mb-6 text-text-main border-text-link font-bold text-xl"
    >
      جستجو اعضاء
    </h3>
    <form class="search-form grid grid-cols-4 gap-4" autocomplete="off">
      <section class="input-group">
        <label
          for="fullname"
          class="leading-loose font-medium text-text-main mb-1 inline-block"
          >نام و نام خانوادگی</label
        >
        <input
          type="text"
          id="fullname"
          placeholder="نام و نام خانوادگی (اختیاری)"
          class="text-sm placeholder:transition-all placeholder:duration-150 focus:placeholder:pr-2 border focus:border-text-secondary border-text-main/15 outline-0 w-full rounded-lg px-3 py-2"
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
        />
      </section>
      <button
        type="submit"
        class="w-fit px-6 py-1.5 text-base font-medium cursor-pointer hover:bg-primary hover:text-white rounded-lg border border-primary text-primary"
      >
        جستجو کن!
      </button>
    </form>
  </main>
</template>
