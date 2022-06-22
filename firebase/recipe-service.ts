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
  startAt,
  where,
} from "firebase/firestore"
import slugify from "lib/slugify"
import { db } from "./firebase"

export interface IRecipe {
  id: string
  slug: string
  // TODO: published: boolean,
  created: number
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


// https://stackoverflow.com/a/69036032
export async function getRecipes(take = 10, last?: any) {
  const ref = collection(db, "recipes")

  const constraints = []

  if (last) constraints.push(startAfter(last))

  const q = query(
    ref,
    where("type", "==" , 1),
    // TODO: where("published", "==" , true)
    orderBy("created", "desc"),
    ...constraints,
    limit(take),
  )
   
  const snapshot = await getDocs(q)
  const recipes = snapshot.docs.map((doc) => {
    // TODO: replace id with slug
    const data = doc.data()
    return {
      id: doc.id,
      // slug: slugify(data.name),
      ...data,
      created: data.created.toMillis() || 0,
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

  const dbRecipe = snap.data()
  
  return {
    id: snap.id,
    ...dbRecipe,
  } as IRecipe

}

export async function saveRecipe(recipe: IRecipe) {
  const ref = doc(db, "recipes", recipe.id)  
  await setDoc(ref, recipe)
}