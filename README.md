<!-- @format -->

# Lazy-loading VRScans Library

## Links

deployed front-end app: [https://dimitarp.gitlab.io/lazy-loading-vrscans-library/](https://dimitarp.gitlab.io/lazy-loading-vrscans-library/)

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
