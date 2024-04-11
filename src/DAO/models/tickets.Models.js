import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const tickeSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    code: { type: String, default: uuidv4 },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number },
    purchaser: { type: String, required: true },
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

const ticketModel = model("tickets", tickeSchema);

class TicketClassModel {
  #ticketDao;
  constructor(tickeDaoModel) {
    this.#ticketDao = tickeDaoModel;
  }
  async create(data) {
    const newTicket = await this.#ticketDao.create(data);
    return await this._toPojo(newTicket);
  }
  async readOneById(query) {
    const ticket = await this.#ticketDao.findById(query).lean();
    return ticket;
  }
  async readAllByEmail(query) {
    const array = await this.#ticketDao.find({ purchaser: query }).lean();
    return array;
  }

  async deleteOne(query) {
    const productDelete = await this.#ticketDao.findByIdAndDelete(query);
    return productDelete;
  }
  async deleteManyByEmail(query) {
    const productDelete = await this.#ticketDao.deleteMany({
      purchaser: query,
    });
    return productDelete;
  }
  async _toPojo(ticket) {
    return {
      _id: ticket._id,
      code: ticket.code,
      purchase_datetime: ticket.purchase_datetime,
      amount: ticket.amount,
      purchaser: ticket.purchaser,
    };
  }
}

export const ticketClassModel = new TicketClassModel(ticketModel);
