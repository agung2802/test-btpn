import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalNotif } from "../../slice/ContactSlice";

export default  function NotificationService(message, response) {
    const modalNotif = useSelector(state => state.contact.modalNotif);
    const dispatch = useDispatch();

    useEffect(() => {
        if (modalNotif.response === "success") {
            const notificationModal = new bootstrap.Modal(document.getElementById('modalSuccess'));
            notificationModal.show();
        } else if(modalNotif.response === "error"){
            const notificationModal = new bootstrap.Modal(document.getElementById('modalError'));
            notificationModal.show();
        }
    }, [modalNotif]);

    const clearNotif = () => {
        dispatch(setModalNotif({}));
        const elementsToRemove = document.getElementsByClassName('modal-backdrop');
        for (let i = elementsToRemove.length - 1; i >= 0; i--) {
            elementsToRemove[i].remove();
        }
    }

    return (
        <>
        {/* modal Notification Success */}
        <div className="modal fade testt" id="modalSuccess" tabIndex="-1" aria-labelledby="modalSuccessLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body self-center">
                            {modalNotif.message}
                        </div>
                        <div className="modal-footer">
                            <button className="btn w-full text-white" style={{backgroundColor: "#0a2463"}} data-bs-dismiss="modal" onClick={() => clearNotif()}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal Notification Error */}
            <div className="modal fade tesser" id="modalError" tabIndex="-1" aria-labelledby="modalErrorLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body self-center">
                            {modalNotif.message}
                        </div>
                        <div className="modal-footer">
                            <button className="btn text-white" style={{backgroundColor: "#0a2463"}} data-bs-dismiss="modal" onClick={() => clearNotif()}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}