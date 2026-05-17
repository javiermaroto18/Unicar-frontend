// Añadir al final de mockData.js

export const MOCK_PROFILE_USER = {
    name:       'Alex Johnson',
    firstName:  'Alex',
    lastName:   'Johnson',
    email:      'alex@alumnos.ucm.es',
    avatar:     'https://lh3.googleusercontent.com/aida-public/AB6AXuCSHedzDkYYeCPCAvkaafLpvuvYMhKh-pNEFdGC_oNVMdcu_GxxPIVcpQD4JPmAK5VMJJT014GyipamelNuTEZ9r9nj7xI7PunoQy6BypniVbu3bWjUgW6bYlA9tpG-ycJS4Yb58aL-JXpq9faT9Ow7BJoF65zgW3kbHbGD34b9h32juWCf9MgbYNSiR7BzCUyAsdfVmjOVKf-nAle9zCPVoQewvrLsz_lprP_eIXvVHdG8omiukiKRwwt_VWRX0FrcsixDLGCXoUM',
    university: 'Universidad Complutense de Madrid',
    faculty:    'Facultad de Medicina',
    rating:     4.8,
    tripCount:  23,
    bio:        '',
};

export const MOCK_VEHICLE = {
    brand: 'Toyota',
    model: 'Corolla',
    color: 'Gris',
    plate: '1234 ABC',
    year:  2019,
    seats: 4,
};

export const MOCK_REVIEWS = [
    {
        name:   'Maria G.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB0n_uV8hBUWIRtUeC5zuR2HCyry-w-p4S7enBMuE2c-QtUEsUT2NXBH9UQcBNZrCKhrgU0FZswl9WC_rGuEn-DRXDcJAZwwRo9lVLzOYd_BHgPOEOGD3qr4WwaiUEaLTZXlCRy1phxcTpTXIVKSUAo1L_er-9ygMqfC9_U8yQ5YKGwhVj7HPFb3ZQuzrbBgcBuOiHczlO_SfJ0bMWsb_IneFWatiM3aop5rR4s6yy_eufAHcxvZTpebJDlXjx73pKjOvgapDt8Lo',
        date:   '19 de mayo',
        route:  'Estación Sur → Campus Norte',
        score:  5,
        text:   'Muy puntual y buen conductor. El coche estaba limpio y llegamos antes de lo previsto. Repetiré sin duda.',
    },
    {
        name:   'Carlos R.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHGn6NZF77LeiIXM-y8UD7dFnN4pE6zXSbmc2lHwF081s49F1pkLLMf6bFMwrxuLdbAW1rhRiF0iJ4L-SXovAdlqmZMZltDZPcQeYJ_bOwRpulajA3pybRwqvLLoC4ZGGKaCkZH3OeqLFrgzwmacg5BZOwT5POuTgG_jBrW167_On4lV6eBoM3Rl6A637mmidf0xT0OjmBhPRy0-lSlKErABnod5MQN7v4uaNAck_289OtcnAi5zDAJh8ir7WzBZ4K3t4Af0Rprqc',
        date:   '15 de mayo',
        route:  'Campus Norte → Facultad de Medicina',
        score:  4.5,
        text:   'Todo perfecto, muy agradable de trato. Pequeño retraso de 5 minutos pero avisó con antelación por el chat.',
    },
];
