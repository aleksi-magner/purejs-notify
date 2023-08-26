type NotifyOptions = {
  class: string;
  additionalClasses: string;
  duration: number;
  state: {
    success?: string;
    info?: string;
    warning?: string;
    error?: string;
  };
  icons: {
    success?: string;
    info?: string;
    warning?: string;
    error?: string;
  };
};

export type InitOptions = {
  [Property in keyof NotifyOptions]?: NotifyOptions[Property];
};

const notifyOptions: NotifyOptions = {
  class: 'notify',
  additionalClasses: '',
  duration: 6000,
  state: {},
  icons: {},
};

export const init = (options: InitOptions): void => {
  if (options?.class) {
    notifyOptions.class = options.class;
  }

  if (options?.additionalClasses) {
    notifyOptions.additionalClasses = options.additionalClasses;
  }

  if (options?.duration) {
    notifyOptions.duration = options.duration;
  }

  if (options?.state) {
    notifyOptions.state = options.state;
  }

  if (options?.icons) {
    notifyOptions.icons = options.icons;
  }
};

let wrapper: HTMLDivElement | null = null;
let timerID: number | undefined = undefined;
let timers: number[] = [];

const show = (node: HTMLDivElement): void => {
  if (!wrapper) {
    wrapper = document.createElement('div');

    wrapper.classList.add(`${notifyOptions.class}-wrap`);

    document.body.insertAdjacentElement(<InsertPosition>'afterBegin', wrapper);
  }

  wrapper.insertAdjacentElement(<InsertPosition>'afterBegin', node);
};

const hide = (node: HTMLDivElement, timer: number): void => {
  node.style.opacity = '0';

  const whenTransitionEnd = (): void => {
    (<HTMLDivElement>node.parentElement).removeChild(node);

    window.clearTimeout(timer);

    timers = timers.filter((id: number): boolean => id !== timer);

    node.removeEventListener('transitionend', whenTransitionEnd);

    if (!timers.length && wrapper) {
      document.body.removeChild(wrapper);

      wrapper = null;
    }
  };

  node.addEventListener('transitionend', whenTransitionEnd);
};

type messageType = 'success' | 'info' | 'warning' | 'error';

const render = (message: string, type?: messageType): void => {
  const { class: stateClass, additionalClasses, duration, state, icons } = notifyOptions;

  const newMessages: HTMLDivElement = document.createElement('div');

  const classes: string[] = additionalClasses.split(' ').filter(Boolean);

  newMessages.classList.add(stateClass, ...classes);

  if (type && Object.prototype.hasOwnProperty.call(state, type)) {
    newMessages.classList.add(`${stateClass}--${state[type]}`);
  }

  if (type && Object.prototype.hasOwnProperty.call(icons, type)) {
    newMessages.innerHTML = `
      <i class="${stateClass}__icon ${icons[type]}"></i>
      <span class="${stateClass}__body">${message}</span>
    `;
  } else {
    newMessages.textContent = message;
  }

  show(newMessages);

  const temporaryTimer: number = timerID ?? 1;

  timerID = window.setTimeout((): void => {
    hide(newMessages, temporaryTimer);
  }, duration);

  timers.push(timerID);
};

export const $message = (message?: string): void => {
  if (!message) {
    return;
  }

  render(message);
};

export const $success = (message?: string): void => {
  if (!message) {
    return;
  }

  render(message, 'success');
};

export const $info = (message?: string): void => {
  if (!message) {
    return;
  }

  render(message, 'info');
};

export const $warning = (message?: string): void => {
  if (!message) {
    return;
  }

  render(message, 'warning');
};

export const $error = (message?: string): void => {
  if (!message) {
    return;
  }

  render(message, 'error');
};
