import { NextFunction, Request, Response } from 'express';

type Locals = Record<string, unknown>;
type TurboStream = Record<TurboStreamActions, (target: string, options: StreamOptions) => void>;
type StreamOptions = {
    readonly partial?: string;
    readonly locals?: Locals;
}

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
const render = (res: Response, partial: string, locals?: Locals): Promise<string> => {
    return new Promise((resolve, reject) => {
        res.render(partial, locals, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });
}

/**
 * @ignore
 */
const stream = async (res: Response, target: string, action: TurboStreamActions, {
    partial,
    locals,
}: StreamOptions) => {
    const content = partial ? await render(res, partial, locals) : '';

    return `
        <turbo-stream action="${action}" target="${target}">
            <template>
                ${content}
            </template>
        </turbo-stream>
    `;
}


export const middleware = (_req: Request, res: Response, next: NextFunction) => {
    const streamActionHandler = (action: TurboStreamActions) => async (target: string, options: StreamOptions) => {
        res.setHeader('Content-Type', ['text/html; turbo-stream; charset=utf-8']);
        res.send(await stream(res, target, action, options));
    }

    const turboStream: TurboStream = {
        append: streamActionHandler(TurboStreamActions.append),
        prepend: streamActionHandler(TurboStreamActions.prepend),
        replace: streamActionHandler(TurboStreamActions.replace),
        update: streamActionHandler(TurboStreamActions.update),
        remove: streamActionHandler(TurboStreamActions.remove),
    };

    res.turboStream = turboStream;

    next();
}