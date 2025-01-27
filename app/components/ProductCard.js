export default function ProductCard({ name }) {
    return (
      <div className="border p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">{name}</h3>
        <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg">Learn More</button>
      </div>
    );
  }
  