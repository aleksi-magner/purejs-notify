class Notify {
  constructor(options) {
    this.options = options;
    this.notificationWrap = null;
    this.count = 0;
    this.shownMessages = [];
  }

  show(element) {
    if (!this.notificationWrap) {
      this.notificationWrap = document.createElement('div');

      this.notificationWrap.classList.add(`${this.options.class}-wrap`);
      document.body.insertAdjacentElement('afterBegin', this.notificationWrap);
    }

    this.notificationWrap.insertAdjacentElement('afterBegin', element);
  }

  hide(element) {
    element.style.opacity = '0';

    const whenTransitionEnd = () => {
      element.parentElement.removeChild(element);
      element.removeEventListener('transitionend', whenTransitionEnd);

      this.shownMessages = this.shownMessages.filter(number => number !== this.count);
      this.count -= 1;

      if (!this.shownMessages.length && this.notificationWrap) {
        document.body.removeChild(this.notificationWrap);

        this.notificationWrap = null;
        this.count = 0;
      }
    };

    element.addEventListener('transitionend', whenTransitionEnd);
  }

  render({ message, state, icon }) {
    const newMessages = document.createElement('div');
    const notifyClass = this.options.class;
    const additionalClasses = this.options.additionalClasses.split(' ').filter(Boolean);

    newMessages.classList.add(notifyClass, ...additionalClasses);

    if (state) {
      newMessages.classList.add(`${notifyClass}--${state}`);
    }

    if (icon) {
      newMessages.innerHTML = `
      <i class="${notifyClass}__icon ${icon}"></i>
      <span class="${notifyClass}__body">${message}</span>
    `;
    } else {
      newMessages.textContent = message;
    }

    this.count += 1;

    this.shownMessages.push(this.count);

    this.show(newMessages);

    setTimeout(this.hide.bind(this, newMessages), this.options.duration);
    clearTimeout(this.hide);
  }
}

let $message = () => {};

let $success = () => {};

let $info = () => {};

let $warning = () => {};

let $error = () => {};

const init = options => {
  const notify = new Notify({
    class: options?.class || 'notify',
    additionalClasses: options?.additionalClasses || '',
    duration: options?.duration || 6000,
  });

  $message = message =>
    notify.render({
      message,
    });

  $success = message =>
    notify.render({
      message,
      state: options?.state?.success || '',
      icon: options?.icons?.success || '',
    });

  $info = message =>
    notify.render({
      message,
      state: options?.state?.info || '',
      icon: options?.icons?.info || '',
    });

  $warning = message =>
    notify.render({
      message,
      state: options?.state?.warning || '',
      icon: options?.icons?.warning || '',
    });

  $error = message =>
    notify.render({
      message,
      state: options?.state?.error || '',
      icon: options?.icons?.error || '',
    });
};

export { init, $message, $success, $info, $warning, $error };
