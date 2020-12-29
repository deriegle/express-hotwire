# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.1.0](https://github.com/deriegle/express-hotwire/compare/v0.0.4...v0.1.0) (2020-12-29)

### ⚠ BREAKING CHANGES

- **src/index.ts:** We are now exporting a function that builds the middleware. This matches what the
  documentation has said. It also matches what other express middleware does. You should import the
  middleware using `app.use(expressHotwire());`

### Features

- **hotwire-middleware:** allow content to be passed as an option to res.turboStream.\* methods ([a82451b](https://github.com/deriegle/express-hotwire/commit/a82451b9a90aab56f73ca89dcd9ccc9e4acf0cb2))

### Bug Fixes

- **src/index.ts:** use the buildMiddleware function as the default export of the library ([6bfa913](https://github.com/deriegle/express-hotwire/commit/6bfa913294af744ab6792345dd5e004bb310845b))

### [0.0.5](https://github.com/deriegle/express-hotwire/compare/v0.0.4...v0.0.5) (2020-12-29)

### Features

- **hotwire-middleware:** allow content to be passed as an option to res.turboStream.\* methods ([a82451b](https://github.com/deriegle/express-hotwire/commit/a82451b9a90aab56f73ca89dcd9ccc9e4acf0cb2))

### [0.0.4](https://github.com/deriegle/express-hotwire/compare/v0.0.1...v0.0.4) (2020-12-26)

### 0.0.1 (2020-12-26)

Initial release with `express-hotwire` middleware with typescript types.
