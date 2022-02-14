import React, { ChangeEvent, useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { data, useBand } from "../hooks/useBand";

interface Props {
  title: string;
}
function BandAdd({ title }: Props) {
  const { bands, setBands } = useBand();
  const { socket } = useContext(SocketContext);
  const [name, setName] = useState<string>("");

  // const addBand = (name: string) => {
  //   console.log(name);
  //   socket.emit("agregar-banda", name);
  // };
  //create band
  const createBand = (name: string) => {
    socket.emit("create-band", name);
  };
  const onSubMit = (event: any) => {
    event?.preventDefault();
    // alert("listo");
    if (!name) {
      return;
    }
    createBand(name);
    console.log(name);
    return setBands([...bands]);
  };
  return (
    <>
      <h3>{title}</h3>
      <form onSubmit={onSubMit}>
        <input
          type="text"
          className="form-control"
          placeholder="nuevo nombre de banda"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </>
  );
}

export default BandAdd;
