export default async function decorate(block) {
    const rows = [...block.children];
    console.log('Rows:', rows);
    const spreadsheetPath = rows[0].textContent.trim().split('\n').pop();
    const response=fetch(`${spreadsheetPath}.json`).then((response) => response.json()).then((data) => {
        console.log('Data:', data);
        });
}