import React from "react";
import { useForm } from "react-hook-form";

export interface FormData {
  serverIP: string;
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
      serverIP: "127.0.0.1",
      portOffset: 0,
      channels: 2,
      samplingRate: "96000",
      bufferSize: "256",
      queueBufferLength: 4,
    },
  });

  const submit = handleSubmit((formData): void => {
    onSubmit(formData);
  });

  return (
    <form onSubmit={submit}>
      <label htmlFor="serverIP">JackTrip Server IP</label>
      <input ref={register} name="serverIP" required />
      <label htmlFor="portOffset">Port Offset</label>
      <input
        ref={register}
        name="portOffset"
        type="number"
        min="0"
        max="16"
        step="1"
      />
      <label htmlFor="channels">Channels</label>
      <input
        ref={register}
        name="channels"
        required
        type="number"
        min="1"
        max="16"
        step="1"
      />
      <label htmlFor="samplingRate">Sampling Rate</label>
      <select ref={register} name="samplingRate">
        <option label="22050" value="22050" />
        <option label="44100" value="44100" />
        <option label="48000" value="48000" />
        <option label="96000" value="96000" />
      </select>
      <label htmlFor="bufferSize">Buffer Size</label>
      <select ref={register} name="bufferSize">
        <option label="16" value="16" />
        <option label="32" value="32" />
        <option label="64" value="64" />
        <option label="128" value="128" />
        <option label="256" value="256" />
        <option label="512" value="512" />
        <option label="1024" value="1024" />
        <option label="2048" value="2048" />
        <option label="4096" value="4096" />
      </select>
      <label htmlFor="queueBufferLength">Queue Buffer Length</label>
      <input
        ref={register}
        name="queueBufferLength"
        type="number"
        min="0"
        max="50"
        step="1"
      />
      <button type="submit">Connect</button>
    </form>
  );
};

export default ConfigForm;
