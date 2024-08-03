import type { UrlInfo } from '@avshare3/api/src/api/indexSchema';

/**
 * 状態 "urls" を参照する。初期値は空配列。
 * @returns state "urls"
 */
export const useUrls = () => useState<UrlInfo[]>(() => []);
