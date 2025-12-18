import { Hono } from "hono";
import {
    ApiResponse,
    AppEnv,
    LoginIncomingData,
    PublicUser,
    RegisterIncomingData,
    User,
} from "../types";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../db";
import { hashPassword, verifyPassword } from "../password";
import { getCookie, setCookie } from "hono/cookie";
import { fail, ok } from "../utils/apiResponse";

export function registerAuthRoutes(app: Hono<AppEnv>) {
    //* Register user

    app.post("/register", async (c) => {
        const body = await c.req.json<RegisterIncomingData>();

        const email = body.email.trim().toLowerCase();
        const password = body.password;

        const [existing] = await pool.query<RowDataPacket[]>(
            "SELECT id FROM users WHERE email = ? LIMIT 1",
            [email]
        );

        if (existing.length) {
            return c.json(fail("Почта уже используется", 400));
        }

        const passwordHash = await hashPassword(password);

        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO users (email, password_hash) VALUES (?, ?)",
            [email, passwordHash]
        );

        const id = result.insertId;

        const [rows] = await pool.query<RowDataPacket[]>(
            "SELECT id, email, password_hash, created_at FROM users WHERE id = ?",
            [id]
        );

        const user = rows[0] as User;

        const publicUser: PublicUser = {
            id: user.id,
            email: user.email,
            created_at: user.created_at,
        };

        return c.json(ok<PublicUser>(publicUser));
    });

    //* User login

    app.post("/login", async (c) => {
        const body = await c.req.json<LoginIncomingData>();

        const email = body.email.trim().toLowerCase();
        const password = body.password;

        const [rows] = await pool.query<RowDataPacket[]>(
            "SELECT id, email, password_hash, created_at FROM users WHERE email = ? LIMIT 1",
            [email]
        );

        if (!rows.length) {
            return c.json(
                fail("Пользователь с такими данными не найден", 401),
                401
            );
        }

        const user = rows[0] as User;

        const isValid: boolean = await verifyPassword(
            password,
            user.password_hash
        );

        if (!isValid) {
            return c.json(fail("Ошибка входа", 401));
        }

        const sessionId = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

        await pool.query(
            "INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)",
            [sessionId, user.id, expiresAt]
        );
        setCookie(c, "sid", sessionId, {
            httpOnly: true,
            sameSite: "Lax",
            path: "/",
            expires: expiresAt,
        });

        const publicUser: PublicUser = {
            id: user.id,
            email: user.email,
            created_at: user.created_at,
        };

        return c.json(ok<PublicUser>(publicUser));
    });

    //* User logout

    app.post("/logout", async (c) => {
        const sid = getCookie(c, "sid");

        if (sid) await pool.query("DELETE FROM sessions WHERE id = ?", [sid]);

        setCookie(c, "sid", "", {
            httpOnly: true,
            sameSite: "Lax",
            path: "/",
            expires: new Date(0),
        });
        return c.json(ok<string>("Выход выполнен"));
    });

    //* Protected layer

    app.use("/protected/*", async (c, next) => {
        const sid = getCookie(c, "sid");

        if (!sid) return c.json(fail("Неавторизован", 401), 401);

        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT u.id, u.email, u.created_at
            FROM sessions s
            JOIN users u ON u.id = s.user_id
            WHERE s.id = ? AND s.expires_at > NOW()
            LIMIT 1`,
            [sid]
        );

        if (!rows.length) return c.json(fail("Неавторизован", 401), 401);

        const user = rows[0] as PublicUser;

        c.set("user", user);

        await next();
    });

    //* Protected route for logging user through cookies

    app.get("/protected/me", async (c) => {
        const user = c.get("user") as PublicUser;
        return c.json(ok<PublicUser>(user));
    });
}
