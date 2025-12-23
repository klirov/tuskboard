export type AppEnv = {
    Variables: {
        user: PublicUser;
    };
};

export type User = {
    id: number;
    email: string;
    password_hash: string;
    created_at: Date;
};

export type PublicUser = Omit<User, 'password_hash'>;

export type Status = 'to-do' | 'in-progress' | 'awaiting' | 'done';

export type Task = {
    id: number;
    user_id: number;
    title: string;
    description?: string;
    tags?: string[];
    order?: number;
    status: Status;
    created_at: string;
};

export type RegisterIncomingData = {
    email: string;
    password: string;
};

export type LoginIncomingData = {
    email: string;
    password: string;
};

export type ApiResponse<T> = {
    ok: boolean;
    status: number;
    data: T;
    message?: string;
};
