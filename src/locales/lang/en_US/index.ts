import auth from './jsons/auth.json';
import sys from './jsons/sys.json';
import common from './jsons/common.json';

export default {
  ...auth,
  ...sys,
  ...common
};
