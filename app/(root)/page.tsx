import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/lib/queries";

// run npx sanity@latest schema extract --path=./sanity/extract.json to extract sanity schemas
// create sanity-typegen.json file in root directory, copy and paste necessary code inside and run npx sanity@latest typegen generate to generate typescript types for schemas and GROQ queries
export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPS_QUERY);
  
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
