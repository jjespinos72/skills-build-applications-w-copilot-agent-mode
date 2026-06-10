from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017')
db = client['octofit_db']

print('Collections:')
for name in db.list_collection_names():
    print('-', name)
    doc = db[name].find_one()
    print('  sample:', doc)

client.close()
