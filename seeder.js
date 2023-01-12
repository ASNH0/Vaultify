const mongoose = require("mongoose");
const users = require("./data/users");
const usersModel = require("./models/userModel");
const storesModel = require("./models/storeModel");
const stores = require("./data/stores");
const dbConnect = require("./dbConnect");
const itemsModel = require("./models/itemsModel");
const items = require("./data/items");
const importALL = async ()=>{

    //be careful when using this seeder because it will delete all and add new data
    
    try {
            await storesModel.deleteMany();
            await usersModel.deleteMany();
            await itemsModel.deleteMany();

            const createdUsers = await usersModel.insertMany(users);
            
            const adminUser = createdUsers[0]._id

            const sampleItems = items.map(item =>{
                    return {...item , user: adminUser}
            })
            const storesLoop = stores.map(store =>{
                return {...store , owner:adminUser}
            })
                await itemsModel.insertMany(sampleItems);
                await storesModel.insertMany(storesLoop);
            console.log("imported successfully")
            process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
        
    }
}

importALL()