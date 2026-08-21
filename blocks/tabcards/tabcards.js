export default async function decorate(block) {
    const rows = [...block.children];
    console.log("rows", rows);
    // Extract the text content safely
    // const firstTexts = rows.map(row => row.children[0]?.innerText || "");

    // console.log(firstTexts);

    const tabTitles = [...document.querySelectorAll('.block')]
        .map(block => block.children[0]?.textContent.trim());

    console.log(tabTitles);

}