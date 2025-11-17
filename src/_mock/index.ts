import { signIn } from './handlers/_user';
import { setupWorker } from 'msw/browser';

const handles = [signIn];
const worker = setupWorker(...handles);

export { worker };
