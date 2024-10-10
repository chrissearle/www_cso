export const useLinks = () => {
    const pageLink = (pageNo: number) => `/page/${pageNo}/`

    const tagsLink = (tag: string): string => `/tags/${tag}/`

    const categoryLink = (category: string): string => `/categories/${category}/`

    const seriesLink = (series: string): string => `/series/${series}/`

    return {
        pageLink,
        tagsLink,
        categoryLink,
        seriesLink
    }
}