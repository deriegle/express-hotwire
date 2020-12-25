import { NextFunction, Request, Response } from 'express';

import { middleware as buildMiddleware } from '../hotwire-middleware';

const buildOptions = (): [Request, Response, NextFunction] => {
  const res: Partial<Response> = {
    setHeader: jest.fn(),
    send: jest.fn(),
    render: jest.fn().mockImplementation((_partial, __locals, cb) => {
      cb(null, '');
    }),
  };

  return [{} as Request, res as Response, jest.fn() as NextFunction];
};

describe('middleware', () => {
  it('adds turboStream to the response object', () => {
    const [req, res, next] = buildOptions();

    expect(res.turboStream).toBeUndefined();

    const middleware = buildMiddleware();
    middleware(req, res, next);

    expect(res.turboStream).toBeDefined();

    expect(res.turboStream.append).toBeDefined();
    expect(res.turboStream.prepend).toBeDefined();
    expect(res.turboStream.remove).toBeDefined();
    expect(res.turboStream.replace).toBeDefined();
    expect(res.turboStream.update).toBeDefined();
  });

  describe('append', () => {
    it('sets the correct header', () => {
      const [req, res, next] = buildOptions();

      const middleware = buildMiddleware();
      middleware(req, res as Response, next);

      res?.turboStream?.append('message_1', {
        partial: 'messages/show',
        locals: {
          message: {},
        },
      });

      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', [
        'text/html; turbo-stream; charset=utf-8',
      ]);
    });

    it('sends the expected response', async () => {
      const [req, res, next] = buildOptions();

      const middleware = buildMiddleware();
      middleware(req, res as Response, next);

      await res?.turboStream?.append('message_1', {
        partial: 'messages/show',
        locals: {
          message: {},
        },
      });

      expect(res.send).toHaveBeenCalled();
      expect((res.send as jest.Mock).mock.calls[0][0]).toMatchInlineSnapshot(`
        "
                <turbo-stream action=\\"append\\" target=\\"message_1\\">
                    <template>
                        
                    </template>
                </turbo-stream>
            "
      `);
    });
  });

  describe('prepend', () => {
    it('sets the correct header', () => {
      const [req, res, next] = buildOptions();

      const middleware = buildMiddleware();
      middleware(req, res as Response, next);

      res?.turboStream?.prepend('message_1', {
        partial: 'messages/show',
        locals: {
          message: {},
        },
      });

      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', [
        'text/html; turbo-stream; charset=utf-8',
      ]);
    });

    it('sends the expected response', async () => {
      const [req, res, next] = buildOptions();

      const middleware = buildMiddleware();
      middleware(req, res as Response, next);

      await res?.turboStream?.prepend('message_1', {
        partial: 'messages/show',
        locals: {
          message: {},
        },
      });

      expect(res.send).toHaveBeenCalled();
      expect((res.send as jest.Mock).mock.calls[0][0]).toMatchInlineSnapshot(`
        "
                <turbo-stream action=\\"prepend\\" target=\\"message_1\\">
                    <template>
                        
                    </template>
                </turbo-stream>
            "
      `);
    });
  });

  describe('remove', () => {
    it('sets the correct header', () => {
      const [req, res, next] = buildOptions();

      const middleware = buildMiddleware();
      middleware(req, res as Response, next);

      res?.turboStream?.remove('message_1');

      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', [
        'text/html; turbo-stream; charset=utf-8',
      ]);
    });

    it('sends the expected response', async () => {
      const [req, res, next] = buildOptions();

      const middleware = buildMiddleware();
      middleware(req, res as Response, next);

      await res?.turboStream?.remove('message_1');

      expect(res.send).toHaveBeenCalled();
      expect((res.send as jest.Mock).mock.calls[0][0]).toMatchInlineSnapshot(`
        "
                <turbo-stream action=\\"remove\\" target=\\"message_1\\">
                    <template>
                        
                    </template>
                </turbo-stream>
            "
      `);
    });
  });

  describe('replace', () => {
    it('sets the correct header', () => {
      const [req, res, next] = buildOptions();

      const middleware = buildMiddleware();
      middleware(req, res as Response, next);

      res?.turboStream?.replace('message_1', {
        partial: 'messages/show',
        locals: {
          message: {},
        },
      });

      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', [
        'text/html; turbo-stream; charset=utf-8',
      ]);
    });

    it('sends the expected response', async () => {
      const [req, res, next] = buildOptions();

      const middleware = buildMiddleware();
      middleware(req, res as Response, next);

      await res?.turboStream?.replace('message_1', {
        partial: 'messages/show',
        locals: {
          message: {},
        },
      });

      expect(res.send).toHaveBeenCalled();
      expect((res.send as jest.Mock).mock.calls[0][0]).toMatchInlineSnapshot(`
        "
                <turbo-stream action=\\"replace\\" target=\\"message_1\\">
                    <template>
                        
                    </template>
                </turbo-stream>
            "
      `);
    });
  });

  describe('update', () => {
    it('sets the correct header', () => {
      const [req, res, next] = buildOptions();

      const middleware = buildMiddleware();
      middleware(req, res as Response, next);

      res?.turboStream?.update('message_1', {
        partial: 'messages/show',
        locals: {
          message: {},
        },
      });

      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', [
        'text/html; turbo-stream; charset=utf-8',
      ]);
    });

    it('sends the expected response', async () => {
      const [req, res, next] = buildOptions();

      const middleware = buildMiddleware();
      middleware(req, res as Response, next);

      await res?.turboStream?.update('message_1', {
        partial: 'messages/show',
        locals: {
          message: {},
        },
      });

      expect(res.send).toHaveBeenCalled();
      expect((res.send as jest.Mock).mock.calls[0][0]).toMatchInlineSnapshot(`
        "
                <turbo-stream action=\\"update\\" target=\\"message_1\\">
                    <template>
                        
                    </template>
                </turbo-stream>
            "
      `);
    });
  });
});
