export const useApi = () => {
  const {
    public: { apiBase: baseURL },
  } = useRuntimeConfig();

  const api = $fetch.create({
    baseURL,
  });

  return api;
};
