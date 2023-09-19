import { useDispatch, useSelector} from 'react-redux'

export default function DetailContact() {
    let contact = useSelector(state => state.contact.contactDetail);
    const dispatch = useDispatch();

    function resetDetailContact() {
        dispatch(contactDetail({}));
        contact = {};
    }
    return (
        <>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="detailModal" tabIndex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header text-white justify-center" style={{backgroundColor: "#1e1b18"}}>
                        <img src={contact.photo} className='rounded-full w-40 h-40'></img>
                    </div>
                <div className="modal-body">
                    <h1 className="modal-title text-2xl text-center font-bold underline" id="detailModalLabel">Detail Contact Information</h1>
                    <div className='m-8'>
                        <p className='text-xl font-bold w-full text-center'> {contact.firstName} {contact.lastName}</p>
                    {/* </div> */}
                    {/* <div className='mb-3'> */}
                        <p className='text-lg font-bold w-full text-center'> {contact.age} Years</p>
                    </div>
                </div>
                    {/* <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => resetDetailContact()}>Close</button>
                    </div> */}
                </div>
            </div>
            </div>
        </>
    );
}