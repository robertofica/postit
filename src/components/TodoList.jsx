import React, { Fragment, useState, useRef, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { TodoItem } from './TodoItem';

const KEY = "todolist-todos"


export function TodoList(){

    const [todos, setTodos] = useState([]);

    const tituloRef = useRef();
    const descripcionRef = useRef();
    const importanciaRef = useRef();

    
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if (storedTodos){
            setTodos(storedTodos);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos])

    const agregarTarea = () => {
        console.log("AGREGANDO TAREA");
        const titulo = tituloRef.current.value;
        const descripcion = descripcionRef.current.value;
        const importancia = importanciaRef.current.value;

        if (titulo === '') return;
        if (descripcion === '') return;
        if (importancia === '') return;

        setTodos((prevTodos) => {
            const newTask = {
                id: uuid(),
                titulo: titulo,
                descripcion: descripcion,
                importancia: 0
            }

            return [...prevTodos, newTask]
        })

        tituloRef.current.value = null
        descripcionRef.current.value = null
        importanciaRef.current.value = null
    }

   
    const ResumenTareas = () => {
        const cant = cantidadTareas()

        
        if (cant === 0){
            return (
                <div className="alert alert-success mt-3">
                    Felicitaciones no tienes tareas pendientes! :)
                </div>
            )
        }

        if (cant === 1){
            return (
                <div className="alert alert-info mt-3">
                    Te queda solamente una tarea pendiente!
                </div>
            )
        }

        return (
            <div className="alert alert-info mt-3">
                Te quedan {cant} tareas pendientes!
            </div>
        )
    }

    const cantidadTareas = () => {
        return todos.filter((todo) => !todo.completed).length;
    }

    const cambiarEstadoTarea = (id) => {
        console.log(id)
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id)
        todo.completed = !todo.completed;
        setTodos(newTodos)
    }

    const eliminarTareasCompletadas = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }

    return (

        <Fragment>
            <h1>Post It Simulator!</h1>

            <div className="input-group mt-4 mb-4">
                <input ref={tituloRef} placeholder='Título' className="form-control" type="text"></input>
            </div>   
            <div className="input-group mt-4 mb-4">
                <input ref={descripcionRef} placeholder='Descripción' className="form-control" type="text"></input>
            </div>   
            <div className="input-group mt-4 mb-4">
                <input type="checkbox" className="form-check-input me-2" id="importancia"></input><label>Importancia</label>
            </div>       
            <div className="input-group mt-4 mb-4">
                <button onClick={agregarTarea} className="btn btn-primary">Agregar</button>
            </div>

            {todos.map((todo) => (
                <TodoItem todo={todo} key={todo.id} ></TodoItem>))}
        
        </Fragment>

    );
}
