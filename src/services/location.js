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

  async createLocation ({ fields, latitude, longitude }) {
    const address = await Address.create({ ...fields })
    const location = await Location.create({ address_id: address.address_id, latitude_location: latitude, longitude_location: longitude })
    return location
  }

  async getAllLocations () {
    const locationList = await Location.findAll()

    const formattedLocations = []

    for (const location of locationList) {
      const address = await Address.findByPk(location.address_id)
      console.log(address)
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
