import {defineNuxtPlugin} from "#app";

const splitList = (items: string) =>
    items ? items.split(",").map((item) => item.trim()) : undefined;

export default defineNuxtPlugin(() => {
    return {
        provide: {
            splitList: (items: string) => splitList(items),

            countSplitList: (items: string[]) =>
                items
                    .map((element) => splitList(element))
                    .flat()
                    .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()),

            imagePrefix: (path: string): string => {
                return "/images/posts" + path.substring(0, 9);
            },

            articleLink: (path: string): string => {
                const parts = path.split("/");

                return (
                    "/" +
                    parts[1] +
                    "/" +
                    parts[2] +
                    "/" +
                    parts[3].substring(0, 2) +
                    "/" +
                    parts[3].substring(3)
                );
            },
        },
    };
});
