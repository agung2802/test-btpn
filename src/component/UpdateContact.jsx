import { useDispatch, useSelector} from 'react-redux'
import { setModalNotif, updateModel } from '../slice/ContactSlice';
import axios from 'axios';
import NotificationService from './notification/notificationService';

export default function UpdateContact() {
    let contact = useSelector(state => state.contact.updateContact);
    const dispatch = useDispatch();

    function handleSubmit() {
        axios.put(`https://contact.herokuapp.com/contact/${contact.id}`, {
            firstName: contact.firstName,
            lastName: contact.lastName,
            age: contact.age,
            photo: contact.photo
        })
        .then(response => {
            dispatch(deleteFlagAction(true));
            dispatch(setModalNotif({
                message: "Delete contact success!!",
                response: "success"
            }))
          })
        .catch(function (error) {
            dispatch(setModalNotif({
                message: "Delete contact error!!",
                response: "error"
            }))
        });
    }

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];

        if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64 = e.target.result;
            dispatch(updateModel({...contact, photo : base64}))
        };

        reader.readAsDataURL(file);
        }

    };

    function resetDetailContact() {
        dispatch(contactDetail({}));
        contact = {};
    }

    return (
        <>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor: "#1e1b18"}}>
                        <h1 className="modal-title fs-5" id="updateModalLabel">Update Contact</h1>
                        <button className="btn-close" id="btn-close" style={{color: "white", backgroundColor: "white"}} data-bs-dismiss="modal" aria-label="Close" onClick={() => resetDetailContact()}></button>
                    </div>
                <div className="modal-body">
                    <form>
                    <div className="mb-3">
                        <label htmlFor="firstname" className="form-label">FirstName</label>
                        <input type="text" className="form-control" id="firstname" placeholder="FirstName" value={contact.firstName} onChange={(e) => dispatch(updateModel({...contact, firstName : e.target.value}))}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">LastName</label>
                        <input type="text" className="form-control" id="lastName" placeholder="LastName" value={contact.lastName} onChange={(e) => dispatch(updateModel({...contact, lastName : e.target.value}))}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" className="form-control" id="age" placeholder="Age" value={contact.age} 
                        onChange={(e) => dispatch(updateModel({...contact, age : e.target.value}))} ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Photo</label>
                        <input className="form-control" type="file" id="photo" accept="image/*" onChange={handlePhotoChange}></input>
                    </div>
                    
                    </form>
                </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => resetDetailContact()}>Close</button>
                        <button className="btn text-white" data-bs-dismiss="modal" style={{backgroundColor: "#0a2463"}} onClick={() => handleSubmit()}>Update</button>
                    </div>
                </div>
            </div>
            </div>

            <NotificationService />
        </>
    );
}