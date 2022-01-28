import React, { Fragment, useState, useRef, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import "./style.css";

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
        const importancia = importanciaRef.current.checked;

        console.log("antes del IF");
        console.log(titulo);
        console.log(descripcion);
        console.log(importancia);
        
        if (descripcion === '') return;
        
        console.log("agregando postit");

        setTodos((prevTodos) => {
            const newTask = {
                id: uuid(),
                titulo: titulo,
                descripcion: descripcion,
                importancia:importancia,
            };
            console.log(newTask)
            return [...prevTodos, newTask]
        })
        tituloRef.current.value = null
        descripcionRef.current.value = null
        importanciaRef.current.checked = false
    }

   
    const eliminapostit= (id) => {
        const newTodos =  todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      }

    return (
        
        <Fragment>
            <h1>Post It Simulator!</h1>
            <div class="row">
                <div class="col"><input ref={tituloRef} placeholder='Título' className="form-control" type="text"></input></div>
                <div class="col"><input ref={descripcionRef} placeholder='Descripción' className="form-control" type="text"></input></div>
                <div class="col"><input ref={importanciaRef} type="checkbox" className="form-check-input me-2" id ="importante" ></input><label>importancia</label></div>
                <div class="col"><button onClick={agregarTarea} className="btn btn-primary">Agregar</button></div>
            </div>

            <ul>
                {todos.map((todo) => (
                    <li>
                    <div className={`${todo.importancia ? "importante" : ""}`}> 
                        <h4 clasename="x"><button onClick={() => eliminapostit(todo.id)} className="btn-close">X</button></h4>
                        <h3>{todo.titulo}</h3>
                        <p>{todo.descripcion}</p>
                        <p>{todo.importancia}</p>
                    </div>
                </li>
                ))}
            </ul>
        </Fragment>

    );
}