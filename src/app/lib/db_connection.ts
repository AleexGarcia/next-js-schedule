const mongoose = require('mongoose');

if (!process.env.URI_DATABASE) {
    throw new Error("Mongodb connection string not defined");
}

async function connect() {
    try {
        await mongoose.connect(process.env.URI_DATABASE);
        console.log("Mongodb Connected!");
    } catch (error) {
        console.log(error);
    }
}

async function disconnect() {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
    }
}

export const dbConnection = {
    connect,
    disconnect
};