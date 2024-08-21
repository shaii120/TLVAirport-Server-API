const estimateDeparture = "CHSTOL"
const realDeparture = "CHPTOL"
const flightCode = "CHOPER"
const flightNumber = "CHFLTN"
const checkInCounter = "CHCINT"
const countryName = "CHLOCCT"
const cityName = "CHLOC1T"
const flightStatus = "CHRMINE"

function isOutbound(val) {
    return val[checkInCounter] == null
}

function isInbound(val) {
    return !isOutbound(val)
}

function isDelayed(val) {
    const estimateTime = Date.parse(val[estimateDeparture])
    const actualTime = Date.parse(val[realDeparture])

    return actualTime > estimateTime
}

export async function getData() {
    const resource_id = "e83f763b-b7d7-479e-b172-ae981ddc6de5"
    const max_size = 300
    const data = `https://data.gov.il/api/3/action/datastore_search?resource_id=${resource_id}&limit=${max_size}`
    return fetch(data)
        .then(response => response.json())
        .then(response => response.result.records)
}

export function getAmount(res) {
    return res.length
}

export function filterOutbound(res) {
    return res.filter(isOutbound)
}

export function filterInbound(res) {
    return res.filter(isInbound)
}

export function filterCountry(res, country) {
    return res.filter(val => val[countryName].toUpperCase() == country.toUpperCase())
}

export function filterDelayed(res) {
    return res.filter(isDelayed)
}

export function findPopulariest(res) {
    let cities = {}
    let max = 0
    let maxCity = ""

    for (let val of res) {
        let city = val[cityName]
        if (!(city in cities)) {
            cities[city] = 0
        }
        cities[city]++
    }

    for (let key in cities) {
        if (cities[key] > max) {
            maxCity = key
            max = cities[key]
        }
    }

    return maxCity
}

export function findQuickGateway(response, res) {
    const inbound = filterInbound(res)
    const outbound = filterOutbound(res)
    const earliestInbound = inbound.reduce((a, b) => Date.parse(a[estimateDeparture]) < Date.parse(b[estimateDeparture]) ? a : b)
    const latestOutbound = outbound.reduce((a, b) => Date.parse(a[estimateDeparture]) > Date.parse(b[estimateDeparture]) ? a : b)

    if (Date.parse(earliestInbound[estimateDeparture]) > Date.parse(latestOutbound[estimateDeparture])) {
        response.status(406).send('Error 406: No result was found')
        return
    }

    return {
        departure: latestOutbound[flightCode] + latestOutbound[flightNumber],
        arrival: earliestInbound[flightCode] + earliestInbound[flightNumber],
    }
}