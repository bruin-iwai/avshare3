import type { ContentInfoType } from '@avshare3/api';

export const useContentsStore = defineStore('contents', () => {
  const prefix = ref('');

  const api = useApi();

  const contents = computedAsync<ContentInfoType[]>(async () => {
    if (!prefix.value) {
      return [];
    }
    return await api<ContentInfoType[]>('/contentsList', {
      method: 'GET',
      query: { prefix: prefix.value },
    });
  }, []);

  const onClick = async (key: string) => {
    if (!prefix.value || !key) {
      return;
    }

    const { url } = await api<{ url: string }>('/getSignedUrl', {
      method: 'GET',
      query: { prefix: prefix.value, key },
    });

    await navigateTo(url, {
      external: true,
      open: {
        target: '_blank',
      },
    });
  };

  const $reset = () => {
    prefix.value = '';
  };

  return { prefix, contents, $reset, onClick };
});
