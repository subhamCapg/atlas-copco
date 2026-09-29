export default function decorate(block) {
  const rows = [...block.children];

  const tabNav = document.createElement('div');
  tabNav.className = 'tabs-nav';

  const tabContent = document.createElement('div');
  tabContent.className = 'tabs-content';

  rows.forEach((row, index) => {
    const cells = [...row.children];

    const tabTitle = cells[0]?.textContent.trim() || `Tab ${index + 1}`;
    const content = cells[1];

    const button = document.createElement('button');
    button.className = 'tab-btn';
    button.textContent = tabTitle;

    const panel = document.createElement('div');
    panel.className = 'tab-panel';
    panel.append(...content.childNodes);

    if (index === 0) {
      button.classList.add('active');
      panel.classList.add('active');
    }

    button.addEventListener('click', () => {
      tabNav.querySelectorAll('.tab-btn').forEach((btn) => {
        btn.classList.remove('active');
      });

      tabContent.querySelectorAll('.tab-panel').forEach((item) => {
        item.classList.remove('active');
      });

      button.classList.add('active');
      panel.classList.add('active');
    });

    tabNav.append(button);
    tabContent.append(panel);
  });

  block.replaceChildren(tabNav, tabContent);
}