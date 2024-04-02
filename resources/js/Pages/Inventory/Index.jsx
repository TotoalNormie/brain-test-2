import Authenticated from "@/Layouts/AuthenticatedLayout";
import animation from "./animation.module.css";
import { useState } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";

// const chests = ["mixed", "card", "theme"];

const Chest = ({ type = "mix", hover = false }) => {
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
            <div className={`${animation.appear} w-[13rem]`}>
                <img src="glow.png" alt="" className="w-full" />
            </div>
        </div>
    );
};

export default function Inventory({ auth, errors, item, chests }) {
    const [chest, setChest] = useState();
    const [reward, setReward] = useState();

    const openChest = (selectedChest) => {
        router.post(route("chest.buy"), { type: selectedChest });
    };

    console.log(item);

    return (
        <Authenticated user={auth.user}>
            <h1>works</h1>
            <p>{errors?.coins}</p>
            <div className="flex justify-center flex-wrap gap-4 *:w-[10rem]">
                {chests.map(({ type, price }) => (
                    <div
                        key={type}
                        className="flex flex-col gap-2 justify-centers"
                    >
                        <button onClick={() => openChest(type)}>
                            <Chest type={type} hover />
                        </button>
                        <p>Price: {price}</p>
                    </div>
                ))}
            </div>

            {/* <div className="w-80 mx-auto relative isolate">
                <div className={`${animation.burst} w-60 mx-auto`}>
                    <div className={`${animation.fade}`}>
                        <Chest />
                    </div>
                </div>
                <div className="absolute inset-0 grid place-items-center -z-10">
                    <h1>test</h1>
                </div>
                <div className="absolute inset-0 grid place-items-center -z-10">
                    <Glow className={`opacity-60`} />
                </div>
            </div> */}
        </Authenticated>
    );
}
