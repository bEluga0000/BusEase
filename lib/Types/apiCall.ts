export interface BusesSchema {
    busId:string
    busNumber:string,
    from:string
    destination: string,
    departureTime: string,
    price: number,
    journeyTime: number,
    comapny: {
        name: string
    }
}
export interface BusDetailSchema {
    busId: string
    busNumber: string,
    from: string
    destination: string,
    departureTime: string,
    price: number,
    journeyTime: number,
    comapny: {
        name: string
    }
    seats:Seat[]
}
interface Seat{
    seatId:string
    position:string
    datesBooked:string[]
    seatNo:number
}