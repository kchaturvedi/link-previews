import { getLinksMeta } from 'lib/meta'
import { fetchLinksFromContent } from 'lib/content'

export default function Home({ linksMetadata }) {
  const A = ({ href, linkText }) => {
    const metadata = linksMetadata.find((link) => link.href === href)
    return <LinkWithPreview metadata={metadata} linkText={linkText} />
  }

  /* in a production app, you would dynamically replace each <a> tag with a link's metadata, using contentlayer.dev, MDX.js, or similar tooling */
  return (
    <article className='container max-w-4xl mx-auto'>
      <h1>Hello world!</h1>
      <p>
        This is a simple example of link previews, powered by <A href='https://nextjs.org' linkText='NextJS' /> and <A href='https://tailwindcss.com' linkText='Tailwind CSS' />.
      </p>
    </article>
  )
}

export const getStaticProps = async () => {
  const links = await fetchLinksFromContent()
  return {
    props: {
      linksMetadata: await getLinksMeta(links),
      /* in a production app, content would be fetched here as well */
    },
  }
}

const LinkWithPreview = ({ metadata, linkText }) => {
  const { title, imgUrl, href } = metadata

  return (
    <div className='relative inline-block'>
      <a className='relative peer underline' href={href}>
        {linkText}
      </a>
      <div className='absolute w-48 bg-slate-200 rounded-2xl shadow-xl p-4 peer-hover:visible invisible'>
        <img src={imgUrl} className='rounded-xl h-36 w-full object-cover' loading='lazy' />
        <span className='text-sm font-semibold leading-tight mt-2'>{title}</span>
      </div>
    </div>
  )
}
