import { User } from './types/user';

class Database {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }

    findUserByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }

    findUserByUsername(username: string): User | undefined {
        return this.users.find(user => user.username === username);
    }

    getAllUsers(): User[] {
        return this.users;
    }

    clearUsers(): void {
        this.users = [];
    }
}

export const database = new Database();
