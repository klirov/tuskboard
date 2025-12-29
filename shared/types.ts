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

export type Board = {
    id: number;
    user_id: number;
    title: string;
    description?: string;
    created_at: Date;
    updated_at: Date;
    color?: string;
    is_archived: boolean;
    order?: number;
};

export type Status = 'backlog' | 'to-do' | 'in-progress' | 'awaiting' | 'done';

export type ActiveStatus = 'backlog' | 'to-do' | 'in-progress' | 'awaiting';

export type Task = {
    id: number;
    board_id: number;
    title: string;
    description?: string;
    tags?: string[];
    order?: number;
    status: Status;
    created_at: Date;
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
