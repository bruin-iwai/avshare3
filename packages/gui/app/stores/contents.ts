import type { ContentInfoType } from '@avshare3/api';

export const useContentsStore = defineStore('contents', () => {
  const prefix = ref('');
  const contents = ref<ContentInfoType[]>([]);

  const api = useApi();

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

  watchEffect(async () => {
    if (!prefix.value) {
      return;
    }

    const res = await api<ContentInfoType[]>('/contentsList', {
      method: 'GET',
      query: { prefix: prefix.value },
    });
    contents.value = res;
  });

  const $reset = () => {
    prefix.value = '';
    contents.value = [];
  };

  return { prefix, contents, $reset, onClick };
});
