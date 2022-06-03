import mongoose from 'mongoose';

const mongooseWorker = (MONGODB_URI) => {
    // Connect to mongoose
  mongoose.connect(MONGODB_URI, {
    keepAlive: true,
  });
  mongoose.connection.on('connected', () => {
    console.log('Mongo Connection Established')
  })
  mongoose.connection.on('reconnected', () => {
    console.log('Mongo Connection Reestablished')
  })
  mongoose.connection.on('disconnected', () => {
    console.log('Mongo Connection Disconnected')
    console.log('Trying to reconnect to Mongo ...')
    setTimeout(() => {
      mongoose.connect(MONGODB_URI, {
        keepAlive: true,
        socketTimeoutMS: 3000,
        connectTimeoutMS: 3000,
      })
    }, 3000)
  })
  mongoose.connection.on('close', () => {
    console.log('Mongo Connection Closed')
  })
  mongoose.connection.on('error', (error) => {
    console.log(error);
    process.exit(1);
  });
}

export default mongooseWorker