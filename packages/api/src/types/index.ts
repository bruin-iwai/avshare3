import { type Static, Type } from '@sinclair/typebox';

export interface IndexFileSchema {
  file: string;
  title: string;
}

export interface IndexSchema {
  title: string;
  files: IndexFileSchema[];
}

export const UrlInfo = Type.Object({
  url: Type.String(),
  title: Type.String(),
});
export const UrlInfoList = Type.Array(UrlInfo);
export type UrlInfoListType = Static<typeof UrlInfoList>;

export const QueryParam = Type.Object({
  prefix: Type.String(),
});

export const ErrorInfo = Type.Object({
  statusCode: Type.Number(),
  error: Type.String(),
  message: Type.String(),
});
