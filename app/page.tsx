import SearchBar from "@/components/dashboard/searchBar";
export default async function Home() {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/homebg4.jpg')" }}
    >
      <SearchBar/>
    </div>
  );
}
