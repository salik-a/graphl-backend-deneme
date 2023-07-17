query getAllUser{
  users{
    id,
    username,
    email,
    events {
      id,
      date,
      title
        }
    }
}

query getUser{
  user(id: 3){
    id,
    username
    }
}

query getAllEvents{
  events{
    id,
    title,
    participants {
      id,
      user_id,
        }
    user{
      id
      username
        }
    location{
      id
      name
        }
    }
}

query getEvent{
  event(id: 3){
    id,
    title
    }
}

query getAllLocations{
  locations {
    id,
    name
    }
}
}

query getLocation{
  location (id: 3){
    id,
    name
}
}

query getAllParticipants{
  participants {
    id,
    user_id
}
}
}

query getParticipant{
  participant (id: 3){
    id,
    user_id
}
}