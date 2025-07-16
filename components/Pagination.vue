<template>
  <footer class="mt-8">
    <section class="pagination-container flex justify-between">
      <section class="pagination">
        <ul class="pagination-total flex items-center gap-2">
          <li v-for="(page, index) in totalPages">
            <button
              class="cursor-pointer w-9 h-9 font-medium rounded-lg hover:underline"
              :class="{ 'bg-primary text-white': page === props.page }"
              @click="handlePageEmit(page)"
            >
              {{ page }}
            </button>
          </li>
        </ul>
      </section>
      <section class="total-items">
        <p class="text-sm font-medium text-text-main">
          {{ showHowMuchIsDisplayedOnList }}
        </p>
      </section>
    </section>
  </footer>
</template>

<script lang="ts" setup>
interface IProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
}
const props = defineProps<IProps>();

const showHowMuchIsDisplayedOnList = computed(() => {
  if (props.page * props.limit > props.total)
    return `نمایش ${props.total} از ${props.total}`;
  else return `نمایش ${props.page * props.limit} از ${props.total}`;
});

interface IEmits {
  (e: "changePage", newPage: number): void;
}
const emits = defineEmits<IEmits>();
const handlePageEmit = (clickedPage: number) => {
  emits("changePage", clickedPage);
};
</script>
