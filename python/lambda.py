people = [
    {"name": "Harry", "house": "Gryffindoe"},
    {"name": "Ginny", "house": "Tavel"}
]

people.sort(key=lambda person: person["house"])

print(people)
