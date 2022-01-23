# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.3.2](https://github.com/deriegle/express-hotwire/compare/v0.3.1...v0.3.2) (2022-01-23)


### Features

* multiple turbo streams in one response ([#43](https://github.com/deriegle/express-hotwire/issues/43)) ([e26102d](https://github.com/deriegle/express-hotwire/commit/e26102d7576923cde82dda2a14aaff3a1e304925))
* multiple turbostream responses ([#44](https://github.com/deriegle/express-hotwire/issues/44)) ([1eb626c](https://github.com/deriegle/express-hotwire/commit/1eb626c3c22de5a0aa69dda004333c7714a4e80b))

### [0.3.1](https://github.com/deriegle/express-hotwire/compare/v0.3.0...v0.3.1) (2022-01-10)


### Bug Fixes

* fix issue with ts build ([98a39be](https://github.com/deriegle/express-hotwire/commit/98a39be784ea9e25fcc99909a884bf9fb536c356))

## [0.3.0](https://github.com/deriegle/express-hotwire/compare/v0.1.0...v0.3.0) (2022-01-10)


### ⚠ BREAKING CHANGES

* **deps:** Remove support for Node v10

### Bug Fixes

* make middleware async ([#21](https://github.com/deriegle/express-hotwire/issues/21)) ([764efdd](https://github.com/deriegle/express-hotwire/commit/764efdd06ff182c7487fc665ca7cec97e60da3ba))
* remove unnecessary deps ([#32](https://github.com/deriegle/express-hotwire/issues/32)) ([fbeb339](https://github.com/deriegle/express-hotwire/commit/fbeb339d93a0f07b60b40ab74435f1641d3a2665))


* **deps:** update dependency cspell to v5 ([#15](https://github.com/deriegle/express-hotwire/issues/15)) ([56618c1](https://github.com/deriegle/express-hotwire/commit/56618c1fbec8357af34e198c3855dbb7ed5d861b))

## [0.2.0](https://github.com/deriegle/express-hotwire/compare/v0.1.0...v0.2.0) (2022-01-10)


### ⚠ BREAKING CHANGES

* **deps:** Remove support for Node v10

### Bug Fixes

* make middleware async ([#21](https://github.com/deriegle/express-hotwire/issues/21)) ([764efdd](https://github.com/deriegle/express-hotwire/commit/764efdd06ff182c7487fc665ca7cec97e60da3ba))
* remove unnecessary deps ([#32](https://github.com/deriegle/express-hotwire/issues/32)) ([fbeb339](https://github.com/deriegle/express-hotwire/commit/fbeb339d93a0f07b60b40ab74435f1641d3a2665))
* update content-type to match Rails ([dad55fa](https://github.com/deriegle/express-hotwire/commit/dad55fac202dfa25e1ec01fac620bed56b6fd874)), closes [/github.com/hotwired/turbo-rails/blob/6f6d8c7cfb5f18fb7b71b47c7e73691b9e7d7e2e/lib/turbo/engine.rb#L51](https://github.com/deriegle//github.com/hotwired/turbo-rails/blob/6f6d8c7cfb5f18fb7b71b47c7e73691b9e7d7e2e/lib/turbo/engine.rb/issues/L51)


* **deps:** update dependency cspell to v5 ([#15](https://github.com/deriegle/express-hotwire/issues/15)) ([56618c1](https://github.com/deriegle/express-hotwire/commit/56618c1fbec8357af34e198c3855dbb7ed5d861b))

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
