const MongoClient = require('mongodb').MongoClient;
//const MONGODB_URI = 'mongodb+srv://OperadorICS:Ope@ics21001@inssacs5g.bfzkb.mongodb.net'; // or Atlas connection string
const MONGODB_URI = 'mongodb+srv://Sjaramillo:Jerr0725@santiago.w25ld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let cachedDb = null;
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

//conexion a la base de datos
function connectToDatabase(uri) {
    console.log('=> connect to database');
    if (cachedDb) {
        console.log('=> using cached database instance');
        return Promise.resolve(cachedDb);
    }
    return MongoClient.connect(uri)
        .then(db => {
            cachedDb = db; //For mongo client before v3
            cachedDb = db.db("sjaramilloDB"); //For mongo client v3,item is db i creted
            return cachedDb;
        });
}

const resolvers = {
    Query: {
        getProduct: async (ctx) => {
            try {
                const db = await connectToDatabase(MONGODB_URI);
                const resp = await db.collection('Products').findOne({
                    "_id": ObjectID(ctx.arguments._id)
                });
                return resp;
            } catch (error) {
                return error;
            }
        },
        getProducts: async () => {
            try {
                const db = await connectToDatabase(MONGODB_URI);
                const resp = await db.collection('Products').find().toArray();
                return resp;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        saveProduct: async (ctx) => {
            try {
                const data = ctx.arguments.input;
                const db = await connectToDatabase(MONGODB_URI);
                const resp = await db.collection('Products').insertOne(data);
                return resp.ops[0];
            } catch (error) {
                return error;
            }
        },
        removeProduct: async (ctx) => {
            try {
                const db = await connectToDatabase(MONGODB_URI);
                const resp = await db.collection('Products').findOneAndDelete({
                    "_id": ObjectID(ctx.arguments._id)
                });
                return resp.value;
            } catch (error) {
                return error;
            }
        },
        editProduct: async (ctx) => {
            try {
                const db = await connectToDatabase(MONGODB_URI);
                const resp = await db.collection('Products').findOneAndUpdate({
                    "_id": ObjectID(ctx.arguments._id)
                },
                {
                    $set: ctx.arguments.input
                },
                {
                    returnOriginal: false
                });
                return resp.value;
            } catch (error) {
                return error;
            }
        }
    }
};

exports.handler = async (event) => {
    const typeHandler = resolvers[event.typeName];
    if (typeHandler) {
        const resolver = typeHandler[event.fieldName];
        if (resolver) {
            return await resolver(event);
        }
    }
    throw new Error("Resolve not found");
};