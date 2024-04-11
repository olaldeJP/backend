import { ticketClassModel } from "../DAO/models/tickets.Models.js";
class TicketsServices {
  #ticketDao;
  constructor(ticketModel) {
    this.#ticketDao = ticketModel;
  }
  async createTicket(total, emailUser) {
    const newTicket = await this.#ticketDao.create({
      amount: total,
      purchaser: emailUser,
    });
    return newTicket;
  }
}
export const ticketService = new TicketsServices(ticketClassModel);
