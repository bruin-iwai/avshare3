import { ofetch } from 'ofetch';
import type { UrlInfoListType } from '@avshare3/api/src/types';
import { useLoadingStore } from './loading';

export const useRootStore = defineStore('root', () => {
  const prefix = ref('');
  const urls = ref<UrlInfoListType>([]);
  const loadingStore = useLoadingStore();

  const {
    public: { apiBase: baseURL },
  } = useRuntimeConfig();

  async function fetchUrls(prefix: string) {
    return await ofetch<UrlInfoListType>('/contentsList', {
      baseURL,
      query: { prefix },
    });
  }
  watch(prefix, (newValue) => {
    if (newValue) {
      loadingStore.loading = true;
      fetchUrls(newValue)
        .then((res) => {
          urls.value = res;
        })
        .finally(() => {
          loadingStore.loading = false;
        });
    }
  });

  return {
    prefix,
    urls,
    fetchUrls,
  };
});
