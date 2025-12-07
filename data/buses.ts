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
            "U5 Hotel",
            "Morning Sky Hotel",
            "Hotel the Designers DDP",
            "Hotel the Designers Dongdaemun",
            "Toyoko Inn Seoul Dongdaemun",
            "The Splaisir Seoul Dongdaemun",
            "Mangrove Dongdaemun Hotel",
            "K Guest House Dongdaemun Premium"
        ],
        description: "Premium limousine bus connecting Incheon Airport to Seoul's major shopping and transportation hubs: Dongdaemun Fashion Town, Myeongdong, and Seoul Station. It stops at popular hotels including the Toyoko Inn Dongdaemun, Baiton Hotel, and PJ Hotel.",
        captainTip: "Unlike bus 6015, this route stops at Seoul Station and Sookmyung Women's Univ., making it ideal for travelers heading to these areas. Since it passes through heavy traffic zones in Namdaemun and Myeongdong, allow extra time for travel during evening rush hours."
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
        description: "Essential limousine bus for travelers heading to northern Seoul's youth culture hubs (Hongdae, Sinchon) and historical center (Jongno, Dongdaemun). It stops near major universities and key tourist spots like Gwanghwamun and Dongdaemun Design Plaza (DDP).",
        captainTip: "This is a very busy route popular with students and backpackers. Since it starts from Cheongnyangni/Dongdaemun and passes through Jongno, it may already be full by the time it reaches Hongdae during peak hours. If you are catching the bus at Hongik Univ. Station to the airport, allow extra time for the next bus or consider the airport train (AREX)."
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
        description: "Popular limousine bus route connecting Incheon Airport to Seoul's central business and shopping districts, including Mapo, Namdaemun, and Myeongdong. It stops right in front of major hotels like the ibis Ambassador Myeongdong and Royal Hotel, making it convenient for tourists.",
        captainTip: "This bus is frequently used by tourists staying in Myeongdong. During rush hours (8-9 AM, 5-7 PM), traffic congestion in downtown Seoul can cause delays, so please plan accordingly. If traveling from the airport, buying tickets at the ticket booth or kiosk is recommended to secure your seat."
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
        description: "Popular limousine bus route connecting Incheon Airport to Seoul's central business and shopping districts, including Mapo, Namdaemun, and Myeongdong. It stops right in front of major hotels like the ibis Ambassador Myeongdong and Royal Hotel, making it convenient for tourists.",
        captainTip: "This bus is frequently used by tourists staying in Myeongdong. During rush hours (8-9 AM, 5-7 PM), traffic congestion in downtown Seoul can cause delays, so please plan accordingly. If traveling from the airport, buying tickets at the ticket booth or kiosk is recommended to secure your seat."
    },
    {
        id: "6702",
        busNo: "6702",
        direction: "Dongdaemun&Namsan",
        price: "18,000 KRW",
        interval: "30-40 min",
        hotels: [
            "Summit Dongdaemun hotel",
            "Splaisir Dongdaemun hotel",
            "JW Marriott Dongdaemun hotel",
            "Ambassador Seoul Pullman hotel",
            "Grand Hyatt Seoul hotel",
            "Shilla hotel",
            "Hotel Naru Seoul",
            "Roynet hotel Seoul Mapo",
            "Shilla Stay Mapo",
            "Glad hotel Mapo",
            "Hotel Modak Seoul Namdaemun",
            "Hotel Migliore",
            "Mangrove Dondaemun",
            "Seoul Garden Hotel"
        ],
        description: "Premium K-Limousine service connecting Incheon Airport to major hotels in Seoul Station, Namsan, and Dongdaemun. It stops directly at luxury hotels like The Shilla Seoul, Grand Hyatt Seoul, and JW Marriott Dongdaemun, offering spacious seating and excellent service.",
        captainTip: "This route is ideal for travelers with heavy luggage staying at luxury hotels, as it drops you off right at the hotel entrance. It also offers a scenic drive through Namsan Mountain, providing beautiful views of Seoul Tower on your way to the city."
    },
    {
        id: "6703",
        busNo: "6703",
        direction: "Gangnam",
        price: "18,000 KRW",
        interval: "50-60 min",
        hotels: [
            "Hotel Cappuccino",
            "Hotel Peyto Samseong",
            "The Designers Gangnam premier",
            "Samjung hotel",
            "Best Western Premier Gangnam hotel",
            "Dormy Inn Seoul Gangnam",
        ],
        description: "Premium limousine bus connecting Incheon Airport to the Gangnam and COEX business districts. It stops at major luxury hotels including the InterContinental, Novotel Ambassador, and Josun Palace, offering spacious seating for a comfortable ride.",
        captainTip: "This route passes through the busy Teheranno area, so allow extra travel time during rush hours. Since the bus departs from Terminal 2 before stopping at Terminal 1, passengers starting at T2 have priority for seat selection."
    }
];
