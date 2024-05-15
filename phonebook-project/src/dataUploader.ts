// import mongoose, { ConnectOptions } from 'mongoose';
// import { PhonebookUserModel } from './models/PhonebookUser';
// import { config } from 'dotenv';

// config();
// console.log(process.env.DB_URI);

// export async function connectToCluster(uri) {
//     try {
//         console.log('Connecting to MongoDB Atlas cluster...');
//         await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         } as ConnectOptions); // Add 'as ConnectOptions' to specify the type
//         console.log('Successfully connected to MongoDB Atlas!');
//     } catch (error) {
//         console.error('Connection to MongoDB Atlas failed!', error);
//         process.exit(1);
//     }
// }


// export async function uploadData() {
//     const dbURI = process.env.DB_URI;
//     if (!dbURI) {
//         throw new Error('DB_URI environment variable is not defined');
//     }

//     // Example data to upload
//     const userData = {
//         name: 'John Doe',
//         phone1: '+1234567890',
//         phone2: '+9876543210',
//         address: {
//             country: 'USA',
//             city: 'New York',
//             street: '123 Main St',
//             zip: '10001',
//         },
//     };

//     // Create a new PhonebookUser document
//     await PhonebookUserModel.create(userData);

//     console.log('Data uploaded');
// }
