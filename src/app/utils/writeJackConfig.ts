import fs from "fs";
import { homedir } from "os";

export const writeJackConfig = (
  samplingRate = "48000",
  bufferSize = "256"
): void => {
  const jackConfig = `/usr/local/bin/jackd -dcoreaudio -r${samplingRate} -p${bufferSize}`;
  fs.writeFile(`${homedir()}/.jackdrc`, jackConfig, (err) => {
    if (err) {
      throw new Error(err.message);
    }
    console.log(`.jackdrc updated: ${jackConfig}`);
  });
};
