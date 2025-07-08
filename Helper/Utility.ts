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
