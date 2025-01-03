import JobCard from "./components/JobCard";
import Header from "./Header";

// This function fetches the data from the API on the server side
async function fetchPosts() {
  const response = await fetch("https://fbla.ineshd.com/listings");
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export default async function Home() {
  // Fetch the data in the server-side function
  const posts = await fetchPosts();

  return (
    <div className="overflow-x-hidden w-screen h-screen">
      <Header />
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Loop over the posts and render JobCard for each post */}
          {Object.entries(posts).map(([id, post]) => (
            <JobCard key={id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
