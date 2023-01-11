export interface CurrentUserInfoInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
  company_name: string;
  tax_identity_number: number;
  api_token: string;
  avatar: string;
  headline?: string;
  basket_list_count: number;
  wish_list_count: number;
}

export interface CurrentUserUpdateInterface {
  first_name?: string;
  last_name?: string;
  email?: string;
  company_name?: string;
  tax_identity_number?: number;
  current_password?: string;
  new_password?: string;
}

export interface UploadFilePath {
  lastModified: number;
  lastModifiedDate: object;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface UploadFile {
  file: Blob;
  type: string;
}

export interface UploadFileResponse {
  data: UploadFileData;
  success: boolean;
}

export interface UploadFileData {
  path: string;
  url: string;
}
