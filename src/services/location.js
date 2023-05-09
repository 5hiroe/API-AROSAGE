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
}
