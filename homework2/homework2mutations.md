query getUsers {
  users {
    id,
    name,
    age
  }
}

mutation createUser {
  createUser(data: {name: "Çağrı Salik", age: 23}) {
    id,
    name,
    age
  }
}

mutation updateUser {
  updateUser(id:"UFOENUZJx122CQjtUWKVO", data: {name: " Salik", age: 23}) {
    id,
    name,
    age
  }
}

mutation deleteUser {
  deleteUser(id:"RjTecdhwX99jPiQjY_Q4_") {
    id,
    name,
    age
  }
}

mutation deleteAllUser {
  deleteAllUsers {
    count
  }
}