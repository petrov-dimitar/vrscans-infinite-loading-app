<!-- @format -->

# Lazy-loading VRScans Library

## Links

deployed front-end app: [https://dimitarp.gitlab.io/lazy-loading-vrscans-library/](https://dimitarp.gitlab.io/lazy-loading-vrscans-library/)

deployed back-end app: [https://boiling-cliffs-97152.herokuapp.com](https://boiling-cliffs-97152.herokuapp.com)

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
├── modules
| ├── common
| | ├── utils
| | ├── hooks
| | ├── api
| | ├── index.js
| | ├── components
| | | ├── Button.jsx
| | | ├── Input.jsx
| ├── dashboard
| | ├── utils
| | ├── hooks
| | ├── api
| | ├── index.js
| | ├── components
| | | ├── Table.jsx
| | | ├── Sidebar.jsx
| ├── details
| | ├── index.js
| | ├── components
| | | ├── Form.jsx
| | | ├── ItemCard.jsx

For each module (optional folders):
- Components folder might be the largest - hosting all components and sub-components.
- Utils folder should contain small reusable, generic functions that are not specific to the business or React. (e.g email validation).
- Hooks folder will keep the custom hooks - functions that use reactive state - both generic and business specific.
- api folder holds business logic specific to module - functions and constants.
- index.js - main entry point of module - defines page structure, routes and sub-routes