export const useLoadingStore = defineStore('loading', () => {
  const loading = ref(false);

  const $reset = () => {
    loading.value = false;
  };

  return { loading, $reset };
});
