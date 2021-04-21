import button from './en-US/button';
import menu from './en-US/menu';
import message from './en-US/message';
import tooltip from './en-US/tooltip';

export default {
  'empty': 'empty',
  'app.global.menu.notfound': 'Not Found',
  'app.global.form.validatefields.catch': 'The validation did not pass, please check the input',
  ...menu,
  ...button,
  ...message,
  ...tooltip
};