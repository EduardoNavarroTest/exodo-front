import { useEffect, useState } from "react";

const Test = (props) => {

    const [contador, setContador] = useState(0);
    const [show, setShow] = useState(true);

    const handleSumar = () => {
        setContador(contador + 1);
    }

    const handleRestar = () => {
        setContador(contador - 1);
    }

    const handleShow = () => {
        setShow(!show);
    }

    useEffect(() => {
        console.log("Componente montado");


        return () => {
            console.log('Cerrando componente');
        }
    }, [])

    useEffect(() => {
        console.log("Componente actualizado");

    }, [contador])

    return (
        <>
            <p>El nombre es: {props.name}</p>
            <p>El email es: {props.email}</p>
            <p>Contador {contador}</p>
            <button onClick={handleSumar}>Sumar</button>
            <button onClick={handleRestar}>Restar</button>
            <hr />

            {show && <p><h2>Ahora lo ves</h2></p>}

            <button onClick={handleShow}>{show ? 'Ocultar' : 'Mostrar'}</button>

        </>
    )
}

export default Test;
