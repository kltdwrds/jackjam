import React, { useState } from 'react';
import { execFile, ChildProcess } from "child_process";
import useResourcePath from './useResourcePath';
import fs from "fs"
import { homedir } from "os";

const App = () => {
  const [logs, setLogs] = useState("");
  const [serverIP, setServerIP] = useState("");
  const [child, setChild] = useState<ChildProcess | null>(null);

  const connect = (): void => {
    // const jackdConfig = "/usr/local/bin/jackd -dcoreaudio -r48000 -p256";
    // fs.writeFile(`${homedir()}/.jackdrc`, jackdConfig, function(err) {
    //   if(err) {
    //       throw new Error(err.message);
    //   }
    //   console.log("Config updated.");
    // });
    const c = execFile(
      useResourcePath("executables/jacktrip"), 
      [`-C${serverIP}`, "-n1", "-q8", "--rtaudio", "--bufsize=256"],
      (error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        console.log(stdout);
        console.log(stderr);
      }
    );
    setChild(c);
    c.stdout.setEncoding("utf-8");
    c.on("exit", () => {
      setChild(null);
      setLogs("");
    });
    c.stdout.on("data", (data: string) => {
      setLogs(`${data}\n${logs}`);
      console.log(data);
      if (data.includes("UDP WAITED MORE THAN")) {
        c.kill()
      }
    });
    c.stdout.on("error", (err) => console.log(err));
  };

  return (
    <div style={{backgroundColor: "white"}}>
      <h1>JackJam</h1>
      {child ? (
        <button onClick={() => child.kill()}>Disconnect</button>
      ) : (
        <>
          <input value={serverIP} onChange={(e) => setServerIP(e.currentTarget.value)} />
          <button onClick={() => connect()} disabled={!serverIP}>Connect</button>
        </>
      )}
      <div>
        {logs}
      </div>
    </div>
  );
}

export default App;