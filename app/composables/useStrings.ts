export const useStrings = () => {
    const splitList = (items: string) =>
        (items ? items.split(",").map((item) => item.trim()) : []).sort();

    const countSplitList = (items: string[]) =>
        items
            .map((element) => splitList(element))
            .flat()
            .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())

    return {
        splitList,
        countSplitList
    }
}