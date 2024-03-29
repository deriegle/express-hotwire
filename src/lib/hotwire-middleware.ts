import { NextFunction, Request, Response } from 'express';

export enum MiddlewareWriteMode {
  SEND,
  WRITE,
}

type TurboStreamActionResponseHandler = (
  target: string,
  options?: StreamOptions,
  mode?: MiddlewareWriteMode
) => Promise<void>;

/**
 * Object that is added to the Response object when using the expressHotwire middleware.
 * It can be used to send turbo stream responses.
 *
 * ```js
 * const expressHotwire = require('express-hotwire');
 *
 * app.use(expressHotwire());
 *
 * app.post('/messages', (req, res) => {
 *  res.turboStream.append('messages', {
 *    partial: 'messages/show',
 *    locals: {
 *      message: {
 *        id: 1,
 *        content: 'My new message',
 *      }
 *    }
 *  });
 * });
 * ```
 */
type TurboStream = Record<TurboStreamActions, TurboStreamActionResponseHandler>;

type MultipleTurboStreams = (
  cb: (turboStream: TurboStream) => Promise<void>[]
) => Promise<void>;

export type TurboStreamWithMultiple = TurboStream & {
  multiple: MultipleTurboStreams;
};

enum ResponseWriteMode {
  WRITE,
  SEND,
}

type Locals = Record<string, unknown>;

interface PartialStreamOptions {
  readonly content?: never;
  readonly partial: string;
  readonly locals?: Locals;
}

interface ContentStreamOptions {
  readonly content: string;
  readonly partial?: never;
  readonly locals?: never;
}

type StreamOptions = PartialStreamOptions | ContentStreamOptions;

enum TurboStreamActions {
  append = 'append',
  prepend = 'prepend',
  replace = 'replace',
  update = 'update',
  remove = 'remove',
}

/**
 * @ignore
 */
const render = (
  res: Response,
  partial: string,
  locals?: Locals
): Promise<string> => {
  return new Promise((resolve, reject) => {
    res.render(partial, locals, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};

const isContentStreamOptions = (
  options: StreamOptions
): options is ContentStreamOptions => {
  return typeof (options as ContentStreamOptions).content === 'string';
};

const getContentFromOptions = async (
  res: Response,
  options?: StreamOptions
): Promise<string> => {
  if (!options) return '';

  if (isContentStreamOptions(options)) {
    return options.content;
  } else {
    return render(res, options.partial, options.locals);
  }
};

/**
 * @ignore
 */
const stream = async (
  res: Response,
  target: string,
  action: TurboStreamActions,
  options?: StreamOptions
) => {
  const content = await getContentFromOptions(res, options);

  return `
  <turbo-stream action="${action}" target="${target}">
    <template>
${content}
    </template>
  </turbo-stream>
  `;
};

/**
 * Express Middleware function used to add turboStream object to the Response for sending
 * turbo stream responses.
 *
 * After using this middleware you should have access to the res.turboStream object
 *
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
export const middleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const streamActionHandler =
    (
      action: TurboStreamActions,
      writeMode: ResponseWriteMode
    ): TurboStreamActionResponseHandler =>
    async (target: string, options?: StreamOptions) => {
      res.setHeader('Content-Type', ['text/vnd.turbo-stream.html']);

      const responseMethod =
        writeMode == ResponseWriteMode.SEND ? res.send : res.write;

      responseMethod(await stream(res, target, action, options));
    };

  const createTurboStream = (writeMode: ResponseWriteMode): TurboStream => ({
    append: streamActionHandler(TurboStreamActions.append, writeMode),
    prepend: streamActionHandler(TurboStreamActions.prepend, writeMode),
    replace: streamActionHandler(TurboStreamActions.replace, writeMode),
    update: streamActionHandler(TurboStreamActions.update, writeMode),
    remove: streamActionHandler(TurboStreamActions.remove, writeMode),
  });

  const turboStream = createTurboStream(ResponseWriteMode.SEND);

  const turboStreamWithMultiple: TurboStreamWithMultiple = {
    ...turboStream,
    multiple: async (callback) => {
      await Promise.all(callback(createTurboStream(ResponseWriteMode.WRITE)));
      res.end();
    },
  };

  res.turboStream = turboStreamWithMultiple;

  next();
};

/**
 * This function is the default export from this library and is to be used when calling `app.use`.
 *
 * ### Example
 *
 * ```js
 * const expressHotwire = require('express-hotwire');
 *
 * app.use(expressHotwire());
 * ```
 */
export const buildMiddleware = () => middleware;
