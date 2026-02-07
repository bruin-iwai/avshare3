import { defineStore } from 'pinia';
import type { UrlInfoType } from '@avshare3/types';

export const useContentsStore = defineStore('contents', () => {
  const prefix = ref('');
  const urls = ref<UrlInfoType[]>([]);
  const selectOptions = ref<string[]>(['', 'my-favorites', 'old-programs']);

  const {
    public: { apiBase: baseURL },
  } = useRuntimeConfig();

  watchEffect(async () => {
    if (!prefix.value) {
      return;
    }

    const res = await $fetch<UrlInfoType[]>('/contentsList', {
      baseURL,
      query: { prefix: prefix.value },
    });
    urls.value = res;
  });

  return { prefix, urls, selectOptions };
});
