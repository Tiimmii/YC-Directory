import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;

  const posts = [{
    _createdAt: new Date(),
    views: 55,
    author: { _id: 1, name: 'Adrian'},
    _id: 1,
    description: 'This is a description.',
    image: 'https://media.northwest.education/wp-content/uploads/2023/11/28104107/12.png',
    category: 'Robots',
    title: 'We Robots'
  }]
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch your startup <br /> Connect with Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, Get Noticed in Virtual Competitions</p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query? `Search results for ${query}` : 'All Startups'}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length>0?(
            posts.map((post: StartupCardType, index: number)=>(
              <StartupCard key={post?._id} post={post}/>
            ))
          ):
          <p className="no-results">No startups found</p>
          }
        </ul>
      </section>
    </>
  );
}
