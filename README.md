# firebase-test

```
firebase test project
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing firebase

First step is install firebase tools

```
npm install -g firebase-tools
```

Then we need to login and init our firebase (follow instructions in bash)

```
* firebase login
* firebase init
```

### Installing livereload server

```
npm -g install browser-sync
```

After that for run type:

```
for run: browser-sync start --server --files="**/*.js"
```

That's all.
