import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, UserCredential, updateProfile as fbUpdateProfile } from "firebase/auth"
import React from "react"
import { auth } from "../firebase/firebase"

export interface IUser {
  id: string
  email: string
  displayName: string
  photoURL: string
}

interface IAuthContext {
  user: IUser
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<UserCredential>
  // loginWithProvider: () => Promise<void>
  logout: () => Promise<void>
  register: (username: string, password: string) => Promise<UserCredential>

  updateProfile: (displayName: string, photoURL: string) => Promise<void>
}

const initialUser = {
  id: "",
  email: "",
  displayName: "",
  photoURL: "",
} as IUser

const AuthContext = React.createContext({} as IAuthContext)

export const AuthProvider: React.FC = (props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true)
  const [user, setUser] = React.useState<IUser>(initialUser)

  React.useEffect(() => {
    auth.onAuthStateChanged((data: User | null) => {
      const _user = data
        ? {
          id: data.uid,
          email: data.email ?? "",
          displayName: data.displayName ?? "",
          photoURL: data.photoURL ?? "",
        }
        : initialUser
      setUser(_user)
      setIsAuthenticated(!!(_user && _user.email))
    })
  }, [])

  // TODO: WTB return-url!
  const login = async (
    username: string,
    password: string
  ): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, username, password)
  }

  // const loginWithProvider = async (): Promise<void> => {
  //   const _provider = new GoogleAuthProvider()
  //   return firebase.auth().signInWithRedirect(_provider)
  // }

  const logout = async () => {
    await signOut(auth)
  }

  const register = async (username: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, username, password)
  }

  const updateProfile = async (
    displayName: string,
    photoURL: string
  ): Promise<void> => {
    if (!auth.currentUser) {
      return
    }

    fbUpdateProfile(auth.currentUser, {
      displayName,
      photoURL,
    })
  }

  const value = {
    user,
    isAuthenticated,
    login,
    // loginWithProvider,
    logout,
    register,
    updateProfile,
  }

  return <AuthContext.Provider value={value} {...props} />
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("You must use context within a provider")
  }

  return context
}

export default useAuth