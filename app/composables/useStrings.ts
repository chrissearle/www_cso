export const useStrings = () => {
    const splitList = (items: string) =>
        (items ? items.split(",").map((item) => item.trim()) : []).sort();

    const countSplitList = (items: string[]) =>
        items
            .map((tags) => {
                if (Array.isArray(tags)) {
                    return tags;
                }
                return splitList(tags);
            })
            .flat()
            .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())

    return {
        splitList,
        countSplitList
    }
}