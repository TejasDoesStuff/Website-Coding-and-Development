import JobCard from "./components/JobCard";
import Header from "./Header";

export default function Home() {
    return (
        <div className="w-screen h-screen p-5">
            <Header />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <JobCard
                    post={{
                        jobName: "Land Surveyor",
                        companyName: "Puget Sound",
                        image:
                            "/static/Land Surveyor.jpeg",
                        hours: "40 hrs/week",
                        pay: "$45/hr",
                        duration: "6 months",
                        jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel pellentesque enim, id facilisis tellus. Donec a pharetra tortor. Sed varius, nunc quis consectetur convallis, dui lacus accumsan urna, vel semper quam urna at sem. Nulla lacinia nisl at dui scelerisque rhoncus. In nec sapien id nisl aliquam vehicula eu vel augue. Etiam interdum, arcu nec mattis commodo, nisl sapien lacinia augue, sed commodo mi erat quis magna. Quisque lectus nulla, varius elementum quam et, luctus lobortis arcu. Cras a vulputate purus. Sed ornare commodo lacus condimentum tincidunt. Pellentesque erat erat, ullamcorper sit amet sagittis non, egestas consectetur lacus. Integer"
                    }}
                />
            </div>
        </div>
    );
}
