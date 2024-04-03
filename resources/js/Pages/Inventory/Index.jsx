import Authenticated from "@/Layouts/AuthenticatedLayout";
import animation from "./animation.module.css";
import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { Popup } from "@/Components/Popup";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { selectTheme } from "@/selectTheme";
import { selectCards } from "@/selectCards";

// const chests = ["mixed", "card", "theme"];

const Chest = ({ type = "mixed", hover = false }) => {
    return (
        <div className={`grid group`}>
            <img
                className={`${animation.top} ${
                    hover
                        ? "group-hover:-translate-y-2 transition-transform duration-300"
                        : ""
                }`}
                src={`${type}-chest-top.png`}
                alt=""
            />
            <img
                className={`${animation.bottom}`}
                src={`${type}-chest-bottom.png`}
                alt=""
            />
        </div>
    );
};

const Glow = ({ className }) => {
    return (
        <div className={`${animation.rotate} ${className}`}>
            <div className={`${animation.appear} w-[25rem]`}>
                <img src="glow.png" alt="" className="w-full" />
            </div>
        </div>
    );
};

export default function Inventory({ auth, errors, chests, inventory }) {
    const [chest, setChest] = useState();
    const [reward, setReward] = useState();
    const [open, setOpen] = useState(false);

    const openChest = (selectedChest) => {
        router.post(
            route("chest.buy"),
            { type: selectedChest },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
        setChest(selectedChest);
    };

    useEffect(() => {
        if (!errors?.item) return;

        setReward(JSON.parse(errors?.item));
        console.log(JSON.parse(errors?.item));
    }, [errors]);

    console.log(inventory);

    const { cards, theme: themes } = inventory;

    const sellItem = (id) => {
        router.post(route("item.sell"), { id });
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Inventory" />
            <div className="w-[min(100%,_60rem)] mx-auto">
                <div className="flex flex-col gap-10 align-center p-8">
                    <h2>Chests:</h2>
                    <div className="flex justify-center flex-wrap gap-8 *:w-[13rem]">
                        {chests.map(({ type, price }) => (
                            <div
                                key={type}
                                className="flex flex-col gap-2 justify-centers"
                            >
                                <button onClick={() => openChest(type)}>
                                    <Chest type={type} hover />
                                </button>
                                <h4 className="capitalize">{type} chest</h4>
                                <p className="text-accent">Price: {price}c</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-red-500">{errors?.coins}</p>
                </div>
                <div className="flex flex-col gap-10 align-center p-8">
                    <h2>Inventory: </h2>
                    <h3 className="text-accent">Cards:</h3>
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(13rem,1fr))] gap-4">
                        <div
                            className={`default-theme flex flex-col gap-2`}
                            key="default"
                        >
                            <h3 className="text-bold text-3xl text-center capitalize">
                                default
                            </h3>
                            <div className="flex justify-between">
                                <p className="text-xl">default</p>
                                <span>|</span>
                                <p className="text-xl">0c</p>
                            </div>
                            <div className="flex wrap gap-4">
                                <SecondaryButton
                                    className="w-full text-center"
                                    onClick={() => selectCards("animals")}
                                >
                                    Select
                                </SecondaryButton>
                            </div>
                        </div>
                        {cards?.map(({ item, id }) => (
                            <div
                                key={id}
                                className="flex flex-col gap-2 bg-secondary rounded-xl p-4"
                            >
                                <div className="flex *:w-14 mx-auto">
                                    <img
                                        src={`icons/${item?.name}/icon-8.png`}
                                        alt=""
                                        className="-mr-5 -rotate-[30deg]"
                                    />
                                    <img
                                        src={`icons/${item?.name}/icon-9.png`}
                                        alt=""
                                        className="z-10"
                                    />
                                    <img
                                        src={`icons/${item?.name}/icon-1.png`}
                                        alt=""
                                        className="-ml-5 rotate-[30deg] z-20"
                                    />
                                </div>
                                <h3 className="text-bold brake-word text-center text-2xl capitalize">
                                    {item?.name}
                                </h3>
                                <div className="flex justify-between">
                                    <p className=" text-xl">{item?.type}</p>
                                    <span>|</span>
                                    <p className="text-xl">{item?.price}c</p>
                                </div>
                                <div className="flex wrap gap-4">
                                    <PrimaryButton onClick={() => sellItem(id)}
                                    className="w-full text-center"

                                    >
                                        Sell
                                    </PrimaryButton>
                                    <SecondaryButton
                                        className="w-full text-center"
                                        onClick={() => selectCards(item?.name)}
                                    >
                                        Select
                                    </SecondaryButton>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h3 className="text-accent">Themes:</h3>
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(13rem,1fr))] gap-4">
                        <div
                            className={`default-theme flex flex-col gap-2`}
                            key="default"
                        >
                            <h3 className="text-bold text-3xl text-center capitalize">
                                default
                            </h3>
                            <div className="flex justify-between">
                                <p className="text-xl">default</p>
                                <span>|</span>
                                <p className="text-xl">0c</p>
                            </div>
                            <div className="flex wrap gap-4">
                                <SecondaryButton
                                    className="w-full text-center"
                                    onClick={() => selectTheme("default")}
                                >
                                    Select
                                </SecondaryButton>
                            </div>
                        </div>
                        {themes?.map(({ item, id }) => (
                            <div
                                className={`${item?.name}-theme flex flex-col gap-2`}
                                key={id}
                            >
                                <h3 className="text-bold text-3xl text-center capitalize">
                                    {item?.name}
                                </h3>
                                <div className="flex justify-between">
                                    <p className="text-xl">{item?.type}</p>
                                    <span>|</span>
                                    <p className="text-xl">{item?.price}c</p>
                                </div>
                                <div className="flex wrap gap-4">
                                    <PrimaryButton
                                        className="w-full text-center"
                                        onClick={() => sellItem(id)}
                                    >
                                        Sell
                                    </PrimaryButton>
                                    <SecondaryButton
                                        className="w-full text-center"
                                        onClick={() => selectTheme(item?.name)}
                                    >
                                        Select
                                    </SecondaryButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Popup
                isSeen={reward}
                name="chest"
                closeOnClick={() => {
                    setReward(false);
                    setOpen(false);
                }}
            >
                <div className="relative isolate">
                    <div
                        className={`${
                            open ? animation.burst : ""
                        } w-60 mx-auto cursor-pointer`}
                        onClick={() => setOpen(true)}
                    >
                        <div className={`${open ? animation.fade : ""}`}>
                            <Chest type={chest} />
                        </div>
                    </div>
                    {open && (
                        <>
                            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Glow className={`opacity-70`} />
                            </div>
                            <div
                                className={`${animation.appear} fixed inset-0 grid place-items-center `}
                            >
                                {reward?.type == "theme" ? (
                                    <div
                                        className={`${reward?.name}-theme flex flex-col gap-2`}
                                    >
                                        <h3 className="text-bold capitalize">
                                            {reward?.name}
                                        </h3>
                                        <div className="flex justify-between">
                                            <p className="text-accent text-xl">
                                                {reward?.type}
                                            </p>
                                            <span>|</span>
                                            <p className="text-accent text-xl">
                                                {reward?.price}c
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex *:w-20 mx-auto">
                                            <img
                                                src={`icons/${reward?.name}/icon-8.png`}
                                                alt=""
                                                className="-mr-10 -rotate-[30deg]"
                                            />
                                            <img
                                                src={`icons/${reward?.name}/icon-9.png`}
                                                alt=""
                                                className="z-10"
                                            />
                                            <img
                                                src={`icons/${reward?.name}/icon-1.png`}
                                                alt=""
                                                className="-ml-10 rotate-[30deg] z-20"
                                            />
                                        </div>
                                        <h3 className="text-bold capitalize">
                                            {reward?.name}
                                        </h3>
                                        <div className="flex justify-between">
                                            <p className="text-accent text-xl">
                                                {reward?.type}
                                            </p>
                                            <span>|</span>
                                            <p className="text-accent text-xl">
                                                {reward?.price}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </Popup>
        </Authenticated>
    );
}
