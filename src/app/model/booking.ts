export interface Booking {
    id: number;
    destination: number;
    distance: number;
    from: number;
    journeyDate: string;
    numberOfTickets: number;
    user: number;
    tickets: Array<Passanger>;
}

export interface Passanger {
    name: String;
    age: number;
    gender: string;
    fare: number;
}