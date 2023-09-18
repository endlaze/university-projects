import * as mongoose from 'mongoose'
require('dotenv').config()

export interface connectOptions {
  useNewUrlParser: boolean,
  useUnifiedTopology: boolean;
  useFindAndModify: boolean;
}

const connectOptions: connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

mongoose.set('useCreateIndex', true);
export const mongoUrl: string = process.env.MONGO_URI;
export const db: mongoose.Connection = mongoose.createConnection(mongoUrl, connectOptions);

db.on('connecting', () => {
  console.log(`MongoDB :: connecting`);
  db.disconnect();
});

db.on('error', (error) => {
  console.log(`MongoDB :: connection ${error}`);
})

db.on('open', () => {
  console.log(`MongoDB :: connection opened`);
});

db.on('reconnected', () => {
  console.log('MongoDB :: reconnected');
});

db.on('reconnectFailed', () => {
  console.log('MongoDB :: reconnectFailed');
});

db.on('disconnected', () => {
  console.log('MongoDB :: disconnected');

});

db.on('fullsetup', () => {
  console.log('MongoDB :: reconnecting...');
});




