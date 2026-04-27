import { signIn, signUp, mockTokenExpired } from './handlers/_auth';
import { setupWorker } from 'msw/browser';

const handles = [signIn, signUp, mockTokenExpired];
const worker = setupWorker(...handles);

export { worker };
