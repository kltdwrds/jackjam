import { ChildProcess, execFile } from "child_process";
import React, { useEffect, useState } from "react";

import useResourcePath from "../hooks/useResourcePath";
import { writeJackConfig } from "../utils/writeJackConfig";
import ConfigForm, { FormData } from "./ConfigForm";

const Home: React.FC = () => {
  const [logs, setLogs] = useState("");
  const [child, setChild] = useState<ChildProcess>();
  const jacktripPath = useResourcePath("executables/jacktrip");

  const connect = (formData: FormData): void => {
    const {
      serverIP,
      samplingRate,
      bufferSize,
      queueBufferLength,
      channels,
      portOffset,
    } = formData;
    writeJackConfig(samplingRate, bufferSize);
    const args = [`-C${serverIP}`, `-n${channels}`, `-q${queueBufferLength}`];
    if (portOffset) {
      args.push(`-o${portOffset}`);
    }

    const c = execFile(jacktripPath, args, (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      console.log(stdout);
      console.log(stderr);
    });

    setChild(c);
    c?.stdout?.setEncoding("utf-8");
    c.on("exit", () => {
      setChild(undefined);
    });
    c?.stdout?.on("error", (err) => console.log(err));
  };
  useEffect(() => {
    child?.stdout?.on("data", (data: string) => {
      setLogs(`${data}\n\n${logs}`);
      console.log(data);
      if (data.includes("UDP WAITED MORE THAN")) {
        child?.kill();
      }
    });
  });
  return (
    <div style={{ backgroundColor: "white" }}>
      <h1>JackJam</h1>
      {child ? (
        <button
          type="button"
          onClick={() => {
            child?.kill();
            setLogs("");
          }}
        >
          Disconnect
        </button>
      ) : (
        <>
          <h2>Client jacktrip configuration</h2>
          <ConfigForm onSubmit={connect} />
        </>
      )}
      <div>{logs}</div>
    </div>
  );
};

export default Home;
