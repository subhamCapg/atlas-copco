export default async function decorate(block) {
    const rows = [...block.children];
    console.log('Rows:', rows);
    const spreadsheetPath = rows[0].textContent.trim().split('/').filter(Boolean).pop();
    console.log('Spreadsheet Path:', spreadsheetPath);

    const res = await fetch(`${spreadsheetPath}.json`);
    const data = await res.json();
    console.log('Data:', data);
    block.innerHTML = '';
    const tabTitles = data[':names'];
    console.log('Tab Titles:', tabTitles);

    /*
     * Main tab container
     */
    const tabContainer = document.createElement('div');
    tabContainer.className = 'tab-container';

    /*
     * Tab navigation
     */
    const tabNavs = document.createElement('div');
    tabNavs.className = 'tab-nav';

    /*
     * Tab content
     */
    const tabContent = document.createElement('div');
    tabContent.className = 'tabs-content';

    /*
     * Build tabs from tabtitles
     */
    tabTitles.forEach((tabTitle, index) => {
        /*
         * -----------------------------------------
         * TAB BUTTON
         * -----------------------------------------
         */
        const tabButton = document.createElement('button');

        tabButton.type = 'button';
        tabButton.className = 'tab-btn';
        tabButton.textContent = tabTitle;

        /*
         * First tab active by default
         */
        if (index === 0) {
            tabButton.classList.add('active');
        }

        tabNavs.append(tabButton);

        /*
         * -----------------------------------------
         * TAB PANEL
         * -----------------------------------------
         */
        const tabPanel = document.createElement('div');
        tabPanel.className = 'tab-panel';

        if (index === 0) {
            tabPanel.classList.add('active');
        }

        /*
         * Get the data for this tab.
         *
         * Example:
         *
         * data["Latest Blogs"].data
         */
        const tabData = data?.[tabTitle]?.data || [];

        console.log(`Cards for ${tabTitle}:`, tabData);

        /*
         * -----------------------------------------
         * CREATE CARDS
         * -----------------------------------------
         */
        tabData.forEach((cardData) => {
            const card = document.createElement('div');
            card.className = 'tab-card';

            /*
             * -----------------------------------------
             * IMAGE
             * -----------------------------------------
             */
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'tab-card-image';

            if (cardData['Image Path']) {
                const picture = document.createElement('picture');

                const image = document.createElement('img');

                image.src = cardData['Image Path'];
                image.alt = cardData['Card Title'] || '';
                image.loading = index === 0 ? 'eager' : 'lazy';

                picture.append(image);
                imageWrapper.append(picture);
            }

            /*
             * -----------------------------------------
             * TAB NAME
             * -----------------------------------------
             *
             * Keep this because it is part of the
             * desired structure.
             */
            const tabName = document.createElement('div');
            tabName.className = 'tab-card-tab-name';
            tabName.hidden = true;

            const tabNameParagraph = document.createElement('p');
            tabNameParagraph.textContent = tabTitle;

            tabName.append(tabNameParagraph);

            /*
             * -----------------------------------------
             * CARD CONTENT
             * -----------------------------------------
             */
            const cardContent = document.createElement('div');
            cardContent.className = 'tab-card-content';

            /*
             * Card title
             */
            const cardTitle = document.createElement('div');
            cardTitle.className = 'tab-card-title';

            const titleParagraph = document.createElement('p');
            titleParagraph.textContent = cardData['Card Title'] || '';

            cardTitle.append(titleParagraph);

            /*
             * Card description
             */
            const cardDescription = document.createElement('div');
            cardDescription.className = 'tab-card-description';

            const descriptionParagraph = document.createElement('p');
            descriptionParagraph.textContent =
                cardData['Card Description'] || '';

            cardDescription.append(descriptionParagraph);

            cardContent.append(
                cardTitle,
                cardDescription
            );

            /*
             * -----------------------------------------
             * REDIRECTION LINK
             * -----------------------------------------
             *
             * If Redirection Link exists, make the
             * complete card clickable.
             */
            if (cardData['Redirection Link']) {
                card.classList.add('has-link');

                card.addEventListener('click', () => {
                    window.location.href =
                        cardData['Redirection Link'];
                });
            }

            /*
             * -----------------------------------------
             * BUILD CARD
             * -----------------------------------------
             */
            card.append(
                imageWrapper,
                tabName,
                cardContent
            );

            tabPanel.append(card);
        });

        /*
         * Add panel to tabs content
         */
        tabContent.append(tabPanel);

        /*
         * -----------------------------------------
         * TAB CLICK HANDLER
         * -----------------------------------------
         */
        tabButton.addEventListener('click', () => {
            /*
             * Remove active from all buttons
             */
            tabNavs
                .querySelectorAll('.tab-btn')
                .forEach((button) => {
                    button.classList.remove('active');
                });

            /*
             * Remove active from all panels
             */
            tabContent
                .querySelectorAll('.tab-panel')
                .forEach((panel) => {
                    panel.classList.remove('active');
                });

            /*
             * Activate selected tab
             */
            tabButton.classList.add('active');
            tabPanel.classList.add('active');
        });
    });


    tabContainer.append(
        tabNavs,
        tabContent
    );

    const wrapperDiv = document.createElement('div');
  const button = document.createElement('button');
  const textSpan = document.createElement('span');

  // Configure wrapper div
  wrapperDiv.className = 'button cmp-button--primary';

  // Configure button
  button.id = 'button-5487aab983';
  button.type = 'button';
  button.className = 'cmp-button';

  // Configure text span
  textSpan.className = 'cmp-button__text';
  textSpan.textContent = 'Button';

  // Assemble the hierarchy
  button.append(textSpan);
  wrapperDiv.append(button);

    block.append(tabContainer, wrapperDiv);


}