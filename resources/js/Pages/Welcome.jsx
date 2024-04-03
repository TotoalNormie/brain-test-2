import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="h-screen grid place-items-center">
                <div className="p-8 b-4 b-text bg-secondary shadow-lg rounded-xl flex flex-col gap-10">
                    <h1 className="text-4xl font-bold">Welcome to BrainTest</h1>
                    <div className="flex wrap justify-around">
                        <a href="login">Log in</a>
                        <a href="stats">Statistics</a>
                        <a href="register"> Register</a>
                    </div>
                </div>
            </div>
        </>
    );
}
