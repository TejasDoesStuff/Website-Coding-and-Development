import JobCard from "./components/JobCard";
import Header from "./Header";

// interface Review {
//     user: string
//     text: string
//     stars: number
// }

const reviews = [
    {user: "Bob", text:"They are very good.", stars:5},
    {user: "Tejas", text:"I hate this company", stars:2},
    {user: "Ani", text:"This was pretty good but kinda mid", stars:4},
    {user: "Inesh", text:"ASS", stars:1},
    {user: "Jeff", text:"Average ahh company", stars:3},

]

export default function Home() {
    return (
        <div className="w-screen h-screen p-5">
            <Header />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <JobCard
                    post={{
                        title: "Land Surveyor",
                        company: "Puget Sound",
                        thumbnailImage:
                            "/static/Land Surveyor Thumbnail.jpeg",
                        expandedImages:
                            ["/static/Land Surveyor Expanded.jpeg","/static/Land Surveyor Expanded 2.jpeg","/static/Land Surveyor Expanded 3.jpeg"],
                        hours: "40 hrs/week",
                        pay: "$45/hr",
                        duration: "6 months",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta arcu sed elit varius, non tempus urna eleifend. Aliquam id mattis massa. Phasellus lobortis ac dui nec congue. Aliquam eget augue dui. Etiam euismod consequat tortor, at venenatis nisl luctus et. Ut quis nibh ut orci ornare convallis. Nam et augue augue. Pellentesque augue neque, vehicula a nisl non, consequat consequat neque. Donec finibus enim eget lobortis cursus. Integer venenatis, risus at condimentum rhoncus, neque mi pla",
                        requirements: ["Must be at least 25 years old", "Bachelor's Degree in Civil Engineering"],
                        tags: ["strong", "big", "physical", "rough"],
                        reviews: reviews
                    }}
                />
            </div>
        </div>
    );
}
