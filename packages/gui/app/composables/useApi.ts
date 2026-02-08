export const useApi = () => {
  const {
    public: { apiBase: baseURL },
  } = useRuntimeConfig();
  const loadingStore = useLoadingStore();
  const { loading } = storeToRefs(loadingStore);

  const api = $fetch.create({
    baseURL,
    onRequest() {
      loading.value = true;
    },
    onResponse() {
      loading.value = false;
    },
    onRequestError() {
      loading.value = false;
    },
    onResponseError() {
      loading.value = false;
    },
  });

  return api;
};
