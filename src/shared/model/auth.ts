export interface AuthDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  email: string;
  name: string;
  password: string;
}

export interface UserAuthResponseDto {
  id: string;
  email: string;
}

export interface AuthResponseDto {
  user: UserAuthResponseDto;
  accessToken: string;
}

export interface UserRole {
  id: string;
  name: string;
}

export interface LikeEntity {
  id: string;
  userId: string;
  productId: string;
}

export interface FavoriteEntity {
  id: string;
  userId: string;
  postId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarPath?: string | null;
  about?: string | null;
  phone?: string | null;
  roles?: UserRole[];
  likes?: LikeEntity[];
  favoritesPost?: FavoriteEntity[];
}

export interface AuthInfo {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
}

export interface AuthMethods {
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export type AuthContextModel = AuthInfo & AuthMethods;
