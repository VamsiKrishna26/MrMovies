import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const config={
    apiKey: "AIzaSyAvfPJVBlYjFwmgogvetg7tfx1kQ1CBMAY",
    authDomain: "mr-movies-493ea.firebaseapp.com",
    projectId: "mr-movies-493ea",
    storageBucket: "mr-movies-493ea.appspot.com",
    messagingSenderId: "583896887382",
    appId: "1:583896887382:web:16eb6dc8f16d6f806c4bf7",
    measurementId: "G-2XQZBJF09V"
};

export const createUserProfileDocument=async(userAuth,addtionalData)=>{
    if(!userAuth){
        return;
    }

    const userRef=firestore.doc(`users/${userAuth.uid}`);
    const snapshot=await userRef.get();
    if(!snapshot.exists){
        const {displayName,email}=userAuth;
        const createdAt=new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                wishlist:[],
                recentlyViewed:[],
                ...addtionalData
            })
        }catch(err){
            console.log(err);
        }
    }
    return userRef;
    
};

export const addTitleToRecentlyViewedFirestore=async(userId,titleId,recentlyViewed)=>{
    const userRef=firestore.doc(`users/${userId}`)
    const newSet=new Set([titleId,...recentlyViewed])
    await userRef.update({
        recentlyViewed:[...newSet].slice(0,15)
    })
}

export const addTitleToWishListFirestore=async (userId,titleId,wishlist)=>{
    const userRef=firestore.doc(`users/${userId}`);
    const newSet=new Set([...wishlist,titleId]);
    console.log(userId,titleId,wishlist);
    await userRef.update({
        wishlist:[...newSet]
    })
}

export const removeTitleFromWishlistFirestore=async(userId,titleId,wishlist)=>{
    const userRef=firestore.doc(`users/${userId}`);
    wishlist.splice(wishlist.indexOf(titleId),1);
    await userRef.update({
        wishlist:[...wishlist]
    })
}

firebase.initializeApp(config);

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle=async ()=>{
    await auth.signInWithPopup(provider);
};

export default firebase;