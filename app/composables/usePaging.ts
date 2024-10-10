export const usePaging = () => {
    const maxPostCount = 16

    const pageCount = (count: number) => Math.ceil(count / maxPostCount)

    return {
        maxPostCount,
        pageCount
    }
}
