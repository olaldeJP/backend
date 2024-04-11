export async function statusCode(req, res, next) {
  res["created"] = (payload) => {
    res.status(201).json({ status: "success", payload });
  };
  res["result"] = (payload) => {
    res.status(200).json({ status: "success", payload });
  };
  res["accepted"] = () => {
    res.status(202).json({ status: "success" });
  };
  next();
}

export async function returnSuccess(req, res) {
  res.accepted();
}

export async function createStatusUser(req, res) {
  res.created(req.user);
}

export async function successCreateProduct(req, res) {
  res.created(res.products);
}
export async function succesResultProduct(req, res) {
  res.result(res.products);
}
export async function returnCookie(req, res) {
  res.result(res.cookie);
}
export async function returnSession(req, res) {
  res.result(res.session);
}
export async function successCart(req, res) {
  res.result(res.cart);
}
export async function succesPurchase(req, res) {
  res.result(res.ticket);
}
