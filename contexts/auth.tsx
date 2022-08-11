import { getAdmin } from "data/auth-service"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
  updateProfile as fbUpdateProfile,
} from "firebase/auth"
import { useRouter } from "next/router"
import React, { ReactNode } from "react"
import { auth } from "../data/firebase"

export interface IUser {
  id: string
  email: string
  displayName: string
  photoURL: string
  isAdmin: boolean
}

interface IAuthContext {
  user: IUser | null
  // TODO: do I need this now that user can be null ?
  // isAuthenticated: boolean
  login: (username: string, password: string) => Promise<UserCredential>
  // loginWithProvider: () => Promise<void>
  logout: (returnUrl: string) => Promise<void>
  register: (username: string, password: string) => Promise<UserCredential>

  updateProfile: (displayName: string, photoURL: string) => Promise<void>
}

// TODO: need or remove ?
// const initialUser = {
//   id: "",
//   email: "",
//   displayName: "",
//   photoURL: "",
// } as IUser

const AuthContext = React.createContext({} as IAuthContext)

interface IAuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = (props) => {
  const router = useRouter()
  // const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [user, setUser] = React.useState<IUser | null>(null)

  React.useEffect(() => {
    auth.onAuthStateChanged(async (firebaseUser: User | null) => {
      if (firebaseUser) {
        const admin = await getAdmin(firebaseUser.uid)

        // TODO: isAdmin is not secure!
        const _user = {
          id: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          displayName: firebaseUser.displayName ?? "",
          photoURL: firebaseUser.photoURL ?? "",
          isAdmin: Boolean(admin),
        }

        setUser(_user)
        // setIsAuthenticated(!!(_user && _user.email))
      } else {
        setUser(null)
        // setIsAuthenticated(false)
      }
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

  const logout = async (returnUrl: string = "/") => {
    await signOut(auth)
    router.push(returnUrl)
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
    // isAuthenticated,
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
