
import { integer, pgTable, varchar,date } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits:integer().default(10),
});

export const projectTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar({ length: 255 }).notNull().unique(),
  userInput : varchar(),
  deviceInput : varchar(),
  createdAt: date().defaultNow(),
  userId: varchar().references(()=>usersTable.email).notNull(),
})
