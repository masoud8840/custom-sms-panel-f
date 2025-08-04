<template>
  <button
    class="flex items-center justify-between font-medium cursor-pointer py-3 px-4"
    @click="toggleCollapsed"
  >
    {{ `${props.member.fname}  ${props.member.lname}` }}
    <IconsChevron
      class="size-5 transition-transform duration-300"
      :class="{ '-rotate-180': collapsed }"
    />
  </button>

  <ul class="grid grid-cols-4 gap-4 py-3 px-4 mt-2" v-if="collapsed">
    <li>
      <h5 class="font-semibold text-text-main/50 leading-relaxed text-sm">
        نام و نام خانوادگی
      </h5>
      <p class="text-lg text-text-main">
        {{ `${props.member.fname} ${props.member.lname}` }}
      </p>
    </li>
    <li>
      <h5 class="font-semibold text-text-main/50 leading-relaxed text-sm">
        کد شناسایی
      </h5>
      <p class="text-lg text-text-main">{{ props.member.personalCode }}</p>
    </li>
    <li>
      <h5 class="font-semibold text-text-main/50 leading-relaxed text-sm">
        کد ملی
      </h5>
      <p class="text-lg text-text-main">{{ props.member.nationalityCode }}</p>
    </li>
    <li>
      <h5 class="font-semibold text-text-main/50 leading-relaxed text-sm">
        تلفن همراه
      </h5>
      <p class="text-lg text-text-main">
        {{ props.member.cellphone ?? "-" }}
      </p>
    </li>
    <li>
      <h5 class="font-semibold text-text-main/50 leading-relaxed text-sm">
        تاریخ تولد
      </h5>
      <p class="text-lg text-text-main">{{ birthdateToString }}</p>
    </li>
    <li>
      <h5 class="font-semibold text-text-main/50 leading-relaxed text-sm">
        نسبت
      </h5>
      <p class="text-lg text-text-main">
        {{ relationShipToString }}
      </p>
    </li>
    <li>
      <h5 class="font-semibold text-text-main/50 leading-relaxed text-sm">
        جنسیت
      </h5>
      <p class="text-lg text-text-main">{{ genderToString }}</p>
    </li>
    <li>
      <h5 class="font-semibold text-text-main/50 leading-relaxed text-sm">
        استان
      </h5>
      <p class="text-lg text-text-main">{{ props.member.city }}</p>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { IMember } from "~/types/types";


interface IProps {
  member: IMember;
}
const props = defineProps<IProps>();
const collapsed = ref(false);
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};

const relationShipToString = computed(() => {
  const relation = props.member.relationship;
  let rel = "";
  if (relation === 0) rel = "بازنشسته";
  if (relation >= 31 && relation <= 39) rel = "همسر";
  if (relation >= 41 && relation <= 49) rel = "فرزند";

  return rel;
});

const genderToString = computed(() => {
  const gen = props.member.gender;
  if (gen === 1) return "مذکر";
  if (gen === 2) return "مونث";
});

const birthdateToString = computed(() => {
  const date = props.member.birthdate;
  return formatPersianDate(date.toString());
});
function formatPersianDate(dateStr: string, separator = "/") {
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  return `${year}${separator}${month}${separator}${day}`;
}
</script>
