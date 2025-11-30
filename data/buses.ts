export interface Bus {
    id: string;
    busNo: string;
    direction: string;
    price: string;
    interval: string;
    hotels: string[];
    description: string;
    captainTip: string;
}

export const buses: Bus[] = [
    {
        id: "6001",
        busNo: "6001",
        direction: "Dongdaemun",
        price: "17,000 KRW",
        interval: "10-20 min",
        hotels: [
            "Baiton Hotel",
            "Novotel Ambassador Dongdaemun",
            "Nine Tree by Parnas Seoul Dongdaemun",
            "Travelodge Dongdaemun Hotel",
            "U5 Hotel"
        ],
        description: "Direct limousine bus connecting Incheon Airport to major hotels in Dongdaemun. Comfortable seats and ample luggage space.",
        captainTip: "This bus is very popular during weekends. If you are departing from Terminal 2, you have a better chance of getting a good seat."
    },
    {
        id: "6002",
        busNo: "6002",
        direction: "Cheongnyangni",
        price: "17,000 KRW",
        interval: "10-20 min",
        hotels: [
            "JW Marriott Dongdaemun Hotel",
            "Four Seasons Hotel",
            "Holiday Inn Express Hongdae",
            "L7 Hongdae by Lotte"
        ],
        description: "Fastest way to Dongdaemun, Jongno, Hongae.",
        captainTip: "Traffic can be heavy near Seoul downtown during rush hour (5 PM - 7 PM)."
    },
    {
        id: "6015(weekday)",
        busNo: "6015(weekday)",
        direction: "Myeongdong",
        price: "17,000 KRW",
        interval: "10-20 min",
        hotels: [
            "IBIS Ambassador Myeongdong",
            "Royal Hotel",
            "Kukdo Hotel",
            "PJ Hotel",
            "G3 Hotel",
            "Voco Seoul Myeongdong Hotel",
            "Seoul Garden Hotel"
        ],
        description: "Premium limousine to Seoul Myeongdong.",
        captainTip: "It is perfect for travelers in Myeongdong."
    },
    {
        id: "6015(weekend)",
        busNo: "6015(weekend)",
        direction: "Myeongdong",
        price: "17,000 KRW",
        interval: "10-20 min",
        hotels: [
            "IBIS Ambassador Myeongdong",
            "Royal Hotel",
            "Kukdo Hotel",
            "PJ Hotel",
            "G3 Hotel",
            "Voco Seoul Myeongdong Hotel",
            "Seoul Garden Hotel"
        ],
        description: "Premium limousine to Seoul Myeongdong.",
        captainTip: "It is perfect for travelers in Myeongdong."
    }
];
