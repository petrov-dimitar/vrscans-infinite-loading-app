<!-- @format -->

# Lazy-loading VRScans Library

This project is a load-on-demand library showing Virtual Reality Scan materials. App users can authenticate themselves and add scans to their own collection of favorites.

The project consists of front-end app, created with React, and a back-end app, created with Express and mongoDB as a database. Both applications are built from scratch.

## Links

deployed front-end app: [https://dimitarp.gitlab.io/lazy-loading-vrscans-library/](https://dimitarp.gitlab.io/lazy-loading-vrscans-library/)

deployed back-end app: [https://boiling-cliffs-97152.herokuapp.com](https://boiling-cliffs-97152.herokuapp.com)

Design/Prototype: [https://www.figma.com/file/nkvrT6vx4P2OcNZCGnCRQt/Telerik?node-id=0%3A1&t=rW6UvZMCRL1YeSyJ-0](https://www.figma.com/file/nkvrT6vx4P2OcNZCGnCRQt/Telerik?node-id=0%3A1&t=rW6UvZMCRL1YeSyJ-0)

## Full list of deliverables

[] - not yet present
[ x ] - done/present

- [ x ] React-based project
- [ x ] Branching strategy
- [ x ] Lazy loading of materials
- [ x ] Filtering functionality (colors, tags, material)
- [ x ] Redux (RTK implemented)
- [ x ] JWT authentication (token stored in session storage)
- [] Materials favorited by logged-in-users
- [] Mobile-friendly UI
- [] Testing (integrated with CI)
- [] Integration Testing
- [] The application should be requests-efficient
- [] Documentation (e.g., storybook, docz)
- [] User should be able to see and edit own details

Extra features:

- [ x ] Continious deployment for FE and BE app
- [ x ] Branch naming convention using husky
- [ x ] Commit message convention using husky
- [ x ] Absolute imports to /src
- [ x ] Add Node Version Manager with .nvmrc file
- [ x ] Protected routes
- [] Product-specification view
- [] dark mode
- [] stripe checkout

## Installation (localhost)

To run the project locally you need:

install the node modules in the root, front-end, and back-end folders. run:

```
npm install
```

Create env file

```
cp .env.dist .env
```

To run the frontend app, navigate to folder and run:

```
npm run serve
```

To run the backend app, navigate to folder and run:

```
npm start
```

## husky

In order to ensure branch and commit messages are following the naming conventions, we use husky with commit-msg and pre-push git hooks.

### Branch naming convention

- \<author>/\<issue_number>/\<branch_type>/\<branch_name>

examples:

- kostadin/1/feat/setup_app
- dimitar/2/bug/setup_scripts

note: \<branch_name> should follow camel case structure

branch type options:
wip - Works in progress; stuff I know won't be finished soon
feat - Feature I'm adding or expanding
bug - Bug fix or experiment
junk - Throwaway branch created to experiment

## Commit messages convention

<type>[optional scope]: <description>

[optional body]
[optional footer(s)]

examples:

- feat: setup webpack and babel
- fix(scripts): add tests scripts

More on the idea can be read here: [Conventional Commit Messages](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)

## Applications

### Front-end

#### Folder structure

The folder structure methodology followed is based on modules - logically distributed set of files based on functionality. The paradigm is taken from the book Tao of React byb Alex Kondov.

Example:
- ├── modules
- | ├── common
- | | ├── utils
- | | ├── hooks
- | | ├── api
- | | ├── index.js
- | | ├── components
- | | | ├── Button.jsx
- | | | ├── Input.jsx
- | ├── dashboard
- | | ├── utils
- | | ├── hooks
- | | ├── api
- | | ├── index.js
- | | ├── components
- | | | ├── Table.jsx
- | | | ├── Sidebar.jsx
- | ├── details
- | | ├── index.js
- | | ├── components
- | | | ├── Form.jsx
- | | | ├── ItemCard.jsx

For each module (optional folders):

- Components folder might be the largest - hosting all components and sub-components.
- Utils folder should contain small reusable, generic functions that are not specific to the business or React. (e.g email validation).
- Hooks folder will keep the custom hooks - functions that use reactive state - both generic and business specific.
- api folder holds business logic specific to module - functions and constants.
- index.js - main entry point of module - defines page structure, routes and sub-routes
