# Pure JS notify plugin

## Installing

```shell
npm i purejs-notify
```

or

```shell
yarn add purejs-notify
```

## Options

### class

* Type: String
* Default: 'notify'

Main CSS class used for styling.

### additionalClasses

* Type: String
* Default: ''

Additional CSS classes used for styling. Are added to the root element of each notification.

Example classes for styling: `class-1 class-2 class-3`.

### duration

* Type: Number
* Default: 6000

Notification display time in milliseconds.

### state

* Type: Object
* Default: null

CSS class modifier names for various notification states used in styling.

Supported options: `success`, `info`, `warning`, `error`.

Example classes for styling: `.notify--success`, `.notify--info`, `.notify--warning`, `.notify--error`.

Config example

```javascript
state: {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
},
```

### icons

* Type: Object
* Default: null

CSS classes from the icon library used for various notification states.

Supported options: `success`, `info`, `warning`, `error`.

Config example

```javascript
icons: {
  success: 'vi vi-done icon-lg',
  info: 'vi vi-info icon-lg',
  warning: 'vi vi-warning icon-lg',
  error: 'vi vi-error icon-lg',
},
```

## Stylization

By default, only basic styles and padding are set, without affecting the different states of notifications. You can either use the default styles and add your own styles for different notification states, or style it completely on your own for the needs of the project.

## Init

```javascript
// app/config/notify.js
import { init } from 'purejs-notify';

// Include the core styling file
import 'purejs-notify/dist/style.css';

init({
  class: 'my-notify',
  additionalClasses: 'class-1 class-2 class-3',
  duration: 5000,
  state: {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
  },
  icons: {
    success: 'vi vi-done icon-lg',
    info: 'vi vi-info icon-lg',
    warning: 'vi vi-warning icon-lg',
    error: 'vi vi-error icon-lg',
  },
});

// main.js
import './config/notify';
```

## Usage

```javascript
import { $message, $success, $info, $warning, $error } from 'purejs-notify';

$message('Simple message');
$success('Success message');
$info('Info message');
$warning('Warning message');
$error('Error message');
```

![](https://github.com/aleksi-magner/notify/blob/master/example.jpg)

## Good Boy License

We’ve released notify plugin either under MIT or the Good Boy License. We invented it. Please do _whatever your mom would approve of:_

* Download
* Change
* Fork
