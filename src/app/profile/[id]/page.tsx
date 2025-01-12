export default function UserProfile({ params }: any) {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black py-6 px-4">
      <h1 className="text-3xl font-semibold text-green-400 mb-4">
        User Profile: {params.id}{" "}
      </h1>
    </div>
  );
}
