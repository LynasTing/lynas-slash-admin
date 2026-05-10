import auth from './jsons/auth.json';
import sys from './jsons/sys.json';
import common from './jsons/common.json';
import dashboard from './jsons/dashboard.json';
import ui from './jsons/ui.json';
import pages from './jsons/pages.json';

export default {
  ...auth,
  ...sys,
  ...common,
  ...dashboard,
  ...ui,
  ...pages
};
