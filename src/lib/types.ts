export interface TDrawer {
    open(): void;
    close(): void;
    create(containerEl: HTMLElement): void;
    setOptions(options: Partial<ToggleDrawerOptions>): void;
    setData(data: Partial<ToggleDrawerData>): void;
    render(): void;
    toggle(): void;
    select(id: string): void;
}

export interface MenuItem {
    id: string;
    icon?: string;
    name: string;
    url?: string;
    subList?: MenuItem[];
}

export interface ToggleDrawerData {
    menuItems: MenuItem[];
}

export interface ToggleDrawerOptions {
    /**
     * 드로어 열림 상태
     */
    open: boolean;

    /**
     * 복수 선택 가능 여부. 기본값은 false
     */
    multiSelection: boolean;

    /**
     * 드로어 토글 버튼 표시 여부. 기본값은 true.
     */
    showToggleBtn: boolean;

    /**
     * 드로어 헤더 표시 여부. 기본값은 true.
     */
    showHeader: boolean;

    /**
     * 드로어 열림 상태일 때 헤더 텍스트. 기본값은 Toggle Drawer
     */
    headerTextOpen: string;

    /**
     * 드로어 닫힘 상태일 때 헤더 텍스트. 기본값은 T/D
     */
    headerTextClosed: string;

    /**
     * 드로어 열림 상태 변경 이벤트
     * @param open 열림 상태 
     */
    onModeChanged(open: boolean): void;

    /**
     * 메뉴 아이템 클릭 핸들러
     * @param item 
     */
    onMenuItemClick(item: MenuItem): void;

    /**
     * 토글 버튼 렌더링 함수. 지정하지 않으면 기본 토글 버튼이 렌더링됨.
     * @param box 토글 버튼이 들어갈 박스 
     * @returns 
     */
    renderToggleBtn: (box: HTMLElement) => HTMLElement;

    /**
     * 헤더 렌더링 함수. 지정하지 않으면 기본 헤더가 렌더링됨.
     * @param box 헤더 엘리먼트가 들어갈 박스
     * @returns 
     */
    renderHeader: (box: HTMLElement) => HTMLElement;

    /**
     * 메뉴 아이템 컨텐츠를 렌더링하는 함수. 지정하지 않으면 기본 메뉴 아이템 컨텐츠가 렌더링됨.
     * @param box
     * @param item 
     * @param level 
     * @returns 
     */
    renderMenuItemContent: (box: HTMLElement, item: MenuItem, level: number) => HTMLElement;
}