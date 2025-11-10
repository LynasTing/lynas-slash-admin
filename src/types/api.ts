import type { ResultStatusEnum } from './enum';

export interface Api<T = unknown> {
  status: ResultStatusEnum;
  message: string;
  data: T;
}
