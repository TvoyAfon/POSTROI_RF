
export interface INavMenu {
    handleToogleOpen: () => void,

}

export interface INavigationProps {
    activeItem?: string,
    handleNavClick?: (item: string) => void,
    isOpenMap?: boolean,
    handleCloseMap?: () => void,
    isOpenMenu?: boolean,
    handleClosePopUp?: () => void,
    changeCity?: (city: string) => void
}