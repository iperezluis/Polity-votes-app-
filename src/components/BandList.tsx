import React, { ChangeEvent, useContext, useState } from "react";
import { data, useBand } from "../hooks/useBand";
import { useSocket } from "../hooks/useSocket";
import { useGraphics } from "../hooks/useGraphics";
import { SocketContext } from "../context/SocketContext";

interface Props {
  data: data[];
}
const BandList = ({ data }: Props) => {
  const { bands, setBands } = useBand();
  const { socket } = useContext(SocketContext);
  const { createGraphics, setMyChart } = useGraphics();

  const changeName = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    console.log(event, id);
    const newName = event.target.value;
    setBands(
      bands.map((el) => {
        if (el.id === id) {
          el.name = newName;
        }
        return el;
      })
    );
  };
  //update name band
  const updateNameBand = (id: number, newName: string) => {
    socket.emit("update-name", { id: id, newName: newName });
  };
  //esta funcion es para cuando el usuario deje de escribir
  const onLossFocus = (newName: string, id: number) => {
    console.log(newName, id);
    //dispoarar el socket
    updateNameBand(id, newName);
  };
  const votar = (id: number) => {
    console.log(id);
    console.log("votando a las: " + new Date());
    socket.emit("voto-incrementar", id);
    return createGraphics(bands);
  };
  const deleteBand = (id: number) => {
    console.log(id);
    // alert("¿seguro de eliminar?");
    socket.emit("eliminar-banda", id);
    return setBands([...bands]);
  };
  const showRows = () => {
    return bands.map((el) => (
      <tr key={el.id}>
        {el.id && (
          <td>
            <img
              src={require("../assets/profile.png")}
              alt="img"
              style={{ width: 70, height: 70, borderRadius: 100 }}
            />
          </td>
        )}
        <td>
          <input
            type="text"
            className="form-control"
            value={el.name}
            onChange={(event) => changeName(event, el.id)}
            onBlur={() => onLossFocus(el.name, el.id)}
          />
        </td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => {
              votar(el.id);
              // createGraphics(bands);
            }}
          >
            +1
          </button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => deleteBand(el.id)}>
            Borrar
          </button>
        </td>
        <td>
          <h1>{el.votes}</h1>|
        </td>
      </tr>
    ));
  };
  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{showRows()}</tbody>
      </table>
    </>
  );
};

export default BandList;
