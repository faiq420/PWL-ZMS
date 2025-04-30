export interface Token {
  userId: number;
  nbf: string;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

export const defaultTokenObject: Token = {
  userId:-1,
  nbf: "",
  iss: "",
  iat: -1,
  exp: -1,
  aud: "",
};
