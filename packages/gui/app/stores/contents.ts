import type { UrlInfoType } from '@avshare3/types';

export const useContentsStore = defineStore('contents', () => {
  const prefix = ref('');
  const urls = ref<UrlInfoType[]>([]);

  const api = useApi();

  watchEffect(async () => {
    if (!prefix.value) {
      return;
    }

    const res = await api<UrlInfoType[]>('/contentsList', {
      method: 'GET',
      query: { prefix: prefix.value },
    });
    urls.value = res;
  });

  const $reset = () => {
    prefix.value = '';
    urls.value = [];
  };

  return { prefix, urls, $reset };
});
