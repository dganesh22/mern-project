const mongoose = require('mongoose')

const connectDb = async () => {
    if (process.env.MODE === "development") {
        await mongoose.connect(process.env.MONGO_DEV)
            .then(res => {
                console.log(`mongo development db connected`)
            }).catch(err => console.log(err.message))
    } else if (process.env.MODE === "production") {
        await mongoose.connect(process.env.MONGO_CLOUD)
            .then(res => {
                console.log(`mongo production db connected`)
            }).catch(err => console.log(err.message))
    } else {
        console.log(`choose proper mode`)
    }
}

module.exports = connectDb