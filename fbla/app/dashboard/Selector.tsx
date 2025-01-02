export default function Selector() {
  return (
    <div className="w-1/5 h-full border-r border-gray-600 flex sticky">
        <ul className="text-text text-lg my-6 [&>*]:my-2 ml-16 [&>*]:transition-all">
            <li className="hover:scale-105">Profile</li>
            <li className="hover:scale-105">Preferences</li>
            <li className="hover:scale-105">Resume</li>
        </ul>
    </div>
  );
}
