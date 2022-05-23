import { invalidTokensBuckets } from "./getTokenValidationBuckets.mjs";
import axios from "axios";
import fs from "fs";

const download_image = (url, image_path) =>
  axios({
    url,
    responseType: "stream",
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on("finish", () => resolve())
          .on("error", (e) => reject(e));
      })
  );

invalidTokensBuckets.hasLogo
  .filter((validation) => !validation.token.logoUri.includes("ipfs"))
  .forEach((validation) => {
    download_image(
      validation.token.logoUri,
      `${validation.tokenDirPath}/logo.${
        validation.token.logoUri.includes(".png") ? "png" : "jpeg"
      }`
    )
      .then((res) => console.log("done: ", validation.token.logoUri))
      .catch((res) => console.log("failed: ", validation.token.logoUri));
  });
