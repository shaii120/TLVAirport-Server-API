import express from 'express'
import { readFile } from 'fs/promises'
import { filterCountry, filterDelayed, filterInbound, filterOutbound, findPopulariest, findQuickGateway, getAmount, getData } from './accessories.mjs'


async function mainPage(_, response) {
    response.send(await readFile('./home.html', 'utf8'))
}

function amountFlight(_, response) {
    getData()
        .then(getAmount)
        .then(res => response.json(res))
        .catch(error => console.log("Error: ", error))
}

function amountOutboundFlight(_, response) {
    getData()
        .then(filterOutbound)
        .then(getAmount)
        .then(res => response.json(res))
        .catch(error => console.log("Error: ", error))
}

function amountInboundFlight(_, response) {
    getData()
        .then(filterInbound)
        .then(getAmount)
        .then(res => response.json(res))
        .catch(error => console.log("Error: ", error))
}

function amountCountryFlight(request, response) {
    const country = request.query.country
    getData()
        .then(res => filterCountry(res, country))
        .then(getAmount)
        .then(res => response.json(res))
        .catch(error => console.log("Error: ", error))
}

function amountCountryOutboundFlight(request, response) {
    const country = request.query.country
    getData()
        .then(res => filterCountry(res, country))
        .then(filterOutbound)
        .then(getAmount)
        .then(res => response.json(res))
        .catch(error => console.log("Error: ", error))
}

function amountCountryInboundFlight(request, response) {
    const country = request.query.country
    getData()
        .then(res => filterCountry(res, country))
        .then(filterInbound)
        .then(getAmount)
        .then(res => response.json(res))
        .catch(error => console.log("Error: ", error))
}

function amountDelayedFlight(_, response) {
    getData()
        .then(filterDelayed)
        .then(getAmount)
        .then(res => response.json(res))
        .catch(error => console.log("Error: ", error))
}

function mostPopularCity(_, response) {
    getData()
        .then(filterOutbound)
        .then(findPopulariest)
        .then(res => response.json(res))
        .catch(error => console.log("Error: ", error))
}

function quickGetaway(_, response) {
    getData()
        .then(res => findQuickGateway(response, res))
        .then(res => response.json(res))
        .catch(error => console.log("Error: ", error))
}


const portToListen = 3000
const app = express();
app.get('/', mainPage)
app.get('/amountFlight', amountFlight)
app.get('/amountOutboundFlight', amountOutboundFlight)
app.get('/amountInboundFlight', amountInboundFlight)
app.get('/amountCountryFlight', amountCountryFlight)
app.get('/amountCountryOutboundFlight', amountCountryOutboundFlight)
app.get('/amountCountryInboundFlight', amountCountryInboundFlight)
app.get('/amountDelayedFlight', amountDelayedFlight)
app.get('/mostPopularCountry', mostPopularCity)
app.get('/quickGetaway', quickGetaway)

app.listen(process.env.PORT || portToListen, () => console.log(`App available`))