import { createContext, useContext, useReducer } from 'react';

const WishlistContext = createContext(null);

const initialState = {
  items: [],
  isOpen: false,
};

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(
        item => item._id === action.payload._id
      );

      if (exists) return state;

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          item => item._id !== action.payload
        ),
      };

    case 'TOGGLE_WISHLIST':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'CLOSE_WISHLIST':
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
}


export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const toggleWishlist = () => {
    dispatch({ type: 'TOGGLE_WISHLIST' });
  };

  const closeWishlist = () => {
    dispatch({ type: 'CLOSE_WISHLIST' });
  };

  const isInWishlist = (productId) => {
    return state.items.some(item => item._id === productId);
  };

  const totalItems = state.items.length;

  return (
    <WishlistContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        toggleWishlist,
        closeWishlist,
        isInWishlist,
        totalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
