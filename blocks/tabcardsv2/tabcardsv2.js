export default async function decorate(block) {
    const rows = [...block.children];
    console.log('Rows:', rows);
    const spreadsheetPath = rows[0].textContent.trim().split('/').filter(Boolean).pop();
    console.log('Spreadsheet Path:', spreadsheetPath);
    const response=fetch(`${spreadsheetPath}.json`).then((response) => response.json()).then((data) => {
        console.log('Data:', data);
        });
        block.innerHTML = '';
}