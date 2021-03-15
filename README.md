<p align="center">
  <img src="./src/assets/logo.svg" alt="Qwilr logo" width="64" height="64" />
</p>

<h1 align="center">Kaleidoscope Prototype Kit</h1>

<br>

Fork this repo to use as a starting point for React prototypes. Out of the box the kit includes all components from `kaleidoscope-components` plus a few extra helper components. The project is set up with routes for the dashboard and editor which can be filled with content depending on then prototype.

## Get started

Once you've forked the repo, clone it and install dependencies. Note: you will need to have an ssh key connected to your Github account set up for this to work. [Follow this guide](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) if you haven't set up your ssh key.

```
npm install
```

Once everything's installed, start up a dev server. Whenever you make a change, it will automatically refresh

```
npm start
```

## Project structure

The project is set up with directories for `assets`, `components`, `data`, and `views`. You don't have to stick with any of this and can start with a blank slate, but the starter structure does include a bunch of components to speed up getting started with a basic template for the dashboard and editor.

### Adding components

Add new components to `src/components`. The project is using `less`, so you need to import any styles into `src/index.less`.

### Adding views

Create your view components in `src/views`. The project handles routing using [React Router](https://reactrouter.com/web/guides/quick-start), so to route to a view add it to the routes in `src/views/App/index.tsx`.

## Deployment setup

Deploy tour prototype to a public url to share with the team and use for user testing. First up, you'll need to [create a Netlify account](https://app.netlify.com/signup).

Next, install the Netlify CLI globally

```
npm install -g netlify-cli
```

Log in to your Netlify account through the CLI

```
netlify login
```

Initialize Netlify in the prototype directory

```
netlify init
```

You'll be prompted with some steps. Run through them and create & configure a new site. When it gets to the step asking for Github credentials just hit `ctrl + c` to exit out of the setup.

## Deploy

First you'll need to create a production build of the site

```
npm run build
```

Then deploy your prototype to Netlify

```
npm run deploy
```

Once that's done you'll get a website URL to view your prototype. Anyone with the link will be able to view it.
