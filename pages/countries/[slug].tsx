import { useRouter } from 'next/router'

export default function Country() {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div className='min-h-screen'>
      {slug}
    </div>)
}