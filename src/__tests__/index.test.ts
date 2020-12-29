import { NextFunction, Request, Response } from 'express';

import buildMiddleware from '../';

describe('express-hotwire library', () => {
  it('works', () => {
    const middleware = buildMiddleware();
    const req = {} as Request;
    const res = {} as Response;
    const next: NextFunction = jest.fn();

    expect(res.turboStream).toBeUndefined();

    middleware(req, res, next);

    expect(res.turboStream).toBeDefined();
  });
});
