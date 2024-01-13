
export interface MenuItem {
    id: string;
    icon: string;
    name: string;
    url: string;
    subList: MenuItem[];
}

export interface ToggleDrawerData {
    menuItems: MenuItem[];
}

export interface ToggleDrawerOptions {
    /**
     * whether not to allow multiple selection. Default is true.
     */
    singleSelect: boolean;
    showToggleBtn: boolean;

    onModeChanged(isMini: boolean): void;

    renderCustomToggleBtn: (box: HTMLElement) => HTMLElement;
    renderCustomHeader: (box: HTMLElement) => HTMLElement;
    /**
     * Render custom menu item content. If this is specified, renderCustomAnchorContent is ignored.
     * @param box
     * @param item 
     * @param level 
     * @returns 
     */
    renderCustomMenuItemContent: (box: HTMLElement, item: MenuItem, level: number) => HTMLElement;

    /**
     * Render custom anchor content. Default is icon + name. If renderCustomAnchorContent is specified, this is ignored.
     * @param anchor
     * @param item 
     * @param level 
     * @returns 
     */
    renderCustomAnchorContent: (anchor: HTMLElement, item: MenuItem, level: number) => HTMLElement;
}