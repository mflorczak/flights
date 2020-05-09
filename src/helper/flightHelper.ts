import { Flight } from '@/store/models'

export function mapResponseOnFlight(data: any): Flight {
    return {
      id: data.id,
      airLineImgUrl: data.carrier.ImageUrl,
      arrivalDateTime: data.arrivalDateTime,
      departureDateTime: data.departureDateTime,
      destinationCity: data.destinationStation.city,
      originCity: data.originStation.city,
      flightNumber: data.flightNumber
    }
}

