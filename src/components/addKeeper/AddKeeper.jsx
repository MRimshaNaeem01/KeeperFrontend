import React, { useState, useEffect } from 'react';
import './AddKeeper.css';
import axios from "axios";
import { Alert, Button, Input, Space, Spin } from 'antd';
const { TextArea } = Input;


const AddKeeper = ({ setKeeperList }) => {

  const [alert, setAlert] = useState(false); // State to manage read-only status
  const [alertVisible, setAlertVisible] = useState(false);

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

    
  useEffect(() => {
    // Use a timer to hide the alert after 2 seconds
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 4000); // 2000 milliseconds = 2 seconds

      return () => clearTimeout(timer); // Clear the timer on component unmount
    }
  }, [alertVisible]);

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
   
            setAlert(true)
            setAlertVisible(true); // Show the alert and start the timer
      
        }
    }
    // console.log(keeperObj, "keeper")
    return (
        <>
            {loading && <Spin tip="Loading" size="small">
                <div className="content" />
            </Spin>}

            {alert && alertVisible &&  (
              <Alert message="Title can't be empty" type="warning" 
              style={{ color: 'red', fontSize: '17px', fontWeight: 'bold' ,border: '1px solid red', width: '50%', margin: 'auto', marginTop: '10px'}}/>
          )}

            <div className="addKeeper">

                <Input
                    className="inputBox titleInput"
                    type="text"
                    name="title"
                    autoComplete="off"
                    placeholder="Add Title"
                    onChange={handleChange}
                    value={keeperObj.title}
                />

                <Input.TextArea
                    className="inputBox description"
                    name="description"
                    placeholder="Add Description Here"
                    onChange={handleChange}
                    value={keeperObj.description}
                />
                <Button className="addButton" onClick={add}>Add Keeper</Button>
            </div>
        </>
    )
}

export default AddKeeper