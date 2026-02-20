import imageCompression from "browser-image-compression";
import useHelper from "./helper";
import { usePathname } from "next/navigation";

export const formatCnic = (string: string) => {
  let N = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let len = string.length;
  let CNIC_Formated = "";
  if (!N.includes(string[len - 1])) {
    return string.substring(0, len - 1);
  }
  let result = "";
  if (string[len - 1] === "-") {
    result = string.substring(0, len - 1);
  } else if (len == 14) {
    result = string.substring(0, 13) + "-" + string[13];
  } else if (len == 6) {
    result = string.substring(0, 5) + "-" + string[5];
  } else {
    result = string.substring(0, 15);
  }
  return result;
};

export const formatPhoneNumber = (string: string) => {
  let N = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const len = string.length;

  if (!N.includes(string[len - 1])) {
    return string.substring(0, len - 1);
  }

  let result = "";
  if (len === 5) {
    result = string.substring(0, 4) + string[4];
  } else {
    result = string.substring(0, 11);
  }

  return result;
};

export const compressFile = async (
  file: File,
  options?: {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    maxIteration?: number;
    useWebWorker?: boolean;
  },
): Promise<File> => {
  if (!file) throw new Error("No file provided for compression");

  const defaultOptions = {
    maxSizeMB: 1, // Target size in MB
    maxWidthOrHeight: 1920, // Resize large images
    maxIteration: 10, // Safety loop for quality adjustments
    useWebWorker: true, // Prevent UI freeze
  };

  const finalOptions = { ...defaultOptions, ...options };

  // Only compress image types
  if (!file.type.startsWith("image/")) {
    return file; // return original for non-image files
  }

  try {
    const compressed = await imageCompression(file, finalOptions);

    // Return compressed as File
    return new File([compressed], file.name, {
      type: compressed.type,
      lastModified: Date.now(),
    });
  } catch (error: any) {
    console.error("Compression failed → returning original file", error);
    return file;
  }
};

type ScreenKey =
  | ""
  | "user"
  | "zoo"
  | "guide"
  | "animal"
  | "visits"
  | "inspection"
  | "role"
  | "menu"
  | "services"
  | "access";

export const NavigateToRecord = (
  screen: ScreenKey,
  tab: string = "",
  mode: string,
  id?: number,
) => {
  const screens: Record<ScreenKey, string> = {
    user: "user-management",
    zoo: "zoo-profile",
    guide: "digital-guide",
    animal: "animal-management",
    visits: "visit-planning",
    services: "visitor-services",
    inspection: "veterinary-inspection",
    role: "role-management",
    menu: "menu-management",
    access: "access-management",
    "": "",
  };
  return (
    `/home/${screens[screen]}?${tab ? `tab=${tab}&` : ""}mode=${mode}` +
    (id != undefined ? `&id=${id}` : "")
  );
};

export const validEmail = (string: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(string) ? string : "";
};

export const verifyPassword = (password: string) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= minLength;

  return {
    isValid: hasUpperCase && hasLowerCase && hasSymbol && hasMinLength,
    errors: [
      !hasMinLength && `Password must be at least ${minLength} characters.`,
      !hasUpperCase && "Password must contain at least one uppercase letter.",
      !hasLowerCase && "Password must contain at least one lowercase letter.",
      !hasSymbol && "Password must contain at least one symbol.",
    ].filter(Boolean),
  };
};
