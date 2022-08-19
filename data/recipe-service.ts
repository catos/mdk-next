import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from "firebase/firestore"
import { db } from "./firebase"

export interface IRecipe {
  id: string
  slug: string
  created: any
  published?: number
  description: string
  ingredients: string
  steps: string
  name: string
  source?: string
  image: string
  tags: string[]
  time: number
  type: number
}

export const defaultRecipe: IRecipe = {
  id: "",
  slug: "",
  created: new Date().toString(),
  published: undefined,
  description: "",
  ingredients: "",
  steps: "",
  name: "",
  source: "",
  image: "",
  tags: [],
  time: -1,
  type: 1,
}

// https://stackoverflow.com/a/69036032
export async function getRecipes(take = 10, afterId?: string) {
  const ref = collection(db, "recipes")

  const constraints = [
    where("type", "==", 1),
    // TODO: where("published", "==" , true)
    orderBy("created", "desc"),
  ]

  if (afterId) {
    const snap = await getDoc(doc(db, "recipes", afterId))
    constraints.push(startAfter(snap))
  }
  if (take) constraints.push(limit(take))

  const q = query(ref, ...constraints)

  const snapshot = await getDocs(q)

  const recipes = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as IRecipe
  })

  return recipes
}

export async function getRecipe(id: string, rendered = true) {
  const ref = doc(db, "recipes", id)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    return null
  }

  return { id: snap.id, ...snap.data() } as IRecipe
}

export async function saveRecipe(recipe: IRecipe) {
  const ref = doc(db, "recipes", recipe.id)
  await setDoc(ref, recipe)
}
