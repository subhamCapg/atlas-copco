export default async function decorate(block) {
    const rows = [...block.children];
    console.log('Rows:', rows);
}