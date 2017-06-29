## BookGig React App

### Requirements

* [Node](https://nodejs.org/en/)
* [MongoDB](https://docs.mongodb.com/manual/installation/#mongodb-community-edition)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/) or NPM


### Getting it up and running

1.`git clone git@bitbucket.org:lab19digital/authorslive.git && cd authorslive`

2.`git fetch && git checkout bookgig-react`

3.`yarn install`

4.`mkdir ./mongodb`

5.Download the [Mongo database dump](https://bitbucket.org/lab19digital/authorslive/downloads/dump)

6.Run `yarn mongo` then in another terminal instance `mongorestore --archive=/path/to/dump/dumpfile --db bookgig`

7.`yarn start` and start developing! (remember to login on Parse Dashboard on localhost:1337/dashboard)

8.To build simply run `yarn build`


**Important Note**: Currently the configuration is abstracted away. At the moment it may not be necessary
although to change the configuration run `yarn eject`.
Notice once ejected, the project cannot return to its initial structure and all configuration
files will be exposed.

### Project structure:

`/src/index.js` Entry point for the app

`/src/App.js` App "Main Page" where all other pages (containers) are imported and routes handled.

`/src/{containerName}/` We are organizing files by "topics" therefore all files related to
a topic will be stored in the same container folder

`/src/{containerName}/index` CCntainer component and all React code such as the view (JSX)

`/src/{containerName}/reducer` Where we manage the piece of state related to the container

`/src/{containerName}/actions` All actions the container dispatches

`/src/{containerName}/sagas` Where sagas that watch for API related calls are stored

`/src/{containerName}/actionTypes` Constants for reducers/actions


`/src/services`
Abstraction facades for external API (where Parse JS-SDK layer resides).

`/src/index-reducer` & `/src/index-sagas` Where all reducers and sagas are included then exported.

`/mongodb` All MongoDB related files.

`/parse` All Parse Server files.  



**Note**: The Readme will be continuously updated.