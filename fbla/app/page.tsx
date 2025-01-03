import JobCard from "./components/JobCard";
import Header from "./Header";
import posts from "../posts.json"

export default function Home() {
    return (
        <div className="overflow-x-hidden w-screen h-screen p-5">
            <Header />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <JobCard
                    post={posts["1"]}
                />
            </div>
        </div>
    );
}