import { useState, useRef } from "preact/hooks";
import { LoaderForm } from "./LoaderForm";
import { setInvitation } from "../api";
export const Form = () => {
  const [loading, setLoading] = useState(false);
  const refDiv = useRef(null);
  const [data, setData] = useState({
    name: '',
    persons: 0,
    asistencia: null // Cambiado de false a null para permitir valores de "Sí" o "No"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setInvitation(data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setLoading(false);
          e.target.reset();
          refDiv.current.innerHTML = '<p class="text-center text-lg text-white">¡Gracias por confirmar tu asistencia!</p>';
        } else {
          setLoading(false);
          e.target.reset();
          refDiv.current.innerHTML = '<p class="text-center text-lg text-red-500">¡Ups! Algo salió mal. Por favor, intenta de nuevo.</p>';
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} class="container bgimage  text-white mx-auto w-full max-w-4xl h-96 py-4 mt-10 p-4 rounded-2xl">
      <h1 class="text-2xl text-center font-bold mb-6">Confirma tu asistencia</h1>
      <label for="name">Nombre Completo</label>
      <input required id="name" name="name" type='text' class='w-full text-black py-2 px-3 rounded-xl mt-1 mb-2' value={data.name} onChange={handleChange} />
      <div class="flex flex-row gap-5">
        <div class="w-full">
          <label for="persons">Personas que asisten conmigo</label>
          <input required id="persons" name="persons" type='number' min='0' max='5' class='w-full text-black py-2 px-3 rounded-xl mt-1 mb-2' value={data.persons} onChange={handleChange} />
        </div>
        <div class="w-full">
          <label for="type">¿Asistirás al evento?</label>
          <section id="ver" class='text-white flex flex-col md:flex-row justify-around w-full py-4 gap-y-4 px-3 rounded-xl mt-1 mb-2'>
            <div class="flex w-full gap-x-3">
              <input type="radio" id="asistenciaSi" name="asistencia" value="Si" checked={data.asistencia === 'Si'} onChange={handleChange} />
              <label for="asistenciaSi">Sí Asistiré</label>
            </div>      
            <div class="flex w-full gap-x-3">
              <input type="radio" id="asistenciaNo" name="asistencia" value="No" checked={data.asistencia === 'No'} onChange={handleChange} />
              <label for="asistenciaNo">No Asistiré</label>
            </div>        
          </section>
        </div>
      </div>
      {
        loading ? <LoaderForm /> : 
        <button type='submit' id="verify" class='bg-white w-full hover:bg-yellow-500 text-black hover:text-white transition-all duration-150 cursor-pointer text-center p-3 rounded-xl mt-3'>
        Notificar Elección
      </button>
      }
      <div ref={refDiv} id="result" class='my-6'> </div>
    </form>
  );
};
