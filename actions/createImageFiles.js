import { invalidTokensBuckets } from "./getTokenValidationBuckets.mjs";
import axios from "axios";

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

// invalidTokensBuckets.hasLogo.forEach((validation) => {
//     download_image(validation.token.logoUri, validation.tokenDirPath)
// });
