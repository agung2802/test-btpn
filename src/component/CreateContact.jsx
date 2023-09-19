import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createFlagAction, setModalNotif } from "../slice/ContactSlice";
import NotificationService from "./notification/notificationService";

const contactModel = {
    firstName: '',
    lastName: '',
    age: 0,
    photo: ''
}

export default function CreateContact() {

    const [formData, setFormData] = useState(contactModel);
    const dispatch = useDispatch();

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];

        if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64 = e.target.result;
            setFormData({
                ...formData,
                photo: base64,
              });
        };

        reader.readAsDataURL(file);
        }
    };

      const handleInputChange = (event) => {
        const { id, value } = event.target;
        if (id !== "age") {
            setFormData({
              ...formData,
              [id]: value,
            });
        } else {
            setFormData({
                ...formData,
                [id]: parseInt(value),
            })
        }
      };

      const resetValue = () =>{
        setFormData(contactModel);
      }

      const handleSubmit = () => {
        axios.post('https://contact.herokuapp.com/contact', formData)
          .then(function (response) {
            dispatch(createFlagAction(true));
            dispatch(setModalNotif({
                message: "Create contact success!!",
                response: "success"
            }))
          })
          .catch(function (error) {
            dispatch(setModalNotif({
                message: "Create contact error!!",
                response: "error"
            }))
          });
      }

    return (
        <>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor: "#1e1b18"}}>
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Create Contact</h1>
                        <button className="btn-close" id="btn-close" style={{color: "white", backgroundColor: "white"}} data-bs-dismiss="modal" aria-label="Close" onClick={() => resetValue()}></button>
                    </div>
                <div className="modal-body">
                    <form>
                    <div className="mb-3">
                        <label htmlFor="firstname" className="form-label">FirstName</label>
                        <input type="text" className="form-control" id="firstName" placeholder="FirstName" value={formData.firstName} onChange={handleInputChange}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">LastName</label>
                        <input type="text" className="form-control" id="lastName" placeholder="LastName" value={formData.lastName} onChange={handleInputChange}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" className="form-control" id="age" placeholder="Age" value={formData.age} onChange={handleInputChange}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Photo</label>
                        <input className="form-control" type="file" id="photo" accept="image/*" onChange={handlePhotoChange}></input>
                    </div>
                    
                    </form>
                </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => resetValue()}>Close</button>
                        <button className="btn text-white" data-bs-dismiss="modal"  style={{backgroundColor: "#0a2463"}} onClick={() => handleSubmit()}>Save changes</button>
                    </div>
                </div>
            </div>
            </div>

        <NotificationService />

        </>
    );
}