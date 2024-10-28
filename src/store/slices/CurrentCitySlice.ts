import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RefObject } from 'react'
import jsonCities from '../../resources/russian-cities.json'

export interface ICoord {
    lat: number
    lon: number
}

export interface IState {
    city: string
    cities: Record<string, any>[]
    cityCoords: ICoord,
    linkRef: RefObject<HTMLElement> | null
}

const initialState: IState = {
    city: 'Москва',
    cities: jsonCities,
    cityCoords: {
        lat: 55.751574,
        lon: 37.573856
    },
    linkRef: null
}

export const currentCitySlice = createSlice({
    name: 'currentcity',
    initialState,
    reducers: {
        addCurrentCity(state, action: PayloadAction<string>) {
            state.city = action.payload
        },

        changeCities(state, action: PayloadAction<Record<string, any>[]>) {
            state.cities = action.payload
        },

        setCitiesByDefault(state) {
            state.cities = jsonCities
        },

        changeCityCoords(state, action: PayloadAction<ICoord>) {
            state.cityCoords = action.payload
        },
        addLinkRef(state: any, action: PayloadAction<RefObject<HTMLElement> | null>) {
            state.linkRef = action.payload
        }
    }
})

export const { addCurrentCity, changeCities, setCitiesByDefault, changeCityCoords,addLinkRef } = currentCitySlice.actions
export default currentCitySlice.reducer