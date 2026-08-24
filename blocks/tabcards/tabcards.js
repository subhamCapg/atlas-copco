export default async function decorate(block) {
    const rows = [...block.children];

    const tabTitlesRow = rows[0];
    const cardRows = rows.slice(1); // all divs except first one
    const tabs = tabTitlesRow.textContent.split(',');

    console.log(tabs);
    const cards = cardRows.map((card) => {
        const cells = [...card.children];

        return {
            image: cells[0]?.querySelector('picture'),
            title: cells[1]?.textContent.trim(),
            description: cells[2]?.textContent.trim(),
            tabName: cells[3]?.textContent.trim(),
        };
    });
    const groupedCards = {};

    cards.forEach((card) => {
        if (!groupedCards[card.tabName]) {
            groupedCards[card.tabName] = [];
        }

        groupedCards[card.tabName].push(card);
    });

    console.log(groupedCards);
    const tabContainer = document.createElement('div');
    tabContainer.className = 'tab-container';
    const tabNavs = document.createElement('div');
    tabNavs.className = 'tab-nav';
    const tabContent = document.createElement('div');
    tabContent.className = 'tabs-content';
    tabContainer.append(tabNavs, tabContent);
    
    tabs.forEach((tab, index) => {
        const tabButton = document.createElement('button');
        tabButton.textContent = tab;
        tabButton.className = 'tab-btn';
        tabNavs.append(tabButton);
    });



}