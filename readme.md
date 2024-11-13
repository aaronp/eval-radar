# Svelte SPA

This is a simple starting block for a new [svelte](https://svelte.dev/) single-page app.

It's the easiest baseline for creating a new sveltekit project which bundles into a static site.

# Usage

To use it, just clone this repo and search and replace 'eval-radar' for your app name:

```sh
# rename to 'foo'
find . -type d -name '.git' -prune -o -type f -exec LC_ALL=C sed -i 's/eval-radar/foo/g' {} +
```

# Building

To develop on it, run `make run` and code away.

To build it, run `make docker` and then `docker run -p 3000:3000  docker.io/kindservices/eval-radar:0.0.1` to run

