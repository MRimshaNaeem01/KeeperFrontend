import React, { useState } from 'react';
import './AddKeeper.css';
import axios from "axios";

const AddKeeper = () => {

    const [keeperObj, setKeeperObj] = useState({
        title: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setKeeperObj({
            ...keeperObj,
            [name]: value
        })
        console.log(keeperObj, "keeper")
    }
    const add = () => {
        if (keeperObj.title) {
           axios.post("http://localhost:8000/api/addNew" , keeperObj)
        .then(res => console.log(res));
        }
    }
    // console.log(keeperObj, "keeper")
    return (
        <div className="addKeeper">
            <input
                className="inputBox titleInput"
                type="text"
                name="title"
                autoComplete="off"
                placeholder="Add Title"
                onChange={handleChange}
                value={keeperObj.title}
            />
            <textarea
                className="inputBox description"
                name="description"
                placeholder="Add Description Here"
                onChange={handleChange}
                value={keeperObj.description}
            />
            <div className="addButton" onClick={add}>Add</div>
        </div>
    )
}

export default AddKeeper