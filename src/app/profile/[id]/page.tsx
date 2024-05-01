export default function ProfileID ({params}: any) {
    return (
        <main>
            <h1>Profile</h1>
            <p className="text-3xl">Profile with ID: {params.id}</p>
        </main>
    )
}