## BG React App Port

Previous initial work on a (fullstack) Node/Mongo/React port project of a pure JS/jQuery legacy app. 
The most significant challenges were dealing with a huge and confusing codebase, very poorly documented and filled with bad practices and anti-patterns throughout the old codebase. The lack of frameworks and/or libraries besides jQuery contributed
to the difficulties of porting this app to current stacks and best practices as navigating through the legacy codebase was challenging in itself. Despite those aspects I brought the project to a very advanced point, easy to be maintained, decently documented and on the path to be finished.


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

Copyright © 2017 Adriano Carmezim
