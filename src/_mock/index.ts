import { signIn, signUp, mockTokenExpired } from './handlers/_auth';
import { getMenuList, createMenu, updateMenu } from './handlers/_menu';
import { setupWorker } from 'msw/browser';

const handles = [signIn, signUp, mockTokenExpired, getMenuList, createMenu, updateMenu];
const worker = setupWorker(...handles);

export { worker };
