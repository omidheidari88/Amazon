import {actions} from '../../actions';

// product: {items: [], messages: '', hasError: false, errorMessages: ''},
export const total = (basket) => basket?.reduce((a, b) => b.price + a, 0);
const reducer = (productState, action) => {
	let result = productState;
	switch (action.type) {
		case actions.ADD_PRODUCT_SUCCESS:
			result = {...productState, items: [...productState.items, action.payload]};
			break;
		case actions.ADD_PRODUCT_FAILED:
			result = {...productState, hasError: true, errorMessages: action.payload.messages};
			break;
		case actions.REMOVE_PRODUCT_SUCCESS:
			const index = productState.items.findIndex((item) => item.id === action.payload.id);
			let newBasket = [...productState.items];
			index >= 0 ? newBasket.splice(index, 1) : console.warn(`Cant remove product (id: ${action.payload.id})`);
			result = {...productState, items: newBasket};
			break;
		case actions.REMOVE_PRODUCT_FAILED:
			result = {...productState, hasError: true, errorMessages: action.payload.messages};
			break;
		default:
			result = productState;
			break;
	}
	return result;
};

export default reducer;
