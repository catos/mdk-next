import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"

export interface IAdmin {
  id: string
}

export async function getAdmin(uid?: string) {
  if (!uid) {
    return null
  }

  const ref = doc(db, "admins", uid)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    return null
  }

  return { id: snap.id, ...snap.data }
}
