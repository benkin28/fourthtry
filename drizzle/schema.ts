import { pgTable, pgEnum, serial, text, timestamp, varchar, foreignKey, integer } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"
export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])


export const todos = pgTable("todos", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	date: timestamp("date", { mode: 'string' }).defaultNow(),
	status: varchar("status", { length: 10 }).default('PENDING'),
});

export const countries = pgTable("countries", {
	countryname: text("countryname").primaryKey().notNull(),
	continent: text("continent").notNull(),
});

export const cities = pgTable("cities", {
	name: text("name").primaryKey().notNull(),
	inhabitants: integer("inhabitants").notNull(),
	countryname: text("countryname").references(() => countries.countryname, { onDelete: "cascade" } ),
});

export type ToDo= typeof todos.$inferSelect