// vitest.config.ts で auto imports の設定を調整しても
// "TypeError: Package import specifier "#build/nuxt.config.mjs" is not defined"
// のエラーを回避できないので、やむを得ず global 定義して vitest を騙す
// cf) https://github.com/nuxt/test-utils/issues/349#issuecomment-1836958614

declare global {
  interface Window {
    useRuntimeConfig: () => Record<'public', Record<'apiBase', string>>;
  }
}

window.useRuntimeConfig = () => ({
  public: {
    apiBase: 'http://localhost/api',
  },
});
