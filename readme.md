Deploying Instructions:


MongoDB Datastore:
1.	Install a local MongoDB server instance.
2.	Start the local MongoDB instance
	sudo service mongod start
3.	Install node.js.
4.	Install dependencies: Navigate to the folder ‘ChatBot / dataLoad_scripts /’ and run the command
	npm install
5.	Data Load: Run the following scripts in a sequence to load the data
node course_details.js
node course_description.js
node class_timetable.js

REST Services Server:
1.	Install node.js.
2.	Install the package pm2 which is a process manager for node.js.
3.	Install dependencies: Navigate to the folder ‘ChatBot / services /’  and run the command
npm install
	The command installs the dependencies for the node.js services.
4.	Run the server: Run the following command to start the node.js server in the services folder.
	pm2 start app.js
