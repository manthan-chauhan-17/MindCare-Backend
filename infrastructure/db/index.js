const mongoose = require('mongoose');

const uri = `mongodb+srv://manthan:11082003@mindcarecluster.qoyvt.mongodb.net/MindCareDB?retryWrites=true&w=majority&appName=MindCareCluster;`

const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB Atlas");
    } catch (err) {
        console.error("Failed to connect to MongoDB Atlas", err);
    }
};

module.exports = {
    connectToDatabase
};
