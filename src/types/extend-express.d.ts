type Locals = Record<string, unknown>;
type TurboStream = Record<TurboStreamActions, (target: string, options: StreamOptions) => void>;
type StreamOptions = {
  readonly partial?: string;
  readonly locals?: Locals;
}

export enum TurboStreamActions {
  append = 'append',
  prepend = 'prepend',
  replace = 'replace',
  update = 'update',
  remove = 'remove',
}

declare global {
  namespace Express {
    interface Response {
      turboStream: TurboStream
    }
  }
}