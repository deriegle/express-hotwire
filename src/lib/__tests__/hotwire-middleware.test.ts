import { NextFunction, Request, Response } from 'express';

import { middleware, MiddlewareWriteMode } from '../hotwire-middleware';

const buildOptions = (): [Request, Response, NextFunction] => {
  // TODO: Find better way to mock the Response object
  const res: Partial<Response> = {
    setHeader: jest.fn(),
    send: jest.fn(),
    write: jest.fn(),
    end: jest.fn(),
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

    middleware(req, res, next);

    expect(res.turboStream).toBeDefined();

    expect(res.turboStream.append).toBeDefined();
    expect(res.turboStream.prepend).toBeDefined();
    expect(res.turboStream.remove).toBeDefined();
    expect(res.turboStream.replace).toBeDefined();
    expect(res.turboStream.update).toBeDefined();
  });

  describe('append', () => {
    it('sets the correct header', async () => {
      const [req, res, next] = buildOptions();

      middleware(req, res as Response, next);

      await res.turboStream.append('message_1', {
        partial: 'messages/show',
        locals: {
          message: {},
        },
      });

      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', [
        'text/vnd.turbo-stream.html',
      ]);
    });

    it('sends the expected response', async () => {
      const [req, res, next] = buildOptions();

      middleware(req, res as Response, next);

      await res.turboStream.append('message_1', {
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

      middleware(req, res as Response, next);

      res?.turboStream?.prepend('message_1', {
        partial: 'messages/show',
        locals: {
          message: {},
        },
      });

      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', [
        'text/vnd.turbo-stream.html',
      ]);
    });

    it('sends the expected response', async () => {
      const [req, res, next] = buildOptions();

      middleware(req, res as Response, next);

      await res.turboStream.prepend('message_1', {
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
    it('sets the correct header', async () => {
      const [req, res, next] = buildOptions();

      middleware(req, res as Response, next);

      await res.turboStream.remove('message_1');

      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', [
        'text/vnd.turbo-stream.html',
      ]);
    });

    it('sends the expected response', async () => {
      const [req, res, next] = buildOptions();

      middleware(req, res as Response, next);

      await res.turboStream.remove('message_1');

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
    it('sets the correct header', async () => {
      const [req, res, next] = buildOptions();

      middleware(req, res as Response, next);

      await res.turboStream.replace('message_1', {
        partial: 'messages/show',
        locals: {
          message: {},
        },
      });

      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', [
        'text/vnd.turbo-stream.html',
      ]);
    });

    it('sends the expected response', async () => {
      const [req, res, next] = buildOptions();

      middleware(req, res as Response, next);

      await res.turboStream.replace('message_1', {
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
    it('sets the correct header', async () => {
      const [req, res, next] = buildOptions();

      middleware(req, res as Response, next);

      await res.turboStream.update('message_1', {
        partial: 'messages/show',
        locals: {
          message: {},
        },
      });

      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', [
        'text/vnd.turbo-stream.html',
      ]);
    });

    it('sends the expected response', async () => {
      const [req, res, next] = buildOptions();

      middleware(req, res as Response, next);

      await res.turboStream.update('message_1', {
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

    it('sends the expected response when using content', async () => {
      const [req, res, next] = buildOptions();

      middleware(req, res as Response, next);

      await res.turboStream.update('unread_count', {
        content: '1',
      });

      expect(res.send).toHaveBeenCalled();
      expect((res.send as jest.Mock).mock.calls[0][0]).toMatchInlineSnapshot(`
        "
          <turbo-stream action=\\"update\\" target=\\"unread_count\\">
            <template>
        1
            </template>
          </turbo-stream>
          "
      `);
    });
  });

  it('supports multiple turbo stream responses', async () => {
    const [req, res, next] = buildOptions();

    middleware(req, res as Response, next);

    await res.turboStream.append('message_1', {
      partial: 'messages/show',
      locals: {
        message: {},
      },
    }, MiddlewareWriteMode.WRITE);

    await res.turboStream.prepend('message_2', {
      partial: 'messages/show',
      locals: {
        message: {},
      },
    }, MiddlewareWriteMode.WRITE);

    res.end();

    expect(res.write).toHaveBeenCalled();
    expect((res.write as jest.Mock).mock.calls[0][0]).toMatchInlineSnapshot(`
      "
        <turbo-stream action=\\"append\\" target=\\"message_1\\">
          <template>

          </template>
        </turbo-stream>
        "
    `);
    expect((res.write as jest.Mock).mock.calls[1][0]).toMatchInlineSnapshot(`
      "
        <turbo-stream action=\\"prepend\\" target=\\"message_2\\">
          <template>

          </template>
        </turbo-stream>
        "
    `);
  });
});
