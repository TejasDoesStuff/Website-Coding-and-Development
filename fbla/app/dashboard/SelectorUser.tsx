export default function SelectorUser() {
  return (
    <div className="w-1/5 max-sm:hidden h-full border-r border-gray-600 flex sticky">
        <ul className="text-text text-lg my-6 [&>*]:my-2 ml-16 [&>*]:transition-all">
            <li className="hover:scale-105"><a href="/dashboard#profile">Profile</a></li>
            <li className="hover:scale-105"><a href="/dashboard#resume">Resume</a></li>
            <li className="hover:scale-105"><a href="/dashboard#preferences">Preferences</a></li>
            <li className="hover:scale-105"><a href="/dashboard#applications">Applications</a></li>
        </ul>
    </div>
  );
}
