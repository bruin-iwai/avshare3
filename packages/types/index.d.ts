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
    href: string;
    title: string;
  }

  export interface IContentsListQuerystring {
    prefix: string;
  }
}

export = typeDefs;
