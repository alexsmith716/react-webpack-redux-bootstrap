import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';

export default (state = [], action = {}) => {
  switch(action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          type: action.message.type,
          text: action.message.text
        }
      ];
    case DELETE_FLASH_MESSAGE:
      return [
          ...state.filter((item, index) => item.id !== action.id)
      ];
    default: 
      return state;
  }
};