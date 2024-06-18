import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { auth, db } from '../db/firebase';
import { userState } from '../recoil/atoms';
import { User } from '../db/types';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const useUser = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({ id: firebaseUser.uid, ...userDoc.data() } as User);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  const registerUser = async (email: string, password: string, userInfo: Omit<User, 'email' | 'orders' | 'id'>): Promise<void> => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const newUser: User = { id: userId, email, orders: [], ...userInfo };

      await setDoc(doc(db, 'users', userId), newUser);

      setUser(newUser);
      toast.success("Successfully registered and logged in");
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.error("Email already in use. Please use a different email.");
          break;
        case 'auth/invalid-email':
          toast.error("Invalid email format.");
          break;
        case 'auth/weak-password':
          toast.error("Password is too weak.");
          break;
        default:
          toast.error("Registration failed: " + error.message);
      }
      console.error(error);
    }
  };

  const loginUser = async (email: string, password: string): Promise<void> => {
    try {

      if(email && password){

        
        const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setUser({ id: userId, ...userDoc.data() } as User);
        toast.success("Successfully logged in");
      }
    }else{
      toast.error("Please enter all data")
    }
    } catch (error: any) {
      toast.error("Error!!")
      console.error(error);
    }
  };

  const logoutUser = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Successfully logged out");
    } catch (error: any) {
      
      console.error(error);
    }
  };

  const updateUser = async (userId: string, userData: Partial<User>): Promise<void> => {
    try {
      await updateDoc(doc(db, 'users', userId), userData);
      if (user) {
        setUser({ ...user, ...userData });
        toast.success("User information updated successfully");
      }
    } catch (error: any) {
      toast.error("Update failed: " + error.message);
      console.error(error);
    }
  };

  return { user, registerUser, loginUser, logoutUser, updateUser };
};
