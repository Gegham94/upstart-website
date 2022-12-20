export interface TrainerMetaInterface {
  success: boolean;
  data: MetaDataInterface;
}

export interface MetaDataInterface {
  success?: boolean;
  errors?: object;
  avatar: string;
  avatar_path?: string;
  id?: number;
  first_name: string;
  last_name: string;
  user_id?: number;
  headline: string;
  created_at?: Date;
  updated_at?: Date;
  email?: string;
  bio: string;
  links?: {
    facebook: string;
    linkedin: string;
    youtube: string;
    twitter: string;
    website: string;
  };
}

export interface ErrorInput {
  [key: string]: string;
}

export interface ResponseError {
  success?: boolean;
  message?: string;
  errors?: Object;
}

export interface MetaDataFormGroup {
  id?: number;
  user_id?: number;
  headline: string;
  bio: string;
  created_at?: Date;
  updated_at?: Date;
  trainers?: [];
  email?: string;
  first_name: string;
  last_name: string;
  avatar: string;
  avatar_path?: string;
  twitter?: string;
  website?: string;
  youtube?: string;
  facebook?: string;
  linkedin?: string;
}
