import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  contactList: [], 
  contactDetail: {}, 
  createContact: {}, 
  updateContact: {}, 
  isUpdateDone: false, 
  isCreateDone: false, 
  isDeleteDone: false,
  modalNotif: {}
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    createContact(state, action) {
      return {
        ...state,
        createContact: action.payload,
      };
    },
    contactDetail(state, action) {
      return {
        ...state,
        contactDetail: action.payload,
      };
    },
    contactList(state, action){
        return{
            ...state,
            contactList: action.payload
        }
    },
    updateModel(state, action){
        return{
            ...state,
            updateContact: action.payload
        }
    },
    updateFlagAction(state, action){
      return {
        ...state,
        isUpdateDone: action.payload
      }
    },
    createFlagAction(state, action){
      return {
        ...state,
        isCreateDone: action.payload
      }
    },
    deleteFlagAction(state, action){
      return {
        ...state,
        isDeleteDone: action.payload
      }
    },
    setModalNotif(state, action){
      return{
        ...state,
        modalNotif: action.payload
      }
    }
  },
});
export const { createContact, contactDetail, contactList, updateModel, createFlagAction, updateFlagAction, deleteFlagAction, setModalNotif } = contactSlice.actions;
export default contactSlice.reducer;