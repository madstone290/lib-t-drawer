import { ToggleDrawer } from "@/lib/t-drawer";


const drawerData = {
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
      icon: 'fa-solid fa-blog',
      name: 'Blog',
      subList: [
        { id: '31', name: `리눅스 분석`, url: 'https://netflixtechblog.com/linux-performance-analysis-in-60-000-milliseconds-accc10403c55' },
        { id: '32', name: `프로그래머 필독서`, url: 'https://www.sangkon.com/good_books_for_dev/' },
        { id: '33', name: `mes-service`, url: 'https://www.ge.com/digital/documentation/proficy-plant-applications/version82/common_service_docs/mes-service-impl-1.0.0-documentation.html#_overview' },
      ]
    },
    {
      id: '4', icon: 'fa fa-cubes', name: '데모',
      subList: [
        { name: `1` },
        { name: `2` },
        { name: `3` },
        { name: `4` },
        { name: `5` },
        { name: `6` },
        { name: `7` },
        { name: `8` },
      ]
    },
    {
      id: '5', icon: 'fa fa-cubes', name: '데모',
      subList: [
        { name: `1` },
        { name: `2` },
        { name: `3` },
        { name: `4` },
        { name: `5` },
        { name: `6` },
        { name: `7` },
        { name: `8` },
      ]
    },
    {
      id: '6', icon: 'fa fa-cubes', name: '데모',
      subList: [
        { name: `1` },
        { name: `2` },
        { name: `3` },
        { name: `4` },
        { name: `5` },
        { name: `6` },
        { name: `7` },
        { name: `8` },
      ]
    },
    {
      id: '7', icon: 'fa fa-cubes', name: '데모',
      subList: [
        { name: `1` },
        { name: `2` },
        { name: `3` },
        { name: `4` },
        { name: `5` },
        { name: `6` },
        { name: `7` },
        { name: `8` },
      ]
    },
    {
      id: '8', icon: 'fa fa-cubes', name: '데모',
      subList: [
        { name: `1` },
        { name: `2` },
        { name: `3` },
        { name: `4` },
        { name: `5` },
        { name: `6` },
        { name: `7` },
        { name: `8` },
      ]
    },
    {
      id: '9', icon: 'fa fa-cubes', name: '데모',
      subList: [
        { name: `1` },
        { name: `2` },
        { name: `3` },
        { name: `4` },
        { name: `5` },
        { name: `6` },
        { name: `7` },
        { name: `8` },
      ]
    },
    {
      id: '10', icon: 'fa fa-cubes', name: '데모',
      subList: [
        { name: `1` },
        { name: `2` },
        { name: `3` },
        { name: `4` },
        { name: `5` },
        { name: `6` },
        { name: `7` },
        { name: `8` },
      ]
    },


  ]
};
const container = document.querySelector('.drawer-container') as HTMLElement;
const contentBox = document.querySelector('.content-box');
const drawer = ToggleDrawer();
drawer.create(container);
drawer.setOptions({
  singleSelect: true,
  showToggleBtn: true,
  onModeChanged: (isMini: any) => {
    if (isMini) {
      document.documentElement.style.setProperty('--drawer-width', '70px');
    } else {
      document.documentElement.style.setProperty('--drawer-width', '300px');
    }
  },
  renderCustomMenuItemContent: (box: any, item: any, level: any) => {
    const contentEl = document.createElement('div');
    contentEl.classList.add('td-menu-item-anchor');

    const icon = document.createElement('i');
    icon.className = item.icon;
    icon.style.marginRight = '10px';
    contentEl.appendChild(icon);

    const label = document.createElement('span');
    label.innerText = item.name;
    label.className = 'menu-item-label'
    contentEl.appendChild(label);

    contentEl.addEventListener("click", function () {
      console.log(item);
      contentBox!.replaceChildren();
      contentBox!.innerHTML = `
                    <h1 class='flex-top'>${item.name} (${item.url})</h1>
                    <iframe class='flex-fill' src="${item.url}" width="100%" height="100%" frameborder="0" ></iframe>
                `;
    });

    box.appendChild(contentEl);
    return contentEl;
  }
} as any);
drawer.setData(drawerData as any);
drawer.render();
drawer.select('2-1-2');
drawer.changeMode(false);