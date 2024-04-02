import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Check, X } from "@phosphor-icons/react";
import { MaterialSymbol } from "react-material-symbols";

const grid = "grid grid-cols-[1fr_6fr_2fr_2fr] gap-1 rounded-xl text-center";

export default function Dashboard({ auth, leaderboard, history }) {
    console.log(leaderboard, history);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-12 flex items-center flex-col">
                <h2 className="text-3xl font-bold text-center mb-4">
                    Leaderboard:
                </h2>
                <div className="p-3 grid gap-2 w-[min(100%,_40rem)] ">
                    <div className={`p-3 ${grid} bg-secondary`}>
                        <h5>Place</h5>
                        <h5>Player</h5>
                        <h5>Score</h5>
                        <h5>Level</h5>
                    </div>
                    {leaderboard.map((player, index) => (
                        <div className={`p-3 ${grid} bg-primary `}>
                            <p className="font-bold text-2xl text-background">
                                {index + 1}.
                            </p>
                            <p className="text-background text-lg">
                                {player?.user?.name}
                            </p>
                            <p className="text-background text-lg">
                                {player?.score}
                            </p>
                            <p className="text-background text-lg">
                                {player?.level}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-12 w-[min(100%,_40rem)]">
                    <h2 className="text-3xl font-bold text-center mb-4">
                        History:
                    </h2>
                    <div className="p-3 grid grid-cols-[repeat(auto-fit,_minmax(10rem,1fr))] gap-2 w-full max-w-[40rem]">
                        {history.map((game) => (
                            <div className="p-2 flex gap-2 items-center rounded-xl bg-secondary">
                                <div>
                                    {/* <MaterialSymbol icon="folder" size={24} fill grade={-25} color='red' /> */}
                                    {game.gameWon ? (
                                        <Check size={32} color="var(--text)" />
                                    ) : (
                                        <X size={32} color="var(--text)" />
                                    )}
                                </div>
                                <div>
                                    <p>Level: {game.level}</p>
                                    <p>Score: {game.score}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
