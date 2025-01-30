import Card from "../browse/Card";

export default function Backend() {
  return <div className="bg-background-brand overflow-hidden w-screen h-screen">
    <h1 className="text-3xl p-12">Pending Listings</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center items-center mx-16">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
    </div>
  </div>;
}
