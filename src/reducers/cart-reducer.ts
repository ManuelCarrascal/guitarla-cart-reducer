import { db } from '../data/db';
import { CartItem, Guitar } from '../types';

export type cartActions =
	| { type: 'add-to-cart'; payload: { item: Guitar } }
	| { type: 'remove-from-cart'; payload: { id: Guitar['id'] } }
	| { type: 'decrease-quantity'; payload: { id: Guitar['id'] } }
	| { type: 'increase-quantity'; payload: { id: Guitar['id'] } }
	| { type: 'clear-cart' };

export type CartState = {
	data: Guitar[];
	cart: CartItem[];
};

export const initialState: CartState = {
	data: db,
	cart: [],
};

//const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

export const cartReducer = (
	state: CartState = initialState,
	action: cartActions
) => {
	switch (action.type) {
		case 'add-to-cart': {
			const itemExists = state.cart.find(
				(guitar) => guitar.id === action.payload.item.id
			);

			let updatedCart: CartItem[] = [];

			if (itemExists) {
				updatedCart = state.cart.map((item) => {
					if (item.id === action.payload.item.id) {
						if (item.quantity < MAX_ITEMS) {
							return {
								...item,
								quantity: item.quantity + 1,
							};
						} else {
							return item;
						}
					} else {
						return item;
					}
				});
			} else {
				const newItem: CartItem = { ...action.payload.item, quantity: 1 };
				updatedCart = [...state.cart, newItem];
			}

			return {
				...state,
				cart: updatedCart,
			};
		}
		case 'remove-from-cart':
			return {
				...state,
			};
		case 'decrease-quantity':
			return {
				...state,
			};
		case 'increase-quantity':
			return {
				...state,
			};
		case 'clear-cart':
			return {
				...state,
			};
	}
};
