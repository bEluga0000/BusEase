import { pgTable, varchar, integer, uuid, text, timestamp, boolean, pgEnum, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const positionEnum = pgEnum("position", ["ws", "ms"]);
export const roleEnum = pgEnum("role", ["admin", "company", "user"]);
export const conformationTypeEnum = pgEnum("conformation_type", ["waitlist", "confirmed", "cancelled", "paymentNotDone"]);
export const methodsEnum = pgEnum("methods", ["upi", "debit", "credit"]);

export const company = pgTable("Company", {
  companyId: uuid("companyId").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  totalNumber: integer("totalNumber").default(0),
  userId: uuid("userId").notNull()
});

export const user = pgTable("User", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow(),
  role: roleEnum("role").default("user")
});

export const bus = pgTable("Bus", {
  busId: uuid("busId").primaryKey().defaultRandom(),
  busNumber: varchar("busNumber", { length: 255 }).unique().notNull(),
  busDriver: text("busDriver"),
  from: text("from").notNull(),
  destination: text("destination").notNull(),
  departureTime: text("departureTime").notNull(),
  journeyTime: real("journeyTime").notNull(),
  price: integer("price").notNull(),
  companyId: uuid("companyId").notNull()
});

export const seat = pgTable("Seat", {
  seatId: uuid("seatId").primaryKey().defaultRandom(),
  position: positionEnum("position").notNull(),
  datesBooked: timestamp("datesBooked").array(),
  busId: uuid("busId").notNull(),
  seatNo: integer("seatNo").unique().notNull(),
  ticketId: uuid("ticketId")
});

export const ticket = pgTable("Ticket", {
  id: uuid("id").primaryKey().defaultRandom(),
  conformation: conformationTypeEnum("conformation").default("paymentNotDone"),
  bookedDate: timestamp("bookedDate").defaultNow(),
  fare: integer("fare"),
  cancelledDate: timestamp("cancelledDate"),
  refundId: uuid("refundId").unique(),
  PaymentId: uuid("PaymentId").unique(),
  userId: uuid("userId").notNull(),
  busId: uuid("busId").notNull()
});

export const refund = pgTable("Refund", {
  id: uuid("id").primaryKey().defaultRandom(),
  Amount: integer("Amount").notNull(),
  Method: methodsEnum("Method").notNull()
});

export const payment = pgTable("Payment", {
  id: uuid("id").primaryKey().defaultRandom(),
  Amount: integer("Amount").notNull(),
  Method: methodsEnum("Method").notNull()
});

// Relations
export const companyRelations = relations(company, ({ many, one }) => ({
  user: one(user, {
    fields: [company.userId],
    references: [user.id],
  }),
  buses: many(bus),
}));

export const userRelations = relations(user, ({ many }) => ({
  companies: many(company),
  tickets: many(ticket),
}));

export const busRelations = relations(bus, ({ one, many }) => ({
  company: one(company, {
    fields: [bus.companyId],
    references: [company.companyId],
  }),
  seats: many(seat),
  tickets: many(ticket),
}));

export const seatRelations = relations(seat, ({ one }) => ({
  bus: one(bus, {
    fields: [seat.busId],
    references: [bus.busId],
  }),
  ticket: one(ticket, {
    fields: [seat.ticketId],
    references: [ticket.id],
  }),
}));

export const ticketRelations = relations(ticket, ({ one, many }) => ({
  user: one(user, {
    fields: [ticket.userId],
    references: [user.id],
  }),
  bus: one(bus, {
    fields: [ticket.busId],
    references: [bus.busId],
  }),
  seats: many(seat),
  refund: one(refund, {
    fields: [ticket.refundId],
    references: [refund.id],
  }),
  payment: one(payment, {
    fields: [ticket.PaymentId],
    references: [payment.id],
  }),
}));

export const refundRelations = relations(refund, ({ one }) => ({
  ticket: one(ticket, {
    fields: [refund.id],
    references: [ticket.refundId],
  }),
}));

export const paymentRelations = relations(payment, ({ one }) => ({
  ticket: one(ticket, {
    fields: [payment.id],
    references: [ticket.PaymentId],
  }),
}));