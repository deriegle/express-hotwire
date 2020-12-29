import { buildMiddleware, TurboStream } from './lib/hotwire-middleware';

export default buildMiddleware;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Response {
      turboStream: TurboStream;
    }
  }
}
