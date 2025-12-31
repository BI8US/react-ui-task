import React, { useMemo, useState } from "react";
import { MdAdd, MdDelete, MdHome, MdRefresh } from "react-icons/md";

import { Button } from "../components/Button";
import Input from "../components/Input";
import { useLanguage } from "../context/LanguageContext";

interface WheelItem {
    id: string;
    label: string;
    weight: number;
    color: string;
}

const generateColor = (index: number) => {
    const goldenAngle = 137.508;
    const hue = (index * goldenAngle) % 360;
    const s = 70 / 100;
    const l = 60 / 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
        const k = (n + hue / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
};

const INITIAL_ITEMS: WheelItem[] = [
    { id: "1", label: "1", weight: 1, color: generateColor(0) },
    { id: "2", label: "2", weight: 1, color: generateColor(1) },
    { id: "3", label: "3", weight: 1, color: generateColor(2) },
];

export default function Wheel() {
    const { TEXTS } = useLanguage();
    const [items, setItems] = useState<WheelItem[]>(INITIAL_ITEMS);
    const [newName, setNewName] = useState("");
    const [newWeight, setNewWeight] = useState("1");
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState<WheelItem | null>(null);

    const totalWeight = useMemo(() => items.reduce((sum, item) => sum + item.weight, 0), [items]);

    const slices = useMemo(() => {
        if (totalWeight === 0) return [];

        let currentAngle = 0;

        return items.map((item) => {
            const percent = item.weight / totalWeight;
            const angle = percent * 360;

            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;

            const isFullCircle = angle === 360;

            const getCoordinates = (deg: number) => {
                const rad = (deg - 90) * (Math.PI / 180);
                return {
                    x: Math.cos(rad),
                    y: Math.sin(rad),
                };
            };

            const start = getCoordinates(startAngle);
            const end = getCoordinates(endAngle);

            const largeArcFlag = angle > 180 ? 1 : 0;

            const pathData = isFullCircle
                ? `M 0 0 m -1 0 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0`
                : `M 0 0 L ${start.x} ${start.y} A 1 1 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;

            currentAngle += angle;

            return {
                path: pathData,
                color: item.color,
                id: item.id,
            };
        });
    }, [items, totalWeight]);

    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName.trim()) return;
        const weightVal = parseFloat(newWeight) || 1;
        const newItem: WheelItem = {
            id: Date.now().toString(),
            label: newName.trim(),
            weight: weightVal > 0 ? weightVal : 1,
            color: generateColor(items.length),
        };
        setItems([...items, newItem]);
        setNewName("");
        setNewWeight("1");
    };

    const updateItem = (id: string, field: "label" | "weight", value: string) => {
        setItems(
            items.map((item) => {
                if (item.id !== id) return item;
                if (field === "weight") {
                    const val = parseFloat(value);
                    return { ...item, weight: val >= 1 ? val : 1 };
                }
                return { ...item, label: value };
            }),
        );
    };

    const removeItem = (id: string) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const spinWheel = () => {
        if (isSpinning || totalWeight === 0) return;
        setIsSpinning(true);
        setWinner(null);

        const randomSpin = 1800 + Math.random() * 360;
        const newRotation = rotation + randomSpin;
        setRotation(newRotation);

        const normalizedAngle = (360 - (newRotation % 360)) % 360;
        let currentAngle = 0;
        let winningItem = null;

        for (const item of items) {
            const sliceAngle = (item.weight / totalWeight) * 360;
            if (normalizedAngle >= currentAngle && normalizedAngle < currentAngle + sliceAngle) {
                winningItem = item;
                break;
            }
            currentAngle += sliceAngle;
        }

        setTimeout(() => {
            setIsSpinning(false);
            if (winningItem) setWinner(winningItem);
        }, 3000);
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8 animate-fade-in">
            <div className="flex-1 flex flex-col h-[calc(100vh-140px)] min-h-[500px]">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-text-main">{TEXTS.pages.wheel.title}</h1>
                    <Button to="/" variant="ghost" rounded leftIcon={<MdHome />}>
                        {TEXTS.nav.home}
                    </Button>
                </div>
                <p className="text-text-muted mb-4">{TEXTS.pages.wheel.desc}</p>

                <div className="flex-1 bg-background rounded-xl border border-border overflow-hidden flex flex-col">
                    <div className="overflow-y-auto p-4 space-y-3 flex-1">
                        {items.map((item) => {
                            const percent =
                                totalWeight > 0
                                    ? ((item.weight / totalWeight) * 100).toFixed(1)
                                    : "0";
                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary group"
                                >
                                    <div
                                        className="w-4 h-10 shrink-0 rounded-md"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <input
                                        className="flex-1 px-2 bg-transparent focus:ring focus:ring-text-main focus:bg-background text-text-main"
                                        value={item.label}
                                        onChange={(e) =>
                                            updateItem(item.id, "label", e.target.value)
                                        }
                                    />
                                    <div className="flex items-center gap-1 bg-transparent rounded-md px-2 py-1 border border-border">
                                        <span className="text-xs text-text-muted font-bold">
                                            W:
                                        </span>
                                        <input
                                            type="number"
                                            className="min-w-8 max-w-16 text-center bg-transparent focus:bg-background border-none focus:ring focus:ring-text-main"
                                            value={item.weight}
                                            onChange={(e) =>
                                                updateItem(item.id, "weight", e.target.value)
                                            }
                                            min="1"
                                        />
                                    </div>
                                    <div className="w-12 text-right text-xs text-text-muted">
                                        {percent}%
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-text-muted hover:text-danger p-1 transition-opacity"
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="p-4 border-t border-border">
                        <form onSubmit={addItem} className="flex gap-2">
                            <div className="flex-1">
                                <Input
                                    placeholder={TEXTS.pages.wheel.inputs.label}
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="h-10"
                                />
                            </div>
                            <div className="w-20">
                                <Input
                                    type="number"
                                    placeholder="1"
                                    value={newWeight}
                                    onChange={(e) => setNewWeight(e.target.value)}
                                    className="h-10 text-center"
                                    min="1"
                                />
                            </div>
                            <Button type="submit" rounded className="w-12 px-0 h-10">
                                <MdAdd />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[500px]">
                <div className="relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 filter">
                        <div className="border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] border-t-danger"></div>
                    </div>

                    <div
                        className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] transition-transform duration-[3000ms] cubic-bezier(0.2, 0.8, 0.2, 1)"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    >
                        <svg viewBox="-1 -1 2 2" className="w-full h-full transform -rotate-0">
                            {slices.map((slice) => (
                                <path
                                    key={slice.id}
                                    d={slice.path}
                                    fill={slice.color}
                                    className="stroke-background"
                                    strokeWidth="0.01"
                                />
                            ))}
                            {slices.length === 0 && (
                                <circle cx="0" cy="0" r="1" className="fill-secondary" />
                            )}
                        </svg>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center z-10 border-2 border-background bg-background">
                        <Button
                            onClick={spinWheel}
                            disabled={isSpinning}
                            rounded
                            className="w-full h-full"
                        >
                            {isSpinning ? (
                                <MdRefresh className="animate-spin text-2xl" />
                            ) : (
                                TEXTS.pages.wheel.spin
                            )}
                        </Button>
                    </div>
                </div>

                <div className="mt-12 h-20 w-full max-w-xs text-center text-lg">
                    {winner ? (
                        <div className="animate-scale-in bg-transparent">
                            <p className="text-text-muted uppercase tracking-widest font-bold mb-1">
                                {TEXTS.pages.wheel.winner}
                            </p>
                            <p
                                className="font-black truncate text-2xl"
                                style={{ color: winner.color }}
                            >
                                {winner.label}
                            </p>
                        </div>
                    ) : (
                        <div className="text-text-muted">{TEXTS.pages.wheel.luck}</div>
                    )}
                </div>
            </div>
        </div>
    );
}
