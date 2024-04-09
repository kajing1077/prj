export class User {
    constructor(
        public readonly id: number,
        public email: string,
        public encryptedPassword: string
    ) { }

    static async findOne(params: { email: string }) {
        const [filterEmail] = MOCK_USERS.filter((user) => user.email === params.email);
        return Promise.resolve(filterEmail);
    }

    static async find(params: { email: string }) {
        const filterEmail = MOCK_USERS.filter((user) => user.email === params.email);
        return Promise.resolve(filterEmail);
    }

    static async remove(params: { id: number }) {
        const index = MOCK_USERS.findIndex((user) => user.id === params.id);
        if (index !== -1) {
            const [user] = MOCK_USERS.splice(index, 1);
            return Promise.resolve(user);
        }
        return Promise.resolve(null);
    }

    static async update(id: number, newData: Partial<User>) {
        const index = MOCK_USERS.findIndex((user) => user.id === id);
        if (index !== -1) {
            MOCK_USERS[index] = { ...MOCK_USERS[index], ...newData } as User;
            return Promise.resolve(MOCK_USERS[index]);
        }
        return Promise.resolve(null);
    }
}

export const MOCK_USERS: User[] = [];