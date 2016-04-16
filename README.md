React App to display nearby users on a google map

After cloning, inside the directory run:

$ npm install

This will create the package.json file for all the dependencies.

Then in src/client/app/index.jsx, make sure to add your own EatSleepRide token on line 7:

var ESR_TOKEN = 'YOUR ESR TOKEN';

To run locally use the command:

$ ./node_modules/.bin/webpack -d

as well as running the server.rb file:

$ ruby server.rb

Should be running on localhost:3000 in the browser
