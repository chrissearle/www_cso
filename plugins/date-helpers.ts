import {DateTime} from "luxon";
import {defineNuxtPlugin} from "#app";

const fromFormat = (dateStr: string): DateTime | undefined => {
    if (!dateStr) {
        return undefined;
    }

    let dt = DateTime.fromFormat(dateStr, "yyyy-MM-dd hh:mm ZZZ");

    if (dt.isValid) {
        return dt;
    }

    dt = DateTime.fromFormat(dateStr, "yyyy-MM-dd hh:mm:ss ZZZ");

    if (dt.isValid) {
        return dt;
    }

    return undefined;
};

export default defineNuxtPlugin(() => {
    return {
        provide: {
            displayDate: (dateStr: string) =>
                fromFormat(dateStr)?.toFormat("yyyy-MM-dd"),

            yearDate: (dateStr: string) => fromFormat(dateStr)?.year?.toString(),
        },
    };
});
