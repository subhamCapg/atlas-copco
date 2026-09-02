export default function decorate(block) {
  const rows = [...block.children];
  const [imageRow, altRow, linkRow, logoRow] = rows;

  const img = imageRow?.querySelector('img');
  const altText = altRow?.textContent.trim();
  const linkElement = linkRow?.querySelector('a');
  let linkHref = linkElement
    ? linkElement.getAttribute('href')
    : linkRow?.textContent.trim();

  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  const imgSrc = img?.getAttribute('src')?.toLowerCase() || '';
  const isInvalidType =
    img && !allowedExtensions.some(ext => imgSrc.includes(`.${ext}`));

  if (img && (!altText || isInvalidType)) {
    const errorMsg = !altText
      ? '⚠️ Alt text is required.'
      : `⚠️ Unsupported image type. Please use JPG, PNG, or WebP (Found: ${
          imgSrc.split('.').pop().split('?')[0]
        })`;

    block.innerHTML = `
      <div style="border:2px dashed red;padding:15px;color:red;font-family:sans-serif">
        <strong>Block Error:</strong> ${errorMsg}
      </div>`;
    return;
  }

  if (img) img.alt = altText;

  const picture = img?.closest('picture') || img;
  const parent = picture?.parentNode;
  let imageContainer = picture;

  if (img && linkHref) {
    if (!linkHref.startsWith('/') && !linkHref.startsWith('http')) {
      linkHref = `https://${linkHref}`;
    }

    const wrapper = document.createElement('a');
    wrapper.href = linkHref;

    if (linkHref.startsWith('http')) {
      wrapper.target = '_blank';
      wrapper.rel = 'noopener noreferrer';
    }

    parent.insertBefore(wrapper, picture);
    wrapper.appendChild(picture);

    imageContainer = wrapper; 
  }

  const logoMedia = logoRow?.querySelector('picture, img');

  if (logoMedia && imageContainer) {
    const logoWrap = document.createElement('div');
    logoWrap.className = 'logo-wrap';

    logoWrap.appendChild(logoMedia);
    imageContainer.appendChild(logoWrap);

    imageContainer.classList.add('has-logo');
    
  }

  altRow?.remove();
  linkRow?.remove();
}