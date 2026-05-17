export const MOCK_USER = {
    name: 'Alex Johnson',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSHedzDkYYeCPCAvkaafLpvuvYMhKh-pNEFdGC_oNVMdcu_GxxPIVcpQD4JPmAK5VMJJT014GyipamelNuTEZ9r9nj7xI7PunoQy6BypniVbu3bWjUgW6bYlA9tpG-ycJS4Yb58aL-JXpq9faT9Ow7BJoF65zgW3kbHbGD34b9h32juWCf9MgbYNSiR7BzCUyAsdfVmjOVKf-nAle9zCPVoQewvrLsz_lprP_eIXvVHdG8omiukiKRwwt_VWRX0FrcsixDLGCXoUM',
};

export const MOCK_TRIPS = [
    {
        id: 1,
        driver: {
            name: 'Carlos Ruiz',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDow3eJ2khj79aI3iMgzd8jAnNKF8vT4mZETYkcsHWq5rGnJt_SR8o5NiH6bBwSSoCb65HbSnejsthwQj1ZACTKP2YQRFKqqsbRh4E3SRQtg_tKsyN6EmIkKHZmFSlOUFmK9A-Gvq_58wokDpcDw35N3JwC6WgqvkiOfRq-WwJfZcO5SOw3evWwJ0j0t5JR4QMzbHJX0J4-ddcywzktibNuZt-MsTkoCaztvBHo0nZUZhs7ovhne9Pws7pFPenKJ3DmS5UCawJRaro',
            rating: 4.9,
            faculty: 'Facultad de Derecho - UCM',
        },
        origin:      { place: 'Campus Norte',   time: '09:30' },
        destination: { place: 'CC City Center',  time: '10:15' },
        price: '8,00',
        seatsTotal: 4,
        seatsAvailable: 2,
    },
    {
        id: 2,
        driver: {
            name: 'Marta Gómez',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6gOMkviEjPkfgueJJrqeepTwtjMXCxbDcGsXyIiCgGArof3otNzl0E3YhiZANHQfFT5k8un_EzjwU6PoXLvP8B94zvvLUQUqcFGd94S_mc2slG6Nvq0dPjX9NwWEhCZEHB_VTrsp2Ej7A22WpnrBkBuK2TRp-iMOr0wSFNRYDxj0yJvGE9aG-Qnqu3-XYqs1k0S8QT3Kpmxi3L2IyV2rhpd3H-3cv-zEFc8ZlrFozALsOug2bHjykNbwKWkmK8SfnTtU7tFamNbg',
            rating: 4.8,
            faculty: 'Facultad de Medicina - UCM',
        },
        origin:      { place: 'CC City Center', time: '08:45' },
        destination: { place: 'Campus Sur',      time: '09:20' },
        price: '5,50',
        seatsTotal: 4,
        seatsAvailable: 1,
    },
    {
        id: 3,
        driver: {
            name: 'Javier López',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNppfoamjoG39ViLdkUNEjkNibvg1JUPk0ghpPQTEXzkvHZiRy9LPKEPteOMplCfSU9V_5o9PY_wAuR5exUaEndmyFx0k3GfucIwFJKo05eCHHC6FVggw0cnKx2ANBPvvYnS5YBgq_GeniDPvwB5LV4zQb5YyXmfWOwD65hJmhVhQ3P5lA78gh_pZI7tZiNJT2bl0da49yFYQApDRqRhXtzfogDjkBfb2ctanq7nacs3eYkxW58i1BGk1JFVT9ErYxDWOUYVA2m8I',
            rating: 4.7,
            faculty: 'E.T.S. Ingenieros Industriales',
        },
        origin:      { place: 'Campus Norte',  time: '14:15' },
        destination: { place: 'CC City Center', time: '15:00' },
        price: '12,00',
        seatsTotal: 4,
        seatsAvailable: 3,
    },
    {
        id: 4,
        driver: {
            name: 'Javier Carrasco',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNppfoamjoG39ViLdkUNEjkNibvg1JUPk0ghpPQTEXzkvHZiRy9LPKEPteOMplCfSU9V_5o9PY_wAuR5exUaEndmyFx0k3GfucIwFJKo05eCHHC6FVggw0cnKx2ANBPvvYnS5YBgq_GeniDPvwB5LV4zQb5YyXmfWOwD65hJmhVhQ3P5lA78gh_pZI7tZiNJT2bl0da49yFYQApDRqRhXtzfogDjkBfb2ctanq7nacs3eYkxW58i1BGk1JFVT9ErYxDWOUYVA2m8I',
            rating: 4.7,
            faculty: 'E.T.S. Ingenieros Informático',
        },
        origin:      { place: 'Campus Sur',  time: '7:00' },
        destination: { place: 'CC City Center', time: '8:15' },
        price: '3,00',
        seatsTotal: 4,
        seatsAvailable: 3,
    },
];

export const MOCK_MY_TRIPS = [
    {
        id: 1,
        status: 'upcoming',
        dateLabel: 'Mañana, 21 de Mayo',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHGn6NZF77LeiIXM-y8UD7dFnN4pE6zXSbmc2lHwF081s49F1pkLLMf6bFMwrxuLdbAW1rhRiF0iJ4L-SXovAdlqmZMZltDZPcQeYJ_bOwRpulajA3pybRwqvLLoC4ZGGKaCkZH3OeqLFrgzwmacg5BZOwT5POuTgG_jBrW167_On4lV6eBoM3Rl6A637mmidf0xT0OjmBhPRy0-lSlKErABnod5MQN7v4uaNAck_289OtcnAi5zDAJh8ir7WzBZ4K3t4Af0Rprqc',
        origin:      { time: '10:00', place: 'Residencia Campus Norte' },
        destination: { time: '10:45', place: 'Facultad de Medicina' },
        driver: {
            name: 'Carlos R.',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHGn6NZF77LeiIXM-y8UD7dFnN4pE6zXSbmc2lHwF081s49F1pkLLMf6bFMwrxuLdbAW1rhRiF0iJ4L-SXovAdlqmZMZltDZPcQeYJ_bOwRpulajA3pybRwqvLLoC4ZGGKaCkZH3OeqLFrgzwmacg5BZOwT5POuTgG_jBrW167_On4lV6eBoM3Rl6A637mmidf0xT0OjmBhPRy0-lSlKErABnod5MQN7v4uaNAck_289OtcnAi5zDAJh8ir7WzBZ4K3t4Af0Rprqc',
        },
        price: '3,00',
    },
    {
        id: 2,
        status: 'completed',
        dateLabel: 'Ayer, 19 de Mayo',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNuN6yhgjim6QPRbXv-dOlbwliHH3crm3wKyHQYtI4GhhOtiei6bb8PxjbJiwqBUQjVycR7K9otrcGfGi2IA0r9lXWXXNwdnd0q4rAKdt8zv80dS_0I15e6huesEE1scADkr8MO28Z4elF34QniwFMi-ofvyOTjAtIPugi8__pcDiVZVD2fFyXGXwQaxG6jMxg0DyoXHO3K0riX7s_nII6JRrue8gBFZIA82BRqINDMiUBcDlko6T15T16iSjXfaslANl9y1VlcNs',
        origin:      { time: '08:30', place: 'Estación Sur' },
        destination: { time: '09:15', place: 'Campus Norte' },
        driver: {
            name: 'Maria G.',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB0n_uV8hBUWIRtUeC5zuR2HCyry-w-p4S7enBMuE2c-QtUEsUT2NXBH9UQcBNZrCKhrgU0FZswl9WC_rGuEn-DRXDcJAZwwRo9lVLzOYd_BHgPOEOGD3qr4WwaiUEaLTZXlCRy1phxcTpTXIVKSUAo1L_er-9ygMqfC9_U8yQ5YKGwhVj7HPFb3ZQuzrbBgcBuOiHczlO_SfJ0bMWsb_IneFWatiM3aop5rR4s6yy_eufAHcxvZTpebJDlXjx73pKjOvgapDt8Lo',
        },
        price: '2,50',
    },
];
