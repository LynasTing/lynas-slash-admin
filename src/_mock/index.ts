import { signIn, signUp } from './handlers/_user';
import { setupWorker } from 'msw/browser';

const handles = [signIn, signUp];
const worker = setupWorker(...handles);

export { worker };
