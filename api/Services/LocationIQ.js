import axios from 'axios'
import dotenv from 'dotenv';


dotenv.config();
export const getMapsInformation = async (address) => {
    // address = "avenida universitaria 845 san miguel "
    address = "unidad vecinal de mirones"
    try {

        const locationIQURL = `https://us1.locationiq.com/v1/search?key=${process.env.LOCATIONIQ_API_KEY}&q=${locationIQFormatter(address)}%20Lima%20&format=json&`
        const response = await axios.get(locationIQURL)

        //Get first response in the array as it's ordered by relevance 
        const locationIQResponse = response.data[0]
        if (response.status != 200) {
            return { distrito: '', lat: 0, lon: 0 }
        }

        const distrito = locationIQResponse.display_name.split(', ')[1]
        const lat = locationIQResponse.lat
        const lon = locationIQResponse.lon
        return { distrito: distrito, lat: lat, lon: lon }
    } catch (err) {
        console.error("There is an error", err.message)
        return { distrito: '', lat: 0, lon: 0 }

    }
}


export const locationIQFormatter = (address) => {
    const splitedAddress = address.replace(',', ' ').replace('-', ' ').split(" ")
    return splitedAddress.reduce((rec, acc) => rec + "%20" + acc)


};
