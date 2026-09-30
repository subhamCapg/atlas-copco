export default function decorate(block) {
  const form = block.querySelector('form');

  if (!form) return;

  const emailField = block.querySelector(
    'input[name="email"]'
  );

  const privacyCheckbox = block.querySelector(
    'input[type="checkbox"][name="privacy"]'
  );

  const emailError = block.querySelector(
    '.email-error'
  );

  const privacyError = block.querySelector(
    '.privacy-error'
  );

  const successMessage = block.querySelector(
    '.form-success'
  );

  const errorMessage = block.querySelector(
    '.form-error'
  );

  if (successMessage) {
    successMessage.hidden = true;
  }

  if (errorMessage) {
    errorMessage.hidden = true;
  }

  const params = new URLSearchParams(
    window.location.search
  );

  const status = params.get('status');

  if (
    status === 'success'
    && successMessage
  ) {
    successMessage.hidden = false;

    successMessage.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  if (
    status === 'error'
    && errorMessage
  ) {
    errorMessage.hidden = false;

    errorMessage.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  form.addEventListener(
    'submit',
    (event) => {
      let valid = true;

      if (emailError) {
        emailError.hidden = true;
      }

      if (privacyError) {
        privacyError.hidden = true;
      }

      if (
        !emailField
        || !emailField.value.trim()
      ) {
        valid = false;

        if (emailError) {
          emailError.hidden = false;
        }
      }

      if (
        !privacyCheckbox
        || !privacyCheckbox.checked
      ) {
        valid = false;

        if (privacyError) {
          privacyError.hidden = false;
        }
      }

      if (!valid) {
        event.preventDefault();
      }
    }
  );

  const captchaContainer =
    block.querySelector(
      '.ac-frc-captcha'
    );

  if (
    captchaContainer
    && typeof friendlyChallenge !== 'undefined'
  ) {
    const sitekey =
      captchaContainer.dataset.sitekey;

    const language =
      captchaContainer.dataset.lang
      || 'en';

    if (
      captchaContainer.children.length === 0
    ) {
      new friendlyChallenge.WidgetInstance(
        captchaContainer,
        {
          sitekey,
          language,
        },
      );
    }
  }
}