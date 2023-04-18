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
  wrapper: HTMLDivElement | null;
  timerID: number | undefined;
  timers: number[];

  constructor(options: NotifyOptions) {
    this.options = options;
    this.wrapper = null;
    this.timerID = undefined;
    this.timers = [];
  }

  show(node: HTMLDivElement): void {
    if (!this.wrapper) {
      this.wrapper = document.createElement('div');

      this.wrapper.classList.add(`${this.options.class}-wrap`);

      document.body.insertAdjacentElement(<InsertPosition>'afterBegin', this.wrapper);
    }

    this.wrapper.insertAdjacentElement(<InsertPosition>'afterBegin', node);
  }

  hide(node: HTMLDivElement, timerID: number): void {
    node.style.opacity = '0';

    const whenTransitionEnd = (): void => {
      (<HTMLDivElement>node.parentElement).removeChild(node);

      clearTimeout(timerID);

      this.timers = this.timers.filter((id: number): boolean => id !== timerID);

      node.removeEventListener('transitionend', whenTransitionEnd);

      if (!this.timers.length && this.wrapper) {
        document.body.removeChild(this.wrapper);

        this.wrapper = null;
      }
    };

    node.addEventListener('transitionend', whenTransitionEnd);
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

    this.show(newMessages);

    const { timerID = 1 } = this;

    this.timerID = setTimeout((): void => {
      this.hide(newMessages, timerID);
    }, duration);

    this.timers.push(this.timerID);
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
      state: state?.success,
      icon: icons?.success,
    });
  };

  $info = (message?: string): void => {
    if (!message) {
      return;
    }

    const { state, icons } = options;

    notify.render(<MessageOptions>{
      message,
      state: state?.info,
      icon: icons?.info,
    });
  };

  $warning = (message?: string): void => {
    if (!message) {
      return;
    }

    const { state, icons } = options;

    notify.render(<MessageOptions>{
      message,
      state: state?.warning,
      icon: icons?.warning,
    });
  };

  $error = (message?: string): void => {
    if (!message) {
      return;
    }

    const { state, icons } = options;

    notify.render(<MessageOptions>{
      message,
      state: state?.error,
      icon: icons?.error,
    });
  };
};

export { init, $message, $success, $info, $warning, $error };
