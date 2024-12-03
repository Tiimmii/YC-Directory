import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

// run npx sanity@latest schema extract --path=./sanity/extract.json to extract sanity schemas
// create sanity-typegen.json file in root directory, copy and paste necessary code inside and run npx sanity@latest typegen generate to generate typescript types for schemas and GROQ queries
// make sure to copy and paste scripts for typegen in package.json to automate type generation.
// after these run npm run typegen for automation and adding new types


// To use LiveContent API
// 1. run npm i server-only
// 2. create new  lib file in /sanity called live.ts
// 3. copy code in live.ts 
// 4. set in .env.local NEXT_PUBLIC_SANITY_API_VERSION = "vX"
// 5. Next change post to the new post below
// 6. import <SanityLive/> at the bottom
export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log(session)

  // const posts = await client.fetch(STARTUPS_QUERY);
  const { data: posts} = await sanityFetch({ query: STARTUPS_QUERY, params}); //live revalidation for new contents
  
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
            posts.map((post: StartupTypeCard, index: number)=>(
              <StartupCard key={post?._id} post={post}/>
            ))
          ):
          <p className="no-results">No startups found</p>
          }
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
