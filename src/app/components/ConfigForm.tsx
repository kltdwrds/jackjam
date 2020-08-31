import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/core";
import React from "react";
import { useForm } from "react-hook-form";

export interface FormData {
  server: string;
  portOffset: number;
  channels: number;
  samplingRate: string;
  bufferSize: string;
  queueBufferLength: number;
}

interface ConfigFormProps {
  onSubmit: (formValues: FormData) => void;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      server: "jackloop256.stanford.edu",
      portOffset: 0,
      channels: 2,
      samplingRate: "48000",
      bufferSize: "256",
      queueBufferLength: 4,
    },
  });

  const submit = handleSubmit((formData): void => {
    onSubmit(formData);
  });

  return (
    <form onSubmit={submit}>
      <Stack spacing="4">
        <Stack direction="row">
          <FormControl id="server" isRequired>
            <FormLabel>Server</FormLabel>
            <Input ref={register} name="server" required />
            <FormHelperText>-C[Name or IP]</FormHelperText>
          </FormControl>
          <FormControl id="portOffset">
            <FormLabel>Port Offset</FormLabel>
            <Input
              ref={register}
              name="portOffset"
              type="number"
              min="0"
              max="16"
              step="1"
            />
            <FormHelperText>-o[offset]</FormHelperText>
          </FormControl>
        </Stack>
        <Stack direction="row">
          <FormControl id="channels" isRequired>
            <FormLabel>Channels</FormLabel>
            <Input
              ref={register}
              name="channels"
              type="number"
              min="1"
              max="16"
              step="1"
            />
            <FormHelperText>-n[channels]</FormHelperText>
          </FormControl>
          <FormControl id="queueBufferLength">
            <FormLabel>Queue Buffer Length</FormLabel>
            <Input
              ref={register}
              name="queueBufferLength"
              type="number"
              min="0"
              max="50"
              step="1"
            />
            <FormHelperText>
              -q[length] (Increase on slow networks)
            </FormHelperText>
          </FormControl>
        </Stack>
        <Stack direction="row">
          <FormControl id="samplingRate" isRequired>
            <FormLabel>Sampling Rate</FormLabel>
            <Select ref={register} name="samplingRate">
              <option label="22050" value="22050" />
              <option label="44100" value="44100" />
              <option label="48000" value="48000" />
              <option label="96000" value="96000" />
            </Select>
            <FormHelperText>-r[rate]</FormHelperText>
          </FormControl>
          <FormControl id="bufferSize" isRequired>
            <FormLabel>Buffer Size</FormLabel>
            <Select ref={register} name="bufferSize">
              <option label="16" value="16" />
              <option label="32" value="32" />
              <option label="64" value="64" />
              <option label="128" value="128" />
              <option label="256" value="256" />
              <option label="512" value="512" />
              <option label="1024" value="1024" />
              <option label="2048" value="2048" />
              <option label="4096" value="4096" />
            </Select>
            <FormHelperText>-p[size]</FormHelperText>
          </FormControl>
        </Stack>
        <Button type="submit">Connect</Button>
      </Stack>
    </form>
  );
};

export default ConfigForm;
