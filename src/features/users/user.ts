import { z, validate, type Validators } from '@core/zod';

export type UserBase = {
    username: string;
    email: string;
    phone: string;
    skills: string[];
    hobbies: string[];
};

export type User = {
    id: number;
} & UserBase;

export const userBaseValidator: Validators<UserBase> = {
    username: (v) => validate(z.string().min(3).max(128), v),
    email: (v) => validate(z.string().email().max(128), v),
    phone: (v) => validate(z.string().min(1).max(20), v),
    skills: (v) => validate(z.array(z.string().min(1).max(64)).min(1).max(32), v),
    hobbies: (v) => validate(z.array(z.string().min(1).max(64)).min(1).max(32), v),
};
