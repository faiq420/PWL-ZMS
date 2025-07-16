import { defaultTokenObject, Token } from "@/lib/Token";
import { usePathname, useRouter } from "next/navigation";

const useHelper = () => {
  const pathname = usePathname();
  const router = useRouter();
  const API: string =
    process.env.NODE_ENV === "development"
      ? "https://localhost:44383"
      : "https://localhost:44383"
      // : "https://zms.com";
  const headers: Headers = new Headers({
    Authorization: "Bearer " + getData("token"),
  });

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

  const storeData = (key: string, value: string) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error("Error storing data:", e);
    }
  };

  const removeData = (key: string) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.error("Error storing data:", e);
    }
  };

  function getData(key: string): string {
    try {
      if (typeof window !== "undefined") {
        const data = window.localStorage.getItem(key);
        if (data === null) {
          return "";
        }
        return data;
      }
      return "";
    } catch (e) {
      console.error("Error retrieving data:", (e as Error).message);
      return "";
    }
  }

  const GetURLParamString = (params: any): URLSearchParams => {
    try {
      const urlParams = new URLSearchParams();
      const keys = Object.keys(params);
      keys.forEach((key) => {
        const value = params[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            urlParams.append(key, String(item));
          });
        } else {
          urlParams.append(key, String(value));
        }
      });
      return urlParams;
    } catch (E) {
      return new URLSearchParams();
    }
  };

  const ConvertToFormData = (object: { [key: string]: any }): FormData => {
    const formData = new FormData();
    const keys = Object.keys(object).filter((K: string) => object[K] !== null);
    keys.forEach((D: any, I: number) => {
      if (
        typeof object[D] === "string" ||
        typeof object[D] === "number" ||
        typeof object[D] === "boolean"
      ) {
        formData.append(D, object[D].toString());
      } else if (Array.isArray(object[D])) {
        object[D].forEach((O, I) => {
          if (
            typeof O === "string" ||
            typeof O === "number" ||
            typeof O === "boolean"
          ) {
            formData.append(`${D}[${I}]`, O.toString());
          } else if (O instanceof File) {
            formData.append(`${D}`, O);
          } else {
            Object.keys(O).forEach((K: string, J: number) => {
              formData.append(`${D}[${I}][${K}]`, object[D][I][K]);
            });
          }
        });
      } else if (object[D] instanceof File) {
        formData.append(D, object[D]);
      } else if (typeof object[D] === "object") {
        Object.keys(object[D]).forEach((K: string, J: number) => {
          formData.append(`${D}[${K}]`, object[D][K]);
        });
      }
    });
    return formData;
  };

  const xhr = {
    Post: async (endpoint: string, formData: FormData): Promise<any> => {
      console.clear();
      const response = await fetch(API + endpoint, {
        method: "POST",
        body: formData,
        headers: new Headers({
          Authorization: "Bearer " + getData("token"),
        }),
      });
      console.clear();
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const err = await response.json();
        throw new Error(err.Message);
      }
    },
    Get: async (
      endpoint: string,
      paramString: string = "",
      expectFile = false
    ): Promise<any> => {
      console.clear();
      const response = await fetch(API + endpoint + "?" + paramString, {
        method: "GET",
        headers: headers,
      });
      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (
          expectFile ||
          contentType?.includes("application/octet-stream") ||
          contentType?.includes("application/pdf") ||
          contentType?.includes("image") ||
          contentType?.includes("text/csv")
        ) {
          const blob = await response.blob();
          return blob;
        } else {
          const jsonData = await response.json();
          return jsonData;
        }
      } else {
        const err = await response.text();
        console.error(err);
        throw new Error(err);
      }
    },
  };

  function GetToken(): Token {
    const token = getData("token");
    if (token !== "") {
      var parsedToken = JSON.parse(Base64.atob(token?.split(".")[1])) as Token;
      return parsedToken;
    }
    return defaultTokenObject;
  }

  function GetDocument(url: string): string {
    return `${API}/${url}`;
  }

  return {
    storeData,
    getData,
    Base64,
    ConvertToFormData,
    GetURLParamString,
    xhr,
    GetToken,
    removeData,
    GetDocument,
  };
};

export default useHelper;
