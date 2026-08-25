export default async function decorate(block) {
    const rows = [...block.children];
    console.log('Rows:', rows);
    const spreadsheetPath = rows[0].textContent.trim().split('/').filter(Boolean).pop();
    console.log('Spreadsheet Path:', spreadsheetPath);

    const res = await fetch(`${spreadsheetPath}.json`);
    const data = await res.json();
    console.log('Data:', data);
    block.innerHTML = '';
    console.log('Responseee:', data);

}