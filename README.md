### BookGig React App

#### Requirements

* [Node](https://nodejs.org/en/)
* [MongoDB](https://docs.mongodb.com/manual/installation/#mongodb-community-edition)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/) or NPM


#### Getting it up and running

1.`git clone git@bitbucket.org:lab19digital/authorslive.git && cd authorslive`

2.`git fetch && git checkout bookgig-react`

3.`yarn install`

4.`mkdir ./mongodb`

5.Download the [Mongo database dump](https://bitbucket.org/lab19digital/authorslive/downloads/dump)

6.Run `yarn mongo` then in another terminal instance `mongorestore --archive=/path/to/dump/dumpfile --db bookgig`

7.`yarn start` and start developing!

8.To build simply run `yarn build`


**Important Note**: Currently the configuration is abstracted away. At the moment it may not be necessary
although to change the configuration run `yarn eject`.
Notice once ejected, the project cannot return to its initial structure and all configuration
files will be exposed.

#### Project directory structure:

`/src/components`
“Dumb” or Presentational React components (have no knowledge of Redux).
Receive data through props or callbacks and don't have their own state.
Examples: Pages, sidebars, lists etc.

`/src/containers`
“Smart” or Container React components (connected to our Redux store).
Usually don't have logic except for dispatching actions.

`/src/services`
Abstraction facades for external API (like backend servers).

`/src/store`
Store holds the global app state.
All Redux-specific code goes here.

`/mongodb`
All MongoDB related files.

`/parse`
All Parse Server files.


##### The store directory is organized by domain, each containing:

`/src/store/{domain}/reducer.js`
Reducer (Reducers update state, receiving state+action and return new state) as a
default export with all selectors as named exports.

`/src/store/{domain}/actions.js`
All the domain action handlers (thunks and plain object creators).

**Note**: The Readme will be continuously updated.