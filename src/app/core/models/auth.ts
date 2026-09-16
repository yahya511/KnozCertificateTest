export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
  appType: number;
}

export interface AuthResponse {
  status: boolean;
  message: string;
  record: {
    token: string;
    userInfo?: UserInfo;
  };
}

export interface UserInfo {
  id: string;
  userName: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  image?: string;
  emailConfirmed?: boolean;
  gender?: number;
  hireDate?: string;
  address?: string;
  userType?: number;
  notes?: string;
  jobTitle?: string;
  preference?: {
    languageCode: string;
    languageName?: string;
  };
  country?: {
    name: string;
    flag: string;
    code?: string;
    isoCode?: string;
  };
  [key: string]: any;
}
