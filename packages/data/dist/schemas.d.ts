/**
 * Zod schemas validating data from providers.
 * Replace when hooking up to a real API.
 */
import { z } from 'zod';
export declare const assetSchema: z.ZodObject<{
    id: z.ZodString;
    rank: z.ZodNumber;
    symbol: z.ZodString;
    name: z.ZodString;
    price: z.ZodNumber;
    change24h: z.ZodNumber;
    volume24h: z.ZodNumber;
    marketCap: z.ZodNumber;
    spark: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    id: string;
    rank: number;
    name: string;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
    spark?: number[] | undefined;
}, {
    symbol: string;
    id: string;
    rank: number;
    name: string;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
    spark?: number[] | undefined;
}>;
export declare const candleSchema: z.ZodObject<{
    t: z.ZodNumber;
    o: z.ZodNumber;
    h: z.ZodNumber;
    l: z.ZodNumber;
    c: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    t: number;
    o: number;
    h: number;
    l: number;
    c: number;
}, {
    t: number;
    o: number;
    h: number;
    l: number;
    c: number;
}>;
export declare const assetArraySchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    rank: z.ZodNumber;
    symbol: z.ZodString;
    name: z.ZodString;
    price: z.ZodNumber;
    change24h: z.ZodNumber;
    volume24h: z.ZodNumber;
    marketCap: z.ZodNumber;
    spark: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    id: string;
    rank: number;
    name: string;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
    spark?: number[] | undefined;
}, {
    symbol: string;
    id: string;
    rank: number;
    name: string;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
    spark?: number[] | undefined;
}>, "many">;
export declare const candleArraySchema: z.ZodArray<z.ZodObject<{
    t: z.ZodNumber;
    o: z.ZodNumber;
    h: z.ZodNumber;
    l: z.ZodNumber;
    c: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    t: number;
    o: number;
    h: number;
    l: number;
    c: number;
}, {
    t: number;
    o: number;
    h: number;
    l: number;
    c: number;
}>, "many">;
