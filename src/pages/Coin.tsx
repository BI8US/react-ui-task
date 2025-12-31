import { useState } from "react";
import { MdHome } from "react-icons/md";

import { Button } from "../components/Button";
import { useLanguage } from "../context/LanguageContext";

export default function Coin() {
    const { TEXTS } = useLanguage();
    const [isFlipping, setIsFlipping] = useState(false);
    const [result, setResult] = useState<"HEADS" | "TAILS" | null>(null);

    const flipCoin = () => {
        setIsFlipping(true);
        setResult(null);

        const outcome = Math.random() > 0.5 ? "HEADS" : "TAILS";

        setTimeout(() => {
            setResult(outcome);
            setIsFlipping(false);
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col items-center animate-fade-in space-y-8">
            <div className="text-center">
                <div className="flex justify-between items-center w-full mb-6">
                    <h1 className="text-2xl font-bold text-text-main">{TEXTS.pages.coin.title}</h1>
                    <Button
                        to="/"
                        variant="ghost"
                        rounded
                        leftIcon={<MdHome />}
                        className="h-10 px-4"
                    >
                        {TEXTS.nav.home}
                    </Button>
                </div>
                <p className="text-text-muted">{TEXTS.pages.coin.content}</p>
            </div>

            <div className="perspective-1000 w-48 h-48 relative">
                <div
                    className={`w-full h-full relative transition-transform duration-1000 transform-style-3d ${isFlipping ? "animate-flip" : ""}`}
                    style={{
                        transform: result === "TAILS" ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                >
                    <div className="absolute inset-0 w-full h-full bg-text-main rounded-full border-4 border-text-secondary flex items-center justify-center backface-hidden">
                        <span className="text-4xl font-bold text-text-secondary">
                            {TEXTS.pages.coin.heads}
                        </span>
                    </div>

                    <div
                        className="absolute inset-0 w-full h-full bg-text-secondary rounded-full border-4 border-text-main flex items-center justify-center backface-hidden"
                        style={{ transform: "rotateY(180deg)" }}
                    >
                        <span className="text-4xl font-bold text-text-main">
                            {TEXTS.pages.coin.tails}
                        </span>
                    </div>
                </div>
            </div>

            <Button onClick={flipCoin} disabled={isFlipping} rounded className="w-40 h-12 text-lg">
                {isFlipping ? TEXTS.pages.coin.flipping : TEXTS.pages.coin.flip}
            </Button>
        </div>
    );
}
