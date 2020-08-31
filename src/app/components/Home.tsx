import {
  Button,
  Code,
  Collapse,
  Container,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import { ChildProcess, execFile } from "child_process";
import React, { useEffect, useState } from "react";

import useResourcePath from "../hooks/useResourcePath";
import { writeJackConfig } from "../utils/writeJackConfig";
import ConfigForm, { FormData } from "./ConfigForm";

const Home: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const { isOpen, onToggle } = useDisclosure();
  const [jacktrip, setJacktrip] = useState<ChildProcess>();
  const jacktripPath = useResourcePath("executables/jacktrip");

  const connect = (formData: FormData): void => {
    const {
      server,
      samplingRate,
      bufferSize,
      queueBufferLength,
      channels,
      portOffset,
    } = formData;

    writeJackConfig(samplingRate, bufferSize);

    const args = [`-C${server}`, `-n${channels}`, `-q${queueBufferLength}`];
    if (portOffset) {
      args.push(`-o${portOffset}`);
    }

    const jt = execFile(jacktripPath, args, (error) => {
      if (error) {
        throw error;
      }
    });
    setJacktrip(jt);
  };

  useEffect(() => {
    if (!jacktrip) {
      return;
    }
    jacktrip.stdout?.setEncoding("utf-8");
    jacktrip.stdout?.on("error", (err) => console.log(err));
    jacktrip.stdout?.on("data", (data: string) => {
      setLogs([data, ...logs]);
      console.log(data);
      if (data.includes("UDP WAITED MORE THAN")) {
        jacktrip?.kill();
      }
    });
    jacktrip.on("exit", () => {
      setJacktrip(undefined);
    });
  }, [jacktrip]);

  return (
    <Container>
      <Heading as="h1" size="xl" my="4">
        JackJam
      </Heading>
      {jacktrip ? (
        <>
          <Button
            onClick={() => {
              jacktrip?.kill();
              setLogs([]);
            }}
          >
            Disconnect
          </Button>
          <Button variant="ghost" size="xs" ml="4" onClick={onToggle}>
            {isOpen ? "Hide" : "Show"} logs
          </Button>
          <Collapse animateOpacity isOpen={isOpen} mt="4">
            <Code>
              {logs.map((log, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Text key={index}>{log}</Text>
              ))}
            </Code>
          </Collapse>
        </>
      ) : (
        <ConfigForm onSubmit={connect} />
      )}
    </Container>
  );
};

export default Home;
