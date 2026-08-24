export default async function decorate(block) {
    const rows = [...block.children];

    /*
     * First row contains the tab titles.
     *
     * IMPORTANT:
     * Keep the original row in the DOM because Universal Editor
     * may use it for authoring.
     */
    const tabTitlesRow = rows[0];

    /*
     * All remaining rows are individual franklin/item resources.
     */
    const cardRows = rows.slice(1);

    /*
     * Read tab names from the authored field.
     */
    const tabs = tabTitlesRow.textContent
        .split(',')
        .map((tab) => tab.trim())
        .filter(Boolean);

    console.log('Tabs:', tabs);

    /*
     * Instead of converting the fields into strings, keep references
     * to the ORIGINAL DOM elements.
     *
     * This is important for Universal Editor authoring.
     */
    const cards = cardRows.map((card) => {
        const cells = [...card.children];

        return {
            resource: card,

            image: cells[0]?.querySelector('picture'),
            imageCell: cells[0],

            title: cells[1],
            titleText: cells[1]?.textContent.trim(),

            description: cells[2],
            descriptionText: cells[2]?.textContent.trim(),

            tabName: cells[3]?.textContent.trim(),
            tabNameElement: cells[3],
        };
    });

    /*
     * Group cards according to tab name.
     */
    const groupedCards = {};

    cards.forEach((card) => {
        if (!groupedCards[card.tabName]) {
            groupedCards[card.tabName] = [];
        }

        groupedCards[card.tabName].push(card);
    });

    console.log('Grouped cards:', groupedCards);

    /*
     * Create the visual tab structure.
     */
    const tabContainer = document.createElement('div');
    tabContainer.className = 'tab-container';

    const tabNavs = document.createElement('div');
    tabNavs.className = 'tab-nav';

    const tabContent = document.createElement('div');
    tabContent.className = 'tabs-content';

    tabContainer.append(tabNavs, tabContent);

    /*
     * Create each tab.
     */
    tabs.forEach((tab, index) => {

        /*
         * ---------------------------------------------
         * TAB BUTTON
         * ---------------------------------------------
         */
        const tabButton = document.createElement('button');

        tabButton.type = 'button';
        tabButton.className = 'tab-btn';

        /*
         * Use the existing authored tab title text.
         */
        tabButton.textContent = tab;

        if (index === 0) {
            tabButton.classList.add('active');
        }

        tabNavs.append(tabButton);

        /*
         * ---------------------------------------------
         * TAB PANEL
         * ---------------------------------------------
         */
        const tabPanel = document.createElement('div');
        tabPanel.className = 'tab-panel';

        if (index === 0) {
            tabPanel.classList.add('active');
        }

        /*
         * Get cards belonging to this tab.
         */
        const cardsForTab = groupedCards[tab] || [];

        cardsForTab.forEach((card) => {

            /*
             * IMPORTANT:
             *
             * We do NOT do:
             *
             * cardEl.innerHTML = `...`;
             *
             * because that creates completely new DOM nodes.
             *
             * Instead, we keep the original franklin/item resource
             * and move its existing authored fields into the visual
             * structure.
             */

            const cardEl = card.resource;

            /*
             * Preserve the Universal Editor resource.
             *
             * Add your visual class instead of replacing the element.
             */
            cardEl.classList.add('tab-card');

            /*
             * ---------------------------------------------
             * IMAGE
             * ---------------------------------------------
             */
            if (card.imageCell) {
                card.imageCell.classList.add('tab-card-image');
            }

            /*
             * ---------------------------------------------
             * CONTENT
             * ---------------------------------------------
             */
            const cardContent = document.createElement('div');
            cardContent.className = 'tab-card-content';

            /*
             * Move the ORIGINAL title element.
             *
             * Do NOT use:
             *
             * card.titleText
             *
             * and do NOT create:
             *
             * <h3>${card.titleText}</h3>
             *
             * because that breaks the UE authored element.
             */
            if (card.title) {
                card.title.classList.add('tab-card-title');

                cardContent.append(card.title);
            }

            /*
             * Move the ORIGINAL description element.
             */
            if (card.description) {
                card.description.classList.add('tab-card-description');

                cardContent.append(card.description);
            }

            /*
             * Add the content wrapper to the original card.
             */
            cardEl.append(cardContent);

            /*
             * The tabName field is only being used for grouping.
             *
             * We don't need to display it visually.
             *
             * IMPORTANT:
             * We are NOT deleting it because it can still be needed
             * by Universal Editor for authoring.
             */
            if (card.tabNameElement) {
                card.tabNameElement.classList.add('tab-card-tab-name');
                card.tabNameElement.hidden = true;
            }

            /*
             * Add the existing resource to the tab panel.
             */
            tabPanel.append(cardEl);
        });

        /*
         * Add the panel to the tab content.
         */
        tabContent.append(tabPanel);

        /*
         * ---------------------------------------------
         * TAB CLICK
         * ---------------------------------------------
         */
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

    /*
     * ---------------------------------------------
     * INSERT DECORATED STRUCTURE
     * ---------------------------------------------
     *
     * IMPORTANT:
     *
     * We don't use:
     *
     * block.innerHTML = '';
     *
     * because that would destroy the Universal Editor
     * authored DOM.
     *
     * Instead, we append our visual structure while
     * preserving the original resources.
     */
    block.prepend(tabContainer);

    /*
     * Hide the original tab-title row visually instead of deleting it.
     *
     * Universal Editor can still find the authored element.
     */
    if (tabTitlesRow) {
        tabTitlesRow.classList.add('tab-titles-source');
    }
}