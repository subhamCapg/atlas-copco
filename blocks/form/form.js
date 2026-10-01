export default function decorate(block) {
  const rows = [...block.children];

  const data = {};

  rows.forEach((row) => {
    const cols = [...row.children];

    if (cols.length >= 2) {
      data[cols[0].textContent.trim()] = cols[1].textContent.trim();
    }
  });

  const form = document.createElement('form');
  form.className = 'form-content';

  const title = document.createElement('h2');
  title.textContent = data.title || 'Subscribe to our press release form';

  const description = document.createElement('p');
  description.className = 'form-description';
  description.textContent = data.description || '';

  const optionsWrapper = document.createElement('div');
  optionsWrapper.className = 'form-options';

  const infoTypes = document.createElement('div');
  infoTypes.className = 'form-column';

  const infoHeading = document.createElement('h5');
  infoHeading.textContent = 'Information Types';

  const financialLabel = document.createElement('label');
  const financialCheckbox = document.createElement('input');
  financialCheckbox.type = 'checkbox';
  financialCheckbox.name = 'informationtype';
  financialCheckbox.value = data.financialReportValue || '';

  financialLabel.append(financialCheckbox, document.createTextNode('Financial Reports'));

  const pressLabel = document.createElement('label');
  const pressCheckbox = document.createElement('input');
  pressCheckbox.type = 'checkbox';
  pressCheckbox.name = 'informationtype';
  pressCheckbox.value = data.pressReleaseValue || '';

  pressLabel.append(pressCheckbox, document.createTextNode('All Group Press Releases'));

  infoTypes.append(infoHeading, financialLabel, pressLabel);

  const languageCol = document.createElement('div');
  languageCol.className = 'form-column';

  const languageHeading = document.createElement('h5');
  languageHeading.textContent = 'Language';

  const englishLabel = document.createElement('label');
  const englishCheckbox = document.createElement('input');
  englishCheckbox.type = 'checkbox';
  englishCheckbox.name = 'language';
  englishCheckbox.value = 'en';

  englishLabel.append(englishCheckbox, document.createTextNode('English'));

  const swedishLabel = document.createElement('label');
  const swedishCheckbox = document.createElement('input');
  swedishCheckbox.type = 'checkbox';
  swedishCheckbox.name = 'language';
  swedishCheckbox.value = 'sv';

  swedishLabel.append(swedishCheckbox, document.createTextNode('Swedish'));

  languageCol.append(languageHeading, englishLabel, swedishLabel);

  optionsWrapper.append(infoTypes, languageCol);

  const personalHeading = document.createElement('h5');
  personalHeading.className = 'form-personal-heading';
  personalHeading.textContent = 'Personal Information';

  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'form-inputs';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Name';
  nameInput.name = 'name';

  const emailWrapper = document.createElement('div');

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = 'Email *';
  emailInput.name = 'email';

  const emailError = document.createElement('span');
  emailError.className = 'form-error-message';
  emailError.textContent = 'Email is required';
  emailError.hidden = true;

  emailWrapper.append(emailInput, emailError);

  inputWrapper.append(nameInput, emailWrapper);

  const consentWrapper = document.createElement('div');
  consentWrapper.className = 'form-consent';

  const consentText = document.createElement('p');
  consentText.textContent =
    'By submitting this request, Atlas Copco Group can use the provided information to contact you.';

  const consentLabel = document.createElement('label');

  const consentCheckbox = document.createElement('input');
  consentCheckbox.type = 'checkbox';
  consentCheckbox.name = 'privacy';

  consentLabel.append(
    consentCheckbox,
    document.createTextNode(
      ' I have read and accepted the privacy policy',
    ),
  );

  const consentError = document.createElement('span');
  consentError.className = 'form-error-message';
  consentError.textContent = 'Please accept the privacy policy';
  consentError.hidden = true;

  consentWrapper.append(
    consentText,
    consentLabel,
    consentError,
  );

  const captcha = document.createElement('div');
  captcha.className = 'ac-frc-captcha';

  captcha.textContent = 'Anti-Robot Verification';

  const submitBtn = document.createElement('button');
  submitBtn.className = 'form-submit';
  submitBtn.type = 'submit';
  submitBtn.textContent = data.buttonText || 'Subscribe';

  form.append(
    title,
    description,
    optionsWrapper,
    personalHeading,
    inputWrapper,
    consentWrapper,
    captcha,
    submitBtn,
  );

  block.replaceChildren(form);

  form.addEventListener('submit', (event) => {
    let valid = true;

    emailError.hidden = true;
    consentError.hidden = true;

    if (!emailInput.value.trim()) {
      emailError.hidden = false;
      valid = false;
    }

    if (!consentCheckbox.checked) {
      consentError.hidden = false;
      valid = false;
    }

    if (!valid) {
      event.preventDefault();
    }
  });
}
