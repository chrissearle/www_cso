import moment from "moment";

export const displayDate = (date) => {
  return moment(date, "YYYY-MM-DD HH:mm Z").format("YYYY-MM-DD");
};

export const metaDate = (date) => {
  return moment(date, "YYYY-MM-DD HH:mm Z").toISOString();
};

export const yearDate = (date) => {
  return moment(date, "YYYY-MM-DD HH:mm Z").format("YYYY");
};
