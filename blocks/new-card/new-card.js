import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const image = block.querySelector('picture img');

  if (image) {
    image.closest('picture').replaceWith(
      createOptimizedPicture(
        image.src,
        image.alt,
        false,
        [{ width: '750' }]
      )
    );
  }
}