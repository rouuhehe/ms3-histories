import uuid
import random
from faker import Faker
from pymongo import MongoClient
import requests
from datetime import datetime, timedelta

fake = Faker("es_EN")

client = MongoClient("mongodb://localhost:27017") 
db = client["histories_db"] 
collection = db["histories"]

print("🌱 Fetching pets from MS1 with pagination...")
MS1_URL = "http://ms1-pets:8000/mascotas"  
page = 1
limit = 1000
pet_ids = []

while True:
    resp = requests.get(MS1_URL, params={"page": page, "limit": limit})
    if resp.status_code != 200:
        raise RuntimeError(f"Failed to fetch pets: {resp.status_code}")

    pets = resp.json()
    if not pets:
        break

    for pet in pets:
        pet_ids.append(pet["id"])

    print(f"  ➡️ Page {page}: total pets so far {len(pet_ids)}")
    page += 1

print(f"Retrieved {len(pet_ids)} pets from MS1")

print("Inserting histories...")
bulk_docs = []
for pet_id in pet_ids:
    for _ in range(10):  # 10 histories per pet
        fecha = fake.date_between(start_date="-2y", end_date="today")
        evento = fake.sentence(nb_words=6)
        doc = {
            "pet_id": pet_id,  
            "date": fecha.isoformat(),
            "event": evento,
            "images": [f"https://placedog.net/500/400?id={random.randint(1,240)}" for _ in range(random.randint(0,3))],
            "details": fake.text(max_nb_chars=100),
            "user_id": str(uuid.uuid4()),
            "meta": {
                "weight": random.randint(1, 50),
                "comments": fake.word(),
            },
            "createdAt": datetime.utcnow(), 
            "updatedAt": datetime.utcnow(),
        }
        bulk_docs.append(doc)

    if len(bulk_docs) >= 1000:
        collection.insert_many(bulk_docs)
        print(f" Inserted {len(bulk_docs)} histories so far...")
        bulk_docs = []

if bulk_docs:
    collection.insert_many(bulk_docs)

print("Seeding complete.")
