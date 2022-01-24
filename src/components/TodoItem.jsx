import React from 'react'

export function TodoItem({todo}){

    const {id, titulo,descripcion , importancia} = todo;


    return <div class="card text-black bg-warning mb-3" style={{width:'18rem'}}> 
            <div class="card-body">
                <div class="card-header">{titulo} <button className="btn btn-danger ms-2"><i className="bi bi-trash"></i></button></div>
                <div class="card-body">
                    <p class="card-text">{descripcion}</p>
                </div>
            </div>
            </div>
}
