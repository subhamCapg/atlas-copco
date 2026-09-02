export default function decorate(block) {
    const rows = [...block.children];
    const teaserTitle = rows[0]?.querySelector('div')?.textContent;
    block.textContent = '';
    block.append(teaserTitle);
}