import React, { useState, useEffect } from 'react';
import { execFile, ChildProcess } from "child_process";
import useResourcePath from '../hooks/useResourcePath';
import ConfigForm, { FormData } from './ConfigForm';
import { writeJackConfig } from '../utils/writeJackConfig';

const Home: React.FC = () => {
  const [logs, setLogs] = useState("");
  const [child, setChild] = useState<ChildProcess>();

  const connect = (formData: FormData): void => {
    const {serverIP, samplingRate, bufferSize, queueBufferLength, channels, portOffset } = formData;
    writeJackConfig(samplingRate, bufferSize);
    let args = [`-C${serverIP}`, `-n${channels}`, `-q${queueBufferLength}`];
    if (portOffset) {
      args.push(`-o${portOffset}`);
    }

    const c = execFile(
      useResourcePath("executables/jacktrip"), 
      args,
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
    });
    c.stdout.on("error", (err) => console.log(err));
  };
  useEffect(() => {
    child?.stdout.on("data", (data: string) => {
      setLogs(`${data}\n\n${logs}`);
      console.log(data);
      if (data.includes("UDP WAITED MORE THAN")) {
        child?.kill()
      }
    });
  });
  return (
    <div style={{backgroundColor: "white"}}>
      <h1>JackJam</h1>
      {child ? (
        <button onClick={() => {
          child?.kill();
          setLogs("");
        }}>Disconnect</button>
      ) : (
        <>
        <h2>Client jacktrip configuration</h2>
        <ConfigForm onSubmit={connect} />
        </>
      )}
      <div>
        {logs}
      </div>
    </div>
  );
};

export default Home