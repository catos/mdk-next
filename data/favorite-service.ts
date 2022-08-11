import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "./firebase"

const ref = collection(db, "favorites")

export interface IFavorite {
  recipeId: string
  userId: string
}

export async function getFavorites(userId: string) {
  const q = query(ref, where("userId", "==", userId))
  const snap = await getDocs(q)

  const favorites = snap.docs.map((doc) => {
    return doc.data() as IFavorite
  })

  return favorites
}

export async function addFavorite(recipeId: string, userId: string) {
  const favorite: IFavorite = {
    recipeId,
    userId,
  }

  const ref = collection(db, "favorites")
  const q = query(
    ref,
    where("recipeId", "==", recipeId),
    where("userId", "==", userId)
  )
  const snap = await getDocs(q)

  // Check if favorite exists first
  if (snap.empty) {
    await addDoc(ref, favorite)
  }
}

export async function removeFavorite(recipeId: string, userId: string) {
  const ref = collection(db, "favorites")
  const q = query(
    ref,
    where("recipeId", "==", recipeId),
    where("userId", "==", userId)
  )
  const snap = await getDocs(q)

  snap.docs.forEach((doc) => {
    deleteDoc(doc.ref)
  })
}
