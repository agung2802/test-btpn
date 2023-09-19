import { useEffect, useCallback } from "react"
import axios from "axios";
import DeleteContact from "./DeleteContact";
import UpdateContact from "./UpdateContact";
import { useSelector, useDispatch} from 'react-redux'
import { contactDetail, contactList, createFlagAction, deleteFlagAction, updateFlagAction, updateModel } from "../slice/ContactSlice";
import DetailContact from "./DetailContact";

export default function ListContact() {
    const contact = useSelector(state => state.contact.contactList);
    const isUpdateDone = useSelector(state => state.contact.isUpdateDone);
    const isCreateDone = useSelector(state => state.contact.isCreateDone);
    const isDeleteDone = useSelector(state => state.contact.isDeleteDone);
    const dispatch = useDispatch();


    // GET DATA
    const getContact = useCallback(async () => {
          const response = await axios.get('https://contact.herokuapp.com/contact');
          dispatch(contactList(response.data.data))
          dispatch(deleteFlagAction(false));
          dispatch(createFlagAction(false));
          dispatch(updateFlagAction(false));
    }, [dispatch]);

    useEffect(() => {
        if (isCreateDone || isDeleteDone || isUpdateDone) {
            getContact();
        }

        return () => {
            getContact();
        };
    }, [isCreateDone, isDeleteDone, isUpdateDone]);

    async function setContactDetail(id){
        await axios.get(`https://contact.herokuapp.com/contact/${id}`)
        .then(function (response) {
            dispatch(contactDetail(response.data.data));
            dispatch(updateModel(response.data.data));
          })
          .catch(function (error) {
          })

    }

    return(
        <>

            <div className="flex flex-wrap justify-center">
            {contact.map((res) => (
                <div className="w-72 p-3 mb-2">
                    <div className="card shadow-xl shadow-slate-400 cursor-pointer" onClick={() => setContactDetail(res.id)}  data-bs-toggle="modal" data-bs-target="#detailModal">
                        <img src={res.photo} className="card-img-top h-60" style={{backgroundColor: "#3e92cc"}} alt="..."></img>
                        <div className="card-body text-center">
                            <label>{res.firstName}</label>
                            <label className="ml-1">{res.lastName}</label>
                            <p>{res.age}</p>
                        </div>
                        <div className="card-footer w-full text-center">
                            <button className="btn text-white" style={{backgroundColor: "#d8315b"}} data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setContactDetail(res.id)}>
                            Delete
                            </button>
                            <button className="btn btn-success ml-2" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => setContactDetail(res.id)}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            </div>

        <DetailContact />
        <DeleteContact />
        <UpdateContact />
        </>
    )
}