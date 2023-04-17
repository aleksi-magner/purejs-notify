type NotifyOptions = {
  class: string;
  additionalClasses: string;
  duration: number;
};

type MessageOptions = {
  message: string;
  state?: string;
  icon?: string;
};

class Notify {
  options: NotifyOptions;
  notificationWrap: HTMLDivElement | null;
  count: number;
  shownMessages: number[];
  timerID: number | undefined;

  constructor(options: NotifyOptions) {
    this.options = options;
    this.notificationWrap = null;
    this.count = 0;
    this.shownMessages = [];
    this.timerID = undefined;
  }

  show(element: HTMLDivElement): void {
    if (!this.notificationWrap) {
      this.notificationWrap = document.createElement('div');

      this.notificationWrap.classList.add(`${this.options.class}-wrap`);

      document.body.insertAdjacentElement(<InsertPosition>'afterBegin', this.notificationWrap);
    }

    this.notificationWrap.insertAdjacentElement(<InsertPosition>'afterBegin', element);
  }

  hide(element: HTMLDivElement): void {
    element.style.opacity = '0';

    const whenTransitionEnd = (): void => {
      (<HTMLDivElement>element.parentElement).removeChild(element);

      element.removeEventListener('transitionend', whenTransitionEnd);

      this.shownMessages = this.shownMessages.filter(
        (number: number): boolean => number !== this.count,
      );

      this.count -= 1;

      if (!this.shownMessages.length && this.notificationWrap) {
        document.body.removeChild(this.notificationWrap);

        this.notificationWrap = null;
        this.count = 0;
      }
    };

    element.addEventListener('transitionend', whenTransitionEnd);
  }

  render({ message, state, icon }: MessageOptions): void {
    const { class: stateClass, additionalClasses, duration } = this.options;

    const newMessages: HTMLDivElement = document.createElement('div');
    const notifyClass: string = stateClass;
    const classes: string[] = additionalClasses.split(' ').filter(Boolean);

    newMessages.classList.add(notifyClass, ...classes);

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

    clearTimeout(this.timerID);

    this.timerID = setTimeout((): void => {
      this.hide(newMessages);
    }, duration);
  }
}

type NotifyFunction = (message?: string) => void;

let $message: NotifyFunction = (): void => {};

let $success: NotifyFunction = (): void => {};

let $info: NotifyFunction = (): void => {};

let $warning: NotifyFunction = (): void => {};

let $error: NotifyFunction = (): void => {};

type InitOptions = {
  class?: string;
  additionalClasses?: string;
  duration?: number;
  state?: {
    success?: string;
    info?: string;
    warning?: string;
    error?: string;
  };
  icons?: {
    success?: string;
    info?: string;
    warning?: string;
    error?: string;
  };
};

const init = (options: InitOptions): void => {
  const notify: Notify = new Notify({
    class: options?.class || 'notify',
    additionalClasses: options?.additionalClasses || '',
    duration: options?.duration || 6000,
  });

  $message = (message?: string): void => {
    if (!message) {
      return;
    }

    notify.render(<MessageOptions>{
      message,
    });
  };

  $success = (message?: string): void => {
    if (!message) {
      return;
    }

    const { state, icons } = options;

    notify.render(<MessageOptions>{
      message,
      state: state?.success || '',
      icon: icons?.success || '',
    });
  };

  $info = (message?: string): void => {
    if (!message) {
      return;
    }

    const { state, icons } = options;

    notify.render(<MessageOptions>{
      message,
      state: state?.info || '',
      icon: icons?.info || '',
    });
  };

  $warning = (message?: string): void => {
    if (!message) {
      return;
    }

    const { state, icons } = options;

    notify.render(<MessageOptions>{
      message,
      state: state?.warning || '',
      icon: icons?.warning || '',
    });
  };

  $error = (message?: string): void => {
    if (!message) {
      return;
    }

    const { state, icons } = options;

    notify.render(<MessageOptions>{
      message,
      state: state?.error || '',
      icon: icons?.error || '',
    });
  };
};

export { init, $message, $success, $info, $warning, $error };
