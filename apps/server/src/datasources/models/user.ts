export type User = {
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  userAvatarPath: string;
  isNotiStatus: boolean;
  isPremium: boolean;
  sourceRegister: 0 | 1 | 2; // 0: IOS, 1: Android, 2: Web
  userFacebookId?: string;
  userGoogleId?: string;
  userGender?: 0 | 1 | 2; // 0: Male, 1: Female, 2: Other;
  userRegion?: string;
  language?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export enum SourceRegister {
  IOS,
  Android,
  Web,
}

export enum UserGender {
  Male,
  Female,
  Other,
}
