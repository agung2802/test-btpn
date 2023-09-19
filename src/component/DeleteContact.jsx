import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { contactDetail, deleteFlagAction, setModalNotif } from "../slice/ContactSlice";
import NotificationService from "./notification/notificationService";

export default function DeleteContact() {
    let contact = useSelector(state => state.contact.contactDetail);
    const dispatch = useDispatch();

    function deleteContact(){
        const buttonClose = document.getElementById('btn-close');
        axios.delete(`https://contact.herokuapp.com/contact/${contact.id}`)
        .then(response => {
            dispatch(deleteFlagAction(true));
            buttonClose.click();
            dispatch(setModalNotif({
                message: "Delete contact success!!",
                response: "success"
            }))
          })
        .catch(function (error) {
            buttonClose.click();
            dispatch(setModalNotif({
                message: "Delete contact error!!",
                response: "error"
            }))
        });
    }

    function resetDetailContact() {
        dispatch(contactDetail({}));
        contact = {};
    }
    
    return (
        <>
            {/* <!-- Modal --> */}
            <div className="modal fade suasusia" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor: "#1e1b18"}}>
                        <h1 className="modal-title fs-5" id="deleteModalLabel">Delete Modal</h1>
                        <button className="btn-close" id="btn-close" style={{color: "white", backgroundColor: "white"}} data-bs-dismiss="modal" aria-label="Close" onClick={() => resetDetailContact()}></button>
                    </div>
                <div className="modal-body">
                    <label>
                        Did you realy want to delete this data?
                    </label>
                </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => resetDetailContact()}>Close</button>
                        <button className="btn text-white" style={{backgroundColor: "#d8315b"}} onClick={() => deleteContact()}>Delete</button>
                    </div>
                </div>
            </div>
            </div>

        <NotificationService />

        </>
    );
}