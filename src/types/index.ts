export type Image = {
  url: string
  alt?: string
}

type Facility = {
  code: string
  name?: string
}

export type Occupancy = {
  maxAdults: number
  maxChildren: number
  maxOverall?: number
}

export interface Hotel {
  id: string
  name: string
  description: string
  address1: string
  address2: string
  postcode: string
  town: string
  countryCode: string
  country: string
  facilities: Facility[]
  telephone: string
  email: string
  images: Image[]
  position: {
    latitue: string
    longitude: string
    timezone: string
  }
  starRating: string
}

export interface Room {
  bedConfiguration: string
  disabledAccess: boolean
  facilities: Facility[]
  id: string
  images: Image[]
  longDescription: string
  name: string
  occupancy: Occupancy
  shortDescription: string
}
