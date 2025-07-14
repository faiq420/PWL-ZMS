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
    result = string.substring(0, 4) + "-" + string[4];
  } else {
    result = string.substring(0, 12);
  }

  return result;
}

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
  | "access";

export const NavigateToRecord = (
  screen: ScreenKey,
  tab: string = "",
  mode: string,
  id?: number
) => {
  const screens: Record<ScreenKey, string> = {
    user: "user-management",
    zoo: "zoo-profile",
    guide: "digital-guide",
    animal: "animal-management",
    visits: "visit-planning",
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
