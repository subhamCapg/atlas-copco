export default async function decorate(block) {
    const rows = [...block.children];
    block.textContent = '';
    const tabTitlesRow = rows[0];
    const cardRows = rows.slice(1); // all divs except first one
    const tabs = tabTitlesRow.textContent
        .split(',')
        .map(tab => tab.trim());


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

    block.append(tabContainer);
    tabs.forEach((tab, index) => {
        // Tab button
        const tabButton = document.createElement('button');
        tabButton.textContent = tab;
        tabButton.className = 'tab-btn';

        if (index === 0) {
            tabButton.classList.add('active');
        }

        tabNavs.append(tabButton);

        // Content panel
        const tabPanel = document.createElement('div');
        tabPanel.className = 'tab-panel';

        if (index === 0) {
            tabPanel.classList.add('active');
        }

        const cards = groupedCards[tab] || [];

        cards.forEach((card) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'tab-card';

            cardEl.innerHTML = `
      <div class="tab-card-image">
        ${card.image?.outerHTML || ''}
      </div>
      <div class="tab-card-content">
        <h3>${card.title}</h3>
        <p>${card.description}</p>
      </div>
     `;

            tabPanel.append(cardEl);
        });

        tabContent.append(tabPanel);

        // Tab click handler
        tabButton.addEventListener('click', () => {
            tabNavs.querySelectorAll('.tab-btn').forEach((btn) => {
                btn.classList.remove('active');
            });

            tabContent.querySelectorAll('.tab-panel').forEach((panel) => {
                panel.classList.remove('active');
            });

            tabButton.classList.add('active');
            tabPanel.classList.add('active');
        });
    });


}