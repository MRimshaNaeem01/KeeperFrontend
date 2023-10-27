import axios from 'axios';
import './ShowKeeper.css'
import Icon, { DeleteOutlined, FormOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Alert, Button, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
const { TextArea } = Input;

const ShowKeeper = ({ keeperList, setKeeperList }) => {
  const [isReadOnly, setIsReadOnly] = useState(true); // State to manage read-only status
  const [editId, setEditId] = useState(null); // State to manage read-only status
  const [textAreaValue, setTextAreaValue] = useState(null); // State to manage read-only status
  const [inputValue, setInputValue] = useState(null); // State to manage read-only status
  const [alert, setAlert] = useState(false); // State to manage read-only status
  const [alertVisible, setAlertVisible] = useState(false);

  const deleteKeeper = (id) => {
    axios.post(`http://localhost:8000/api/delete/${id}`)
      .then(res => setKeeperList(res.data));
  }
  const updateKeeper = (id, description) => {
    // console.log("update id doc:", id, "title:", textAreaValue, "description:", inputValue)
    setEditId(id)
    setIsReadOnly(false);
    setTextAreaValue(description)
    // setKeeperList()
    // axios.post(`http://localhost:8000/api/update/${id}` , title, description)
    //   .then(res => setKeeperList(res.data));
  }

  useEffect(() => {
    // Use a timer to hide the alert after 2 seconds
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 3000); // 2000 milliseconds = 2 seconds

      return () => clearTimeout(timer); // Clear the timer on component unmount
    }
  }, [alertVisible]);

  const updateNewDataKeeper = (id) => {
    console.log(id)
    const dataToSend = {
      textAreaValue: textAreaValue,
      inputValue: inputValue
    };
    if (inputValue) {
      axios.post(`http://localhost:8000/api/update/${id}`, dataToSend)
        .then(res => setKeeperList(res.data));
      setEditId(null)
    }
    else {

      setAlert(true)
      setAlertVisible(true); // Show the alert and start the timer

    }

  }
  return (
    <div className="showKeeper row">
      {keeperList.map(keeper => (
        <div key={keeper._id} className="keeperCard col-md-3">
          {alert && alertVisible && inputValue === '' && editId === keeper._id && (
            <Alert message="Title can't be empty" type="warning"
              style={{ color: 'red', fontSize: '12px', fontWeight: 'bold', border: '1px solid red', marginBottom: '3px' }} />
          )}
          {editId === keeper._id ? (
            <>
              <Input defaultValue={keeper.title} className="title"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Enter the Title' style={{marginTop: '12px'}}

              />
              <DeleteOutlined className="deleteIcon" onClick={() => deleteKeeper(keeper._id)} />
              <Button className="updateing"
                onClick={() => updateNewDataKeeper(keeper._id)}>
                Save
              </Button>

            </>
          ) : (
            <>
              <h1 className="title">{keeper.title}</h1>
              <DeleteOutlined className="deleteIcon" onClick={() => deleteKeeper(keeper._id)} />
              <FormOutlined className="updateIcon" onClick={() => updateKeeper(keeper._id, keeper.description)} />


            </>
          )}


          <Input.TextArea
            className="descriptionBox"
            placeholder='Write the Description!'
            value={editId === keeper._id ? textAreaValue : keeper.description
            }
            rows={4} maxLength={1000}
            readOnly={editId !== keeper._id} // Make it read-only only if editId is not the same as keeper._id
            onChange={(e) => {
              if (editId === keeper._id) {
                setTextAreaValue(e.target.value);
              }
            }}
          />


        </div>
      ))
      }

    </div>
  )
}

export default ShowKeeper