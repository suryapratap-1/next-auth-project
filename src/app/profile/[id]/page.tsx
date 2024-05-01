export default function ProfileID ({params}: any) {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page</p>
            <span className=" p-2 ml-2 rounded bg-orange-500 text-black">Profile with ID: {params.id}</span>
        </main>
    )
}