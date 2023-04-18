# IP Lookup Tool

A simple React app with an Express backend for looking up IP4 address details using the MaxMind geoip2 API.

Currenty it returns the longitude, latitude, and timezone for any given valid IP4 address.

## Getting Started

- Clone repo
- cd into the `ip-location-info` repo
- cd into the `client` folder
- Run `docker-compose -f docker-compose.dev.yml up`
- The React front end runs on `localhost:3000`
- cd into the `server` folder
- Open a new terminal
- Run `npm run dev`
- The server runs on `localhost:5050`
- Once everything is running you can test the api connection by going to `localhost:5050/api/172.32.0.0`
- If everything is set up correctly you should see a json object with the IP info 

