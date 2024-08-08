### To run the server through Docker:
1. Make sure you have Docker installed.
2. Open terminal in the project folder.
2. Build the project by using the command:\
    `docker build -t <project_name> .`
3. To run the server use:\
    `docker run -p 8080:8080 <project_name>`

### To run the server on the current machine:
1. Make sure you have JavaScript and npm installed.
2. Open terminal in the project folder.
3. Install the relevant modules by using the command:\
    `npm install`
4. To run the server use:\
    `npm start prod`

The server supports the following API request:\
`/amountFlight` - Number of flights (inbound & outbound).\
`/amountOutboundFlight` - Number of outbound flights.\
`/amountInboundFlight` - Number of inbound flights.\
`/amountCountryFlight?country=<country_name>` - Number of flights from a specific country (inbound & outbound).\
`/amountCountryOutboundFlight?country=<country_name>` - Number of outbound flights from a specific country.\
`/amountCountryInboundFlight?country=<country_name>` - Number of inbound flights from a specific country.\
`/amountDelayedFlight` - Number of delayed flights.\
`/mostPopularCountry` - Most popular destination - the city with the highest number of outbound flights.\
`/quickGetaway` - Return (if exist) two flights one from Israel and one to Israel that someone can take for a quick getaway - considering date and time.