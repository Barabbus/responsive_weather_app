const WEATHER_API_KEY = 'd731022dac6a56c2606e43e3592cefd9'
// const WEATHER_API_KEY = '0b5ccb072562401df221a70d7f793542'

export const setLocationObject = (locationObj, coordsObj) => {
    const { lat, lon, name, unit } = coordsObj
    locationObj.setLat(lat)
    locationObj.setLon(lon)
    locationObj.setName(name)
    if (unit) {
        locationObj.setUnit(unit)
    }
}

export const getHomeLocation = () => {
    return localStorage.getItem("defaultWeatherLocation")
}

export const getWeatherFromCoords = async (locationObj) => {
    const lat = locationObj.getLat()
    const lon = locationObj.getLon()
    const units = locationObj.getUnit()
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${WEATHER_API_KEY}`
    try {
        const weatherStream = await fetch(url)
        const weatherJson = await weatherStream.json()
        // console.log(weatherJson)
        return weatherJson        
    } catch (err) {
        console.error(err)
    }
}

export const getCoordsFromApi = async (entryText, units) => {
    const regex = /^\d+$/g  // check for zip code
    const flag = regex.test(entryText) ? "zip" : "q"
    const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${WEATHER_API_KEY}`
    const encodedUrl = encodeURI(url)
    try {
        const dataStream = await fetch(encodedUrl)
        const jsonData = await dataStream.json()
        // console.log(jsonData)
        return jsonData
    } catch (err) {
        console.error(err.stack)
    }
}


export const cleanText = (text) => {     
    const regex = / {2,}/g  // removes spaces which are 2 or more in length from text 
    const entryText = text.replaceAll(regex, " ").trim()
    return entryText
}