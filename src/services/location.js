import axios from 'axios'
import { Address } from '../models/address.js'
import { Location } from '../models/location.js'

export default class LocationService {
  constructor () {
    if (LocationService.instance instanceof LocationService) {
      return LocationService.instance
    }
    Object.freeze(this)
    LocationService.instance = this
  }

  async createLocation ({ fields }) {
    const address = await Address.create({ ...fields })
    const formatedAdress = `${fields.address1_address} ${fields.address2_address} ${fields.postal_code_address} ${fields.city_address}`
    const request = `https://api-adresse.data.gouv.fr/search/?q=${formatedAdress}&limit=1`
    const coordinates = await axios.get(request)
      .then(response => {
        return response.data.features[0].geometry.coordinates
      })
      .catch(error => {
        console.log(error)
      })
    const location = await Location.create({ address_id: address.address_id, latitude_location: coordinates[1], longitude_location: coordinates[0] })
    return location
  }

  async getAllLocations () {
    const locationList = await Location.findAll()

    const formattedLocations = []

    for (const location of locationList) {
      const address = await Address.findByPk(location.address_id)
      formattedLocations.push({
        location_id: location.location_id,
        address_id: location.address_id,
        latitude_location: location.latitude_location,
        longitude_location: location.longitude_location,
        city: address.city_address
      })
    }

    return formattedLocations
  }
}
