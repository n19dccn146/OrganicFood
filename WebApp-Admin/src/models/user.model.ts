export interface USER_MODEL {
    id: number,
    name: string,
    email: string,
    address: {
        street: string,
    },
}