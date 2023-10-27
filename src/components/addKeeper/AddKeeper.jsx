import React, { useState } from 'react';
import './AddKeeper.css';
import axios from "axios";
import { Alert, Space, Spin } from 'antd';

const AddKeeper = ({ setKeeperList }) => {

    const [keeperObj, setKeeperObj] = useState({
        title: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target
        setKeeperObj({
            ...keeperObj,
            [name]: value
        })
        // console.log(keeperObj, "keeper")
    }
    const add = () => {
        if (keeperObj.title) {
            setLoading(true)
            axios.post("http://localhost:8000/api/addNew", keeperObj)
                .then(res => setKeeperList(res.data));
            setLoading(false)

            setKeeperObj({
                title: "",
                description: ""
            })
        }
        else {
            alert("Kindly Enter your title!")
        }
    }
    // console.log(keeperObj, "keeper")
    return (
        <>
            {loading && <Spin tip="Loading" size="small">
                <div className="content" />
            </Spin>}

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
        </>
    )
}

export default AddKeeper