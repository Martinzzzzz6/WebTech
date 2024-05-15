import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import User from "../models/user";

export const collections: { users?: mongoDB.Collection<User> } = {};

export async function connectToDatabase() {
    dotenv.config();

    // Create a new MongoDB client with the connection string from .env
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    // Connect to the cluster
    await client.connect();

    const db = client.db(process.env.DB_NAME);
    
    await applyUserSchemaValidation(db);

    const gamesCollection = db.collection<User>(process.env.PHONEBOOK_COLLECTION_NAME);

    collections.users = gamesCollection;

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`,
    );
}

async function applyUserSchemaValidation(db: mongoDB.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "phone1", "address"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                phone1: {
                    bsonType: "string",
                    description: "'phone1' is required and is a string",
                },
                phone2: {
                    bsonType: "string",
                    description: "'phone2' is optional and is a string",
                },
                address: {
                    bsonType: "object",
                    required: ["country", "city", "street", "zip"],
                    properties: {
                        country: {
                            bsonType: "string",
                            description: "'country' is required and is a string",
                        },
                        city: {
                            bsonType: "string",
                            description: "'city' is required and is a string",
                        },
                        street: {
                            bsonType: "string",
                            description: "'street' is required and is a string",
                        },
                        zip: {
                            bsonType: "string",
                            description: "'zip' is required and is a string",
                        },
                    },
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it 
    await db.command({
        collMod: process.env.PHONEBOOK_COLLECTION_NAME,
        validator: jsonSchema
    }).catch(async (error: any) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection(process.env.PHONEBOOK_COLLECTION_NAME, {validator: jsonSchema});
        }
    });
}