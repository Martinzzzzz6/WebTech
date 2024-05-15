import * as convict from 'convict';
import * as dotenv from "dotenv";
dotenv.config();


// const config: convict.Config<any> = convict({
//     uri: {
//     doc: "MongoDB URL",
//     env: "MONGODB_URI",
//   },
//   port: {
//     env: "PORT",
//     format: "port",
//     default: 3000,
//   },
// });

const config = convict({
  uri: {
    doc: "MongoDB URL",
    env: "MONGODB_URI",
  },
  port: {
    env: "PORT",
    format: "port",
    default: 3000,
  },
});

config.validate();

export { config };
