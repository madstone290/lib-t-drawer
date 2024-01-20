import '@/lib/t-drawer.css';
import { ToggleDrawerOptions, ToggleDrawerData, MenuItem, TDrawer } from './types';
import barsImg from '@/asset/image/bars-white-xl.svg';
import angleLeftImg from '@/asset/image/angle-left-white.svg';


export const ToggleDrawer: () => TDrawer = () => {
    const CLS_ROOT = 'td-root';
    const CLS_ROOT_LIST = 'td-root-list';
    const CLS_TOGGLE_BTN_BOX = 'td-toggle-btn-box';
    const CLS_TOGGLE_BTN = 'td-toggle-btn';
    const CLS_HEADER_BOX = 'td-header-box';
    const CLS_DEFAULT_HEADER = 'td-default-header';

    const CLS_MENU_ITEM_BOX = 'td-menu-item-box';
    const CLS_MENU_ITEM_CONTENT = 'td-menu-item-content';
    const CLS_MENU_ITEM_CONTENT_INNER = 'td-menu-item-content-inner';
    const CLS_MENU_ITEM_SUB_LIST = 'td-menu-item-sub-list';
    const CLS_MENU_ITEM_TEXT = 'td-menu-item-text';
    const CLS_ARROW_ICON = 'td-arrow-icon';

    const CLS_LEVEL_PREFIX = 'td-level-';

    const CLS_STICKY = 'td-sticky';

    const CLS_SELECTED = 'td-selected';
    const CLS_OPEN = 'td-open';
    const CLS_CLOSE = 'td-close';

    const _options: ToggleDrawerOptions = {
        open: false,
        multiSelection: false,
        toggleBtn: {
            sticky: true,
            enabled: true,
        },
        showHeader: true,
        onModeChanged: () => { },
        renderToggleBtn: (box: HTMLElement) => {
            const toggleBtnEl = document.createElement('img');
            toggleBtnEl.classList.add(CLS_TOGGLE_BTN);
            toggleBtnEl.src = barsImg;
            box.appendChild(toggleBtnEl);
            return toggleBtnEl;
        },
        renderHeader: (box: HTMLElement, open: boolean) => {
            const header = document.createElement('div');
            header.classList.add(CLS_DEFAULT_HEADER);

            const textEl = document.createElement('div');
            if (open) {
                textEl.innerText = "T-Drawer Open";
            } else {
                textEl.innerText = "TD";
            }
            header.appendChild(textEl);

            box.appendChild(header);
            return header;
        },
        renderMenuItemContentText: (box: HTMLElement, item: MenuItem, level: number, open: boolean) => {
            const textEl = document.createElement('div');
            textEl.classList.add(CLS_MENU_ITEM_TEXT);
            textEl.style.paddingLeft = `${(level) * 20}px`;

            const iconEl = document.createElement('i');
            if (item.icon) {
                iconEl.className = item.icon;
                iconEl.style.marginRight = '4px';
            }
            if (!open && level === 0) {
                iconEl.style.fontSize = '20px';
                iconEl.style.paddingLeft = '20px';
            }
            if (open && level === 0) {
                iconEl.style.paddingLeft = '10px';
            }

            textEl.appendChild(iconEl);

            if (open || level !== 0) {
                const nameEl = document.createElement('span');
                nameEl.innerText = item.name;
                textEl.appendChild(nameEl);
            }

            box.appendChild(textEl);
            return textEl;
        },
        onMenuItemClick: (item: MenuItem) => { console.log(item) },
    }

    const _data: ToggleDrawerData = {
        menuItems: [],
    }

    let _rootEl: HTMLElement;
    let _toggleBtnBoxEl: HTMLElement;
    let _headerBoxEl: HTMLElement;
    let _rootListEl: HTMLElement;

    let _selectedMenuItemId: string | null = null;

    function create(container: HTMLElement) {
        _rootEl = document.createElement('div');
        _rootEl.classList.add(CLS_ROOT);

        _toggleBtnBoxEl = document.createElement('div');
        _toggleBtnBoxEl.classList.add(CLS_TOGGLE_BTN_BOX);
        _rootEl.appendChild(_toggleBtnBoxEl);

        _headerBoxEl = document.createElement('div');
        _headerBoxEl.classList.add(CLS_HEADER_BOX);
        _rootEl.appendChild(_headerBoxEl);

        _rootListEl = document.createElement('div');
        _rootListEl.classList.add(`${CLS_ROOT_LIST}`);
        _rootEl.appendChild(_rootListEl);

        container.appendChild(_rootEl);
    }

    function setOptions(options: Partial<ToggleDrawerOptions>) {
        Object.assign(_options, options);
    }

    function setData(data: Partial<ToggleDrawerData>) {
        Object.assign(_data, data);
    }

    function _clearElements() {
        _toggleBtnBoxEl.replaceChildren();
        _headerBoxEl.replaceChildren();
        _rootListEl.replaceChildren();
    }

    function _renderElements() {
        if (_options.toggleBtn?.enabled) {
            _renderToggleBtn();
        }

        if (_options.showHeader) {
            _renderHeader();
        }

        _renderMenu();
    }

    function select(id: string | null) {
        let itemBoxEl = _rootEl.querySelector(`[data-id="${id}"]`) as HTMLElement;
        _selectMenuItem(itemBoxEl);
    }

    function _findParentItemBoxEl(itemBoxEl: HTMLElement) {
        if (itemBoxEl.parentElement!.parentElement!.classList.contains(CLS_MENU_ITEM_BOX)) {
            return itemBoxEl.parentElement!.parentElement;
        }
        return null;
    }

    /**
     * 열림 상태를 토글한다.
     */
    function toggle() {
        changeMode(!_options.open);
    }

    /**
     * 열림 상태를 변경한다.
     * @param open 열림 상태
     */
    function changeMode(open: boolean) {
        _options.open = open;

        render();

        if (_options.onModeChanged)
            _options.onModeChanged(open);
    }

    /**
     * 드로어를 렌더링한다.
     */
    function render() {
        if (_options.open) {
            _rootEl.classList.add(CLS_OPEN);
            _rootEl.classList.remove(CLS_CLOSE);
        }
        else {
            _rootEl.classList.remove(CLS_OPEN);
            _rootEl.classList.add(CLS_CLOSE);
        }

        /** 이전 요소들을 제거하고 새로 렌더링한다 */
        _clearElements();
        _renderElements();
        select(_selectedMenuItemId);

    }

    /**
     * 서브리스트 엘리먼트의 위치를 조정하여 화면 하단을 넘어가지 않도록 한다.
     * @param item 
     * @param itemEl 
     * @param subListEl 
     * @returns 
     */
    function _adjustSubListElPosition(item: MenuItem, itemEl: HTMLElement, subListEl: HTMLElement) {
        if (!item.subList)
            return;
        const containerElHeight = subListEl.offsetHeight;
        const initialContainerElTop = itemEl.offsetTop - _rootEl.scrollTop;
        const containerMaxHeight = _rootEl.clientHeight;

        let adjustedContainerElTop = initialContainerElTop;
        if (initialContainerElTop + containerElHeight > containerMaxHeight) {
            adjustedContainerElTop = containerMaxHeight - containerElHeight;
            if (adjustedContainerElTop < 0) {
                adjustedContainerElTop = 0;
            }
        }
        // 서브리스트가 화면 하단을 넘어가지 않도록 top을 조정한다.
        subListEl.style.top = adjustedContainerElTop + 'px';
        // 서브리스트가 아이템우측에 바로 위치하도록 clientWidth를 적용한다.
        subListEl.style.left = _rootEl.clientWidth + 'px';
    }

    /**
     * 토글 버튼을 렌더링한다.
     */
    function _renderToggleBtn() {
        if (_options.toggleBtn?.sticky)
            _toggleBtnBoxEl.classList.add(CLS_STICKY);
        else
            _toggleBtnBoxEl.classList.remove(CLS_STICKY);

        const btnEl = _options.renderToggleBtn(_toggleBtnBoxEl);
        btnEl.addEventListener('click', () => {
            toggle();
        });
    }

    /**
     * 헤더를 렌더링한다.
     */
    function _renderHeader() {
        _options.renderHeader(_headerBoxEl, _options.open);
    }

    /**
     * 메뉴를 렌더링한다.
     */
    function _renderMenu() {
        _data.menuItems.map(item => {
            const itemBox = _renderMenuItem(item, 0);
            _rootListEl.appendChild(itemBox);
        });

        _rootEl.appendChild(_rootListEl);
    }

    function _renderMenuItem(item: MenuItem, level: number) {
        const menuItemEl = document.createElement('div');
        const clsLevel = CLS_LEVEL_PREFIX + level;
        menuItemEl.classList.add(CLS_MENU_ITEM_BOX, clsLevel);
        menuItemEl.setAttribute('data-id', item.id);

        _renderMenuItemContent(menuItemEl, item, level);

        menuItemEl.addEventListener('click', (event) => {
            event.stopPropagation();
            _selectMenuItem(menuItemEl);
            if (_options.onMenuItemClick)
                _options.onMenuItemClick(item);
        });

        if (item.subList && item.subList.length > 0) {
            const subListEl = document.createElement('div');
            subListEl.className = `${CLS_MENU_ITEM_SUB_LIST}`;
            for (const child of item.subList) {
                subListEl.appendChild(_renderMenuItem(child, level + 1));
            }
            menuItemEl.appendChild(subListEl);
            menuItemEl.addEventListener('mouseenter', (event) => {
                if (!_options.open) {
                    _adjustSubListElPosition(item, menuItemEl, subListEl);
                }
            });
        }
        _rootListEl.appendChild(menuItemEl);
        return menuItemEl;
    }


    function _selectMenuItem(menuItemBoxEl?: HTMLElement) {
        if (!menuItemBoxEl)
            return;

        // if the item is already selected, deselect it
        if (menuItemBoxEl.classList.contains(CLS_SELECTED)) {
            menuItemBoxEl.classList.remove(CLS_SELECTED);
            _selectedMenuItemId = null;
            return;
        }

        if (!_options.multiSelection) {
            // deselect every item except the current one and its parents
            const selectedItems = _rootEl.querySelectorAll(`.${CLS_SELECTED}`);
            for (const item of selectedItems) {
                item.classList.remove(CLS_SELECTED);
            }
        }
        // select the current item and its parents
        let parentItemBoxEl = _findParentItemBoxEl(menuItemBoxEl);
        while (parentItemBoxEl) {
            parentItemBoxEl.classList.add(CLS_SELECTED);
            parentItemBoxEl = _findParentItemBoxEl(parentItemBoxEl);
        }
        menuItemBoxEl.classList.add(CLS_SELECTED);
        _selectedMenuItemId = menuItemBoxEl.getAttribute('data-id')!;
    }

    function _renderMenuItemContent(box: HTMLElement, item: MenuItem, level: number) {
        const contentBoxEl = document.createElement('div');
        contentBoxEl.classList.add(CLS_MENU_ITEM_CONTENT);

        const contentEl = document.createElement('div');
        contentEl.classList.add(CLS_MENU_ITEM_CONTENT_INNER)
        if (_options.open) {
            // contentEl.classList.add(CLS_HIDE_ON_CLOSE);
            contentEl.appendChild(_options.renderMenuItemContentText(contentBoxEl, item, level, true));
        } else {
            // contentEl.classList.add(CLS_HIDE_ON_OPEN);
            contentEl.appendChild(_options.renderMenuItemContentText(contentBoxEl, item, level, false));
        }
        contentBoxEl.appendChild(contentEl);

        if (item.subList && item.subList.length > 0) {
            const arrowEl = document.createElement('img');
            arrowEl.classList.add(CLS_ARROW_ICON);
            arrowEl.src = angleLeftImg;
            contentBoxEl.appendChild(arrowEl);
        }

        box.appendChild(contentBoxEl);
        return contentBoxEl;
    }

    return {
        create,
        setOptions,
        setData,
        render,
        toggle,
        select,
        open: () => changeMode(true),
        close: () => changeMode(false),
    }
};

