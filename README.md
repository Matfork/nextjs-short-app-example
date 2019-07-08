# Example of Next.js

> This is an example app of next.js

## How to use it

First, install dependencies with [`npm install`]. Then

### For dev mode

Notice in dev mode, first time loading pages takes a little time. Sometimes styles doesn't load (when first time loaded), but it is fixed after a page refresh. This is a behavior which is being fixed in next.js and only happens in dev mode (https://github.com/zeit/next-plugins/issues/282), in prod mode it works as expected.

```bash
npm run dev
```

### For prod mode

```bash
npm run build
npm run start
```
