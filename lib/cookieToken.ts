import Cookies from "js-cookie";
import { Token, defaultTokenObject } from "./Token";
import useHelper from "@/Helper/helper";

const TOKEN_KEY = "auth_token";

/**
 * Store token in cookie
 * @param token Token object
 * @param days Expiry in days
 */

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const Base64 = {
  btoa: (input: string = "") => {
    let str = input;
    let output = "";

    for (
      let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || ((map = "="), i % 1);
      output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
      charCode = str.charCodeAt((i += 3 / 4));

      if (charCode > 0xff) {
        throw new Error(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
        );
      }

      block = (block << 8) | charCode;
    }

    return output;
  },

  atob: (input: string = "") => {
    let str = input.replace(/=+$/, "");
    let output = "";

    if (str.length % 4 == 1) {
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  },
};

export const setTokenCookie = (token: string, days: number) => {
  console.log("Setting token cookie:", token);
  Cookies.set("auth_token", token, {
    expires: days,
    secure: window.location.protocol === "https:",
    sameSite: "Strict",
    path: "/",
  });
  console.log(getTokenCookie(), "calling");
};

/**
 * Retrieve full token object from cookie
 */
export const getTokenCookie = (): Token => {
  const cookie = Cookies.get(TOKEN_KEY);
  console.log(cookie, "cookie");
  if (!cookie) return { ...defaultTokenObject };

  try {
    // Extract payload safely
    const payload = cookie.split(".")[1];
    if (!payload) {
      removeTokenCookie();
      return { ...defaultTokenObject };
    }

    const decoded: Partial<Token> = JSON.parse(Base64.atob(payload));

    // Merge payload with defaults to ensure type completeness
    const token: Token = {
      ...defaultTokenObject,
      ...decoded,
    };

    // Validate expiration (exp is UNIX seconds)
    const nowMs = Date.now();
    const tokenExpMs = token.exp * 1000;

    if (token.exp && tokenExpMs < nowMs) {
      removeTokenCookie();
      return { ...defaultTokenObject };
    }

    return token;
  } catch {
    removeTokenCookie();
    return { ...defaultTokenObject };
  }
};

/**
 * Get individual keys
 */
export const getTokenUserId = (): string => getTokenCookie().userId;
export const getTokenExp = (): number => getTokenCookie().exp;
export const getTokenIat = (): number => getTokenCookie().iat;
export const getTokenNbf = (): string => getTokenCookie().nbf;
export const getTokenIss = (): string => getTokenCookie().iss;
export const getTokenAud = (): string => getTokenCookie().aud;

/**
 * Remove token cookie (logout)
 */
export const removeTokenCookie = () => {
  Cookies.remove("auth_token", { path: "/" });
};
