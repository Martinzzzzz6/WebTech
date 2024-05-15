"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.collections = void 0;
const mongoDB = __importStar(require("mongodb"));
const dotenv = __importStar(require("dotenv"));
exports.collections = {};
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv.config();
        // Create a new MongoDB client with the connection string from .env
        const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
        // Connect to the cluster
        yield client.connect();
        const db = client.db(process.env.DB_NAME);
        yield applyUserSchemaValidation(db);
        const gamesCollection = db.collection(process.env.PHONEBOOK_COLLECTION_NAME);
        exports.collections.users = gamesCollection;
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
    });
}
exports.connectToDatabase = connectToDatabase;
function applyUserSchemaValidation(db) {
    return __awaiter(this, void 0, void 0, function* () {
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
        yield db.command({
            collMod: process.env.PHONEBOOK_COLLECTION_NAME,
            validator: jsonSchema
        }).catch((error) => __awaiter(this, void 0, void 0, function* () {
            if (error.codeName === 'NamespaceNotFound') {
                yield db.createCollection(process.env.PHONEBOOK_COLLECTION_NAME, { validator: jsonSchema });
            }
        }));
    });
}
//# sourceMappingURL=database.services.js.map