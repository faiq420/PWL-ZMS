export interface Token {
  userId: string;
  roleId: string;
  nbf: string;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

export const defaultTokenObject: Token = {
  userId: "",
  roleId: "",
  nbf: "",
  iss: "",
  iat: -1,
  exp: -1,
  aud: "",
};

export const TOKEN_KEY = "auth_token";
