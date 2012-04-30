heroku-pinger
==============

This node.js proof-of-concept app can run on Heroku and be used to keep Heroku apps alive

Install
-------

	git clone git@github.com:dcampano/heroku-pinger.git
	cd heroku-pinger
	heroku apps:create my-heroku-pinger -s cedar

Only thing you need to set up is the PING_SITES variable, which is a comma-seperated string of hostnames

	heroku config:add PING_SITES="test.herokuapp.com,myotherapp.heroku.com"
	git push heroku master

Last step is to scale the worker process so that there is a process running

	heroku ps:scale worker=1
	heroku logs -t  #To verify everything is working properly

Please don't abuse the system and be considerate when using Heroku's resources.