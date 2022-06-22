import { getSlugId } from "lib/get-slug-id"
import { useRouter } from "next/router"

export default function Menus() {
  const router = useRouter()
  const {slug} = router.query
  const id = getSlugId(slug)
  
  return (
    <div>
      <h1>Meny, slug: {slug}, id: {id}</h1>
    </div>
  )
}