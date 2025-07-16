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

  <ul class="grid grid-cols-4 py-3 px-4 mt-2" v-if="collapsed">
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
</script>
