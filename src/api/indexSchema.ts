export interface IndexFileSchema {
  file: string;
  title: string;
}

export interface IndexSchema {
  title: string;
  files: IndexFileSchema[];
}

export interface UrlInfo {
  url: string;
  title: string;
}

export interface QueryParam {
  prefix: string;
}
