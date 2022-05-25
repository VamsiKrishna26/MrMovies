import { addTitleToRecentlyViewedFirestore, addTitleToWishListFirestore, removeTitleFromWishlistFirestore } from '../../firebase/firebase.util';
import {UserActionTypes} from './user.types';

export const setCurrentUser=user=>({
    type:UserActionTypes.SET_CURRENT_USER,
    payload:user
});


export const addTitleToRecentlyViewed=()=>({
    type:UserActionTypes.ADD_TO_RECENTLY_VIEWED
})

export const addTitleToRecentlyViewedAsync=(userId,titleId,recentlyViewed)=>{
    return async dispatch=>{
        await addTitleToRecentlyViewedFirestore(userId,titleId,recentlyViewed);
        dispatch(addTitleToRecentlyViewed())
    }
}

export const addTitleToWishList=()=>({
    type:UserActionTypes.ADD_TO_WISHLIST
})

export const addTitleToWishlistAsync=(userId,titleId,wishlist)=>{
    return async dispatch=>{
        await addTitleToWishListFirestore(userId,titleId,wishlist);
        dispatch(addTitleToWishList())
    }
}

export const removeTitleFromWishlist=()=>({
    type:UserActionTypes.REMOVE_FROM_WISHLIST
})

export const removeTitleFromWishlistAsync=(userId,titleId,wishlist)=>{
    return async dispatch=>{
        await removeTitleFromWishlistFirestore(userId,titleId,wishlist);
        dispatch(removeTitleFromWishlist())
    }
}