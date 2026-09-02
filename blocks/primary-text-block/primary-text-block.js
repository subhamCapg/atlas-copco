export default function decorate(block) {
    const rows = [...block.children];

    const textContent = rows[0];
    const typeScale = rows[1]?.textContent?.trim();
    const textAlignment = rows[2]?.textContent?.trim();

    block.innerHTML = '';


    if (typeScale) block.classList.add(typeScale);
    if (textAlignment) block.classList.add(textAlignment);


    block.append(textContent);
}



