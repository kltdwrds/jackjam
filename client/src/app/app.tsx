import React, { useState } from 'react';
import { execFile } from "child_process";
import fs from "fs"
import { homedir } from "os";

const App = () => {
  const [logs, setLogs] = useState("");

  const connect = () => {
    const jackdConfig = "/usr/local/bin/jackd -dcoreaudio -r48000 -p256";
    fs.writeFile(`${homedir()}/.jackdrc`, jackdConfig, function(err) {
      if(err) {
          throw new Error(err.message);
      }
      console.log("Config updated.");
    }); 
    const child = execFile("/usr/local/bin/jacktrip", ["-C", "34.86.239.114"]);
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
      console.log(data);
      data = data.toString();
      setLogs(`${data}\n${logs}`)
    });
  };
  
  return (
    <div style={{backgroundColor: "white"}}>
      <h1>Welcome to JackJam!</h1>
      <button onClick={() => connect()}>Connect</button>
      <div>
        {logs}
      </div>
    </div>
  );
}

export default App;