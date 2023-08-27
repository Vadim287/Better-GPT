import Galery from '@/components/images/galery'
import prismadb from '@/lib/prismadb'

const ImagesPage = async () => {
  const images = await prismadb.image.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      shared: true,
    },
  })

  return (
    <section className='mt-16 max-w-7xl mx-auto h-full'>
      <div>
        <h1 className='text-3xl font-extrabold'>Image Gallery</h1>
        <p className='mt-2'>
          Browse through a collection of imaginative and visually
          stunning images generated by DALL-E AI
        </p>
      </div>
      <div className='mt-16 h-full'>
        <Galery images={images} />
      </div>
    </section>
  )
}

export default ImagesPage
