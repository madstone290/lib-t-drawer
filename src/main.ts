import { ToggleDrawer } from "@/lib/t-drawer";
import { MenuItem, ToggleDrawerData, ToggleDrawerOptions } from "./lib/types";

const drawerData: ToggleDrawerData = {
    menuItems: [
        {
            id: '1',
            icon: 'fa fa-search',
            name: '검색엔진',
            subList: [
                { id: '11', name: `구글`, url: 'https://www.google.com', },
                { id: '12', name: `네이버`, url: 'https://naver.com' },
                { id: '13', name: `빙`, url: 'https://bing.com' }
            ]
        },
        {
            id: '2',
            icon: 'fa-regular fa-map',
            name: '중첩메뉴',
            subList: [
                {
                    id: '21', name: `PS`, subList:
                        [
                            { id: '211', name: `프로그래머스`, url: 'https://programmers.co.kr/' },
                            { id: '212', name: `백준`, url: 'https://www.acmicpc.net' },
                            { id: '213', name: `코드업`, url: 'https://codeup.kr/' }
                        ]
                },
                {
                    id: '22', name: `도구모음`, subList:
                        [
                            { id: '221', name: `다이어그램`, url: 'https://www.draw.io' },
                            { id: '222', name: `JSON생성`, url: 'https://www.json-generator.com' },
                            { id: '223', name: `피그마: 디자인,목업`, url: 'https://www.figma.com' }
                        ]
                }
            ]
        },
        {
            id: '3',
            // icon: 'fa-solid fa-blog',
            name: 'Blog',
            subList: [
                { id: '31', name: `리눅스 분석`, url: 'https://netflixtechblog.com/linux-performance-analysis-in-60-000-milliseconds-accc10403c55' },
                { id: '32', name: `프로그래머 필독서`, url: 'https://www.sangkon.com/good_books_for_dev/' },
                { id: '33', name: `mes-service`, url: 'https://www.ge.com/digital/documentation/proficy-plant-applications/version82/common_service_docs/mes-service-impl-1.0.0-documentation.html#_overview' },
            ]
        },
        {
            id: '4', icon: 'fa fa-cubes', name: '4번',
            subList: [
                { id: '4-1', name: `1` },
                { id: '4-2', name: `2` },
                { id: '4-3', name: `3` },
                { id: '4-4', name: `4` },
            ]
        },
        {
            id: '5', icon: 'fa fa-cubes', name: '5번',
            subList: [
                { id: '5-1', name: `1` },
                { id: '5-2', name: `2` },
                { id: '5-3', name: `3` },
                { id: '5-4', name: `4` },
            ]
        },
        {
            id: '6', icon: 'fa fa-cubes', name: '6번',
            subList: [
                { id: '6-1', name: `1` },
                { id: '6-2', name: `2` },
                { id: '6-3', name: `3` },
                { id: '6-4', name: `4` },
            ]
        },
        {
            id: '7', icon: 'fa fa-cubes', name: '7번',
            subList: [
                { id: '7-1', name: `1` },
                { id: '7-2', name: `2` },
                { id: '7-3', name: `3` },
                { id: '7-4', name: `4` },
            ]
        },
        {
            id: '8', icon: 'fa fa-cubes', name: '8번',
            subList: [
                { id: '8-1', name: `1` },
                { id: '8-2', name: `2` },
                { id: '8-3', name: `3` },
                { id: '8-4', name: `4` },
            ]
        },
        {
            id: '9', icon: 'fa fa-cubes', name: '9번',
            subList: [
                { id: '9-1', name: `1` },
                { id: '9-2', name: `2` },
                { id: '9-3', name: `3` },
                { id: '9-4', name: `4` },
            ]
        },
        {
            id: '10', icon: 'fa fa-cubes', name: '10번',
            subList: [
                { id: '10-1', name: `1` },
                { id: '10-2', name: `2` },
                { id: '10-3', name: `3` },
                { id: '10-4', name: `4` },
            ]
        },
        {
            id: '11', icon: 'fa fa-cubes', name: '11번',
            subList: [
                { id: '11-1', name: `1` },
                { id: '11-2', name: `2` },
                { id: '11-3', name: `3` },
                { id: '11-4', name: `4` },
            ]
        },


    ]
};

function customRenderMenuItemContentText(box: HTMLElement, item: MenuItem, level: number, open: boolean) {
    const contentEl = document.createElement('a');
    contentEl.style.width = '100%';
    contentEl.style.height = '100%';
    contentEl.style.display = 'flex';
    contentEl.style.alignItems = 'center';
    if (item.url)
        contentEl.href = item.url!;

    const iconEl = document.createElement('i');
    if (item.icon) {
        iconEl.className = item.icon;
    }
    iconEl.style.paddingLeft = `${(level + 1) * 10}px`;
    iconEl.style.marginRight = '10px';

    if (!open) {
        iconEl.style.fontSize = '20px';
        iconEl.style.paddingLeft = '20px';
    }
    contentEl.appendChild(iconEl);

    if (open || level !== 0) {
        const label = document.createElement('span');
        label.innerText = item.name;
        contentEl.appendChild(label);
    }

    box.appendChild(contentEl);
    return contentEl;
}


const container = document.querySelector('.drawer-container') as HTMLElement;
const contentBox = document.querySelector('.content-box');
const drawer = ToggleDrawer();
drawer.create(container);

const options: Partial<ToggleDrawerOptions> = {
    multiSelection: false,
    toggleBtn: {
        sticky: true,
        enabled: true
    },
    showHeader: true,
    open: true,
    renderMenuItemContentText: customRenderMenuItemContentText,
    onModeChanged: (open: boolean) => {
        if (open) {
            document.documentElement.style.setProperty('--drawer-width', '300px');
        } else {
            document.documentElement.style.setProperty('--drawer-width', '70px');
        }
    },
    onMenuItemClick: (item: MenuItem) => {
        if (item.subList)
            return;
        if (item.id[0] === '1' || item.id[0] === '2' || item.id[0] === '3') {
            contentBox!.replaceChildren();
            contentBox!.innerHTML = `
                  <h1 class='flex-top'>${item.name} (${item.url})</h1>
                  <iframe class='flex-fill' src="${item.url}" width="100%" height="100%" frameborder="0" ></iframe>
              `;
        }
        else {

            contentBox!.replaceChildren();
            contentBox!.innerHTML = `
                  <h1 class='flex-top'>id: ${item.id}, name: ${item.name}, url: ${item.url}</h1>
                  
              `;
        }
    }
};
drawer.setOptions(options);
drawer.setData(drawerData as any);
drawer.render();
drawer.select('13');
options.onMenuItemClick!(drawerData.menuItems[0].subList![2]);