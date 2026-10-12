# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 3.3.0 - Unreleased

Pre-release published under the `next` dist-tag (`npm install @cafecafe/afip.ts@next`). `3.3.0-rc.1` relaxes the new
`axios` dependency to `^1.8.4` so installing it does not force an `axios` upgrade in your project.

### Fixed

- Requests to ARCA failed on Node 24+ (OpenSSL 3.5) with `write EPROTO ... dh key too small`: WSFE
  (`servicios1.afip.gov.ar`) still negotiates TLS with a 1024-bit Diffie-Hellman key. The library now sends its
  requests through its own HTTPS agent with `DEFAULT@SECLEVEL=1`, which accepts that key. Only the library's
  requests to ARCA use this setting; the rest of your application's connections are not affected.

### Added

- `httpsAgent` option in the `Context`, to send the requests to ARCA through your own HTTPS agent (proxy,
  custom TLS settings).
- `getArcaHttpsAgent()` and `ARCA_TLS_CIPHERS` exports, to build an agent on top of the library's defaults.

### Changed

- The library no longer uses Node's global HTTPS agent (`https.globalAgent`) for its requests. If you routed
  ARCA traffic through a proxy by replacing or patching the global agent, pass that agent as `httpsAgent`
  instead:

  ```ts
  const afip = new Afip({ ...context, httpsAgent: myProxyAgent });
  ```

  If your agent has to talk to ARCA on Node 24+, also set `ciphers: ARCA_TLS_CIPHERS` on it.

## 3.2.2 - 2024-06-19

## 3.2.1 - 2024-06-04

## 3.2.0 - 2024-02-14

## 3.1.4 - 2023-11-29

## 3.1.3 - 2023-11-03

## 3.1.2 - 2023-10-14

## 3.1.1 - 2023-10-12

## 3.1.0 - 2023-10-03

## 3.0.0 - 2023-10-02

## 2.0.6 - 2023-01-31

## 2.0.5 - 2023-01-31

## 2.0.4 - 2022-11-09

## 2.0.3 - 2022-11-08

## 2.0.2 - 2022-11-03

## 2.0.0 - 2022-11-01

## 1.0.1 - 2022-11-01

## 1.0.0 - 2022-11-01

## 0.9.0 - 2022-10-31
### Added
- Changelog
