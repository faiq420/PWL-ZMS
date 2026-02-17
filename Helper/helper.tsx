import {
  getTokenCookie,
  getTokenString,
  removeCookieKey,
  removeTokenCookie,
} from "@/lib/cookieToken";
import { defaultTokenObject, Token } from "@/lib/Token";

const useHelper = () => {
  const BaseURL =
    process.env.NODE_ENV === "development"
      ? "https://localhost:44383"
      : "https://pwl-api.times-labs.com";
  const API: string = `${BaseURL}/api`;
  const headers: Headers = new Headers({
    Authorization: "Bearer " + getTokenString(),
  });

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

  const appendValue = (formData: FormData, key: string, value: any) => {
    if (value === null || value === undefined) return;

    const type = typeof value;

    if (type === "string" || type === "number" || type === "boolean") {
      formData.append(key, value.toString());
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        appendValue(formData, `${key}[${index}]`, item);
      });
    } else if (type === "object") {
      Object.keys(value).forEach((childKey) => {
        appendValue(formData, `${key}[${childKey}]`, value[childKey]);
      });
    }
  };

  const ConvertToFormDataV2 = (object: { [key: string]: any }): FormData => {
    const formData = new FormData();

    Object.keys(object)
      .filter((k) => object[k] !== null)
      .forEach((key) => {
        appendValue(formData, key, object[key]);
      });

    return formData;
  };

  const xhr = {
    Post: async (endpoint: string, formData: FormData): Promise<any> => {
      // console.clear();
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      const response = await fetch(API + endpoint, {
        method: "POST",
        body: formData,
        headers: new Headers({
          Authorization: "Bearer " + getTokenString(),
        }),
      });
      // console.clear();
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const err = await response.json();
        throw new Error(err.message);
      }
    },
    Get: async (
      endpoint: string,
      paramString: string = "",
      expectFile = false
    ): Promise<any> => {
      // console.clear();
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
    const token = getTokenCookie(); // reads from cookie and handles expiry internally
    if (token && token.sid !== "") {
      return token;
    }
    return defaultTokenObject;
  }

  function GetDocument(url: string): string {
    return `${BaseURL}${url}`;
  }

  // const GetPageData = () => {
  //   const pathInitial = "/" + pathname.split("/").slice(1, 3).join("/");
  //   console.log(pathInitial, "pi");
  //   if (typeof window !== "undefined") {
  //     const menuItem = JSON.parse(getData("menu_items")).find(
  //       (item: any) => item.href === pathInitial
  //     );
  //     console.log(menuItem);
  //     if (menuItem) {
  //       return menuItem;
  //     } else {
  //       return {
  //         MenuName: "",
  //         Description: "",
  //         href: "",
  //         iconName: "",
  //         MenuId: 0,
  //         ParentId: null,
  //         SortingOrder: "",
  //         permissions: {
  //           edit: false,
  //           create: false,
  //           view: false,
  //           delete: false,
  //         },
  //       };
  //     }
  //   }
  // };

  function updateMenuItemsInLocalStorage(items: any[]) {
    localStorage.setItem("menu_items", JSON.stringify(items));
    window.dispatchEvent(new Event("menu_items_updated"));
  }

  const Logout = () => {
    removeTokenCookie();
    removeCookieKey("userDetails");
    removeData("menu_items");
    // router.push("/");
  };

  return {
    storeData,
    getData,
    ConvertToFormData,
    ConvertToFormDataV2,
    GetURLParamString,
    xhr,
    GetToken,
    removeData,
    GetDocument,
    API,
    // GetPageData,
    Logout,
    updateMenuItemsInLocalStorage,
  };
};

export default useHelper;
