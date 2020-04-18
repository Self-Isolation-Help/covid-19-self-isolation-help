import { writeFile } from "fs";

const targetPath = "./src/environments/environment.prod.ts";

const envConfigFile = `export const environment = {
    production: true,
    firebase: {
      apiKey: '${process.env.FIREBASE_API_KEY}',
      authDomain: "self-isolation-help-dev.firebaseapp.com",
      databaseURL: "https://self-isolation-help-dev.firebaseio.com",
      projectId: "self-isolation-help-dev",
      storageBucket: "self-isolation-help-dev.appspot.com",
      messagingSenderId: "1066821517284",
      appId: "1:1066821517284:web:8d2e73a3c092a9877a91f1",
      measurementId: "G-K3ZBBM27HL",
    },
}
`;

writeFile(targetPath, envConfigFile, "utf8", (err) => {
  if (err) {
    return console.log(err);
  }
});
