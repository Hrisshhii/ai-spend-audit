import SpendForm from "@/components/SpendForm";

export default function Home() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        Stop Overpaying for AI Tools
      </h1>
      <p className="text-gray-400 mb-6">
        Get an instant audit of your AI stack and see how much you can save.
      </p>

      <SpendForm/>
    </main>
  );
}