import type { ApiResponse } from "../types";

export function ok<T>(data: T, status = 200): ApiResponse<T> {
    return {
        ok: true,
        status,
        data,
    };
}

export function fail<T>(message: string, status = 400): ApiResponse<T> {
    return {
        ok: false,
        status,
        data: null as unknown as T,
        message,
    };
}
