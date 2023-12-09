# percent-encode

> [Percent encode](https://developer.twitter.com/en/docs/authentication/oauth-1-0a/percent-encoding-parameters) strings

This implementation is following Twitter's spec from [RFC3986](https://datatracker.ietf.org/doc/html/rfc3986#section-2.1).

## Install

```ts
import { decode, encode } from 'https://deno.land/x/percentencode/mod.ts';
```

## Usage

The lib provides two functions: `encode` and `decode`.

### `encode`

Encode will take a string or a byte array and return a promise that will contain the percent-encoded string.

```ts
await encode('Hello World!'); // Hello%20World%21
```

### `decode`

Decode will take a string and return a promise that will contain the percent-decoded string.

```ts
await decode('Hello%20World%21'); // Hello World!
```
