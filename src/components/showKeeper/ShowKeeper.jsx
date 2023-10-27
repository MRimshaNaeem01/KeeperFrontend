import axios from 'axios';
import './ShowKeeper.css'

const ShowKeeper = ({keeperList, setKeeperList}) => {

  const deleteKeeper = (id) =>{   
   axios.post(`http://localhost:8000/api/delete/${id}`)
   .then(res => setKeeperList(res.data));
    }
  return (
    <div className="showKeeper row">
    { keeperList.map( keeper => (
        <div key={keeper._id} className="keeperCard col-md-3">
        <h1 className="title">
          {keeper.title}
          <i className="deleteIcon fa fa-trash" onClick={()=> deleteKeeper(keeper._id)}
            aria-hidden="true"  ></i>
            
        </h1>
        <textarea
          className="descriptionBox"
          value={keeper.description}
          readOnly />
      </div>
      ))
    }
     
    </div>
  )
}

export default ShowKeeper