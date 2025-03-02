import type { UrlInfoListType } from '@avshare3/api/src/types';

/**
 * 状態 "urls" を参照する。初期値は空配列。
 * @returns state "urls"
 */
export const useUrls = () => useState<UrlInfoListType>(() => []);
