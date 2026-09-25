export async function decorate(block) {
  // Clear any existing content inside the block

  block.textContent = '';

  // Create elements
  const wrapperDiv = document.createElement('div');
  const button = document.createElement('button');
  const textSpan = document.createElement('span');

  // Configure wrapper div
  wrapperDiv.className = 'button cmp-button--primary';

  // Configure button
  button.id = 'button-5487aab983';
  button.type = 'button';
  button.className = 'cmp-button';

  // Configure text span
  textSpan.className = 'cmp-button__text';
  textSpan.textContent = 'Button';

  // Assemble the hierarchy
  button.append(textSpan);
  wrapperDiv.append(button);
  block.prepend(wrapperDiv);
}
