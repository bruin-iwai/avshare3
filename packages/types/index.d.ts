declare namespace typeDefs {
  export interface IndexFileSchema {
    file: string;
    title: string;
  }

  export interface IndexSchema {
    title: string;
    files: IndexFileSchema[];
  }

  export interface UrlInfoType {
    url: string;
    title: string;
  }

  export type UrlInfoListType = UrlInfoType[];

  export interface IContentsListQuerystring {
    prefix: string;
  }
}

export = typeDefs;
