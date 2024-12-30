import JobCard from "./components/JobCard";
import Header from "./Header";

export default function Home() {
    return (
        <div className="w-screen h-screen p-5">
            <Header />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <JobCard
                    post={{
                        jobName: "Ball Eater",
                        companyName: "NBA",
                        image:
                            "https://cdn.discordapp.com/attachments/1232371268762865775/1323215484887371787/IMG_1541.png?ex=6773b3f3&is=67726273&hm=727abffcd6b559d25ad8afc80d7b596893902f6a46c05c4ee9a4940a9e8077ea&",
                        hours: "24 hrs/day",
                        pay: "Free",
                        duration: "Forever",
                    }}
                />
            </div>
        </div>
    );
}
