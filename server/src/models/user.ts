// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class User {
    _id?: ObjectId;
    name: string;
    phone1: string;
    phone2?: string;
    address: {
        country: string;
        city: string;
        street: string;
        zip: string;
    };
}
