# Eval Radar

This is a yet another tool for creating an evaluation radar, inspired by the [Thoughtworks Tech Radar](https://www.thoughtworks.com/radar).

I had a look at the others, but:
 * Thoughtworks requires you upload your data to their servers
 * The others were either constrained in their design, required a spreadsheet/external data source, and just weren't what I was looking for


 I wanted to have the radar purely SVG based. I wanted to:
  * quickly create a radar SVG from a docker image or some easy UI (locally - no data sharing)
  * intuitively add sections and stages
  * easily double-click to add things to evaluate
  * import / export SVG files to then put on a company site, wiki, whatever.

# Contributing

To build this project, run `make run` and code away.

To package it, run `make docker` and then `docker run -p 3000:3000  docker.io/kindservices/eval-radar:0.0.1` to run

