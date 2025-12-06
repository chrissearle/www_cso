import { DateTime } from "luxon"

export const useDates = () => {
  const fromFormat = (dateStr: string): DateTime | undefined => {
    if (!dateStr) {
      return undefined
    }

    let dt = DateTime.fromFormat(dateStr, "yyyy-MM-dd hh:mm ZZZ")

    if (dt.isValid) {
      return dt
    }

    dt = DateTime.fromFormat(dateStr, "yyyy-MM-dd hh:mm:ss ZZZ")

    if (dt.isValid) {
      return dt
    }

    return undefined
  }

  const dateFormat = (dateStr: string) =>
    fromFormat(dateStr)?.toFormat("yyyy-MM-dd")

  return {
    dateFormat,
  }
}
