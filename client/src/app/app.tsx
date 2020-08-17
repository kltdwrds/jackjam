import React, { useState } from 'react';
import { execFile, ChildProcess } from "child_process";
import fs from "fs"
import { homedir } from "os";

const App = () => {
  const [logs, setLogs] = useState("");
  const [serverIP, setServerIP] = useState("");
  const [child, setChild] = useState<ChildProcess | null>(null);

  const connect = () => {
    // const jackdConfig = "/usr/local/bin/jackd -dcoreaudio -r48000 -p256";
    // fs.writeFile(`${homedir()}/.jackdrc`, jackdConfig, function(err) {
    //   if(err) {
    //       throw new Error(err.message);
    //   }
    //   console.log("Config updated.");
    // });
    console.log(serverIP)
    const c = execFile("/usr/local/bin/jacktrip", [`-C${serverIP}`, "-n1", "-q8", "--rtaudio", "--bufsize=256"]);
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