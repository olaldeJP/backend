export async function isAdmin(user) {
  if (user.role === "admin") {
    return true;
  } else {
    return false;
  }
}
export async function isPremium(user) {
  if (user.role === "premium") {
    return true;
  } else {
    return false;
  }
}
export async function isUser(user) {
  if (user.role === "user") {
    return true;
  } else {
    return false;
  }
}
