import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    MdArrowBack,
    MdArrowDownward,
    MdArrowForward,
    MdArrowUpward,
    MdHome,
    MdPlayArrow,
    MdRefresh,
} from "react-icons/md";

import { Button } from "../components/Button";
import { useLanguage } from "../context/LanguageContext";

const GRID_SIZE = 15;
const SPEED = 150;

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const ControlBtn = React.memo(
    ({
        onClick,
        icon,
        disabled,
    }: {
        onClick: () => void;
        icon: React.ReactNode;
        disabled: boolean;
    }) => (
        <Button
            variant="secondary"
            className="w-14 h-14 !p-0 flex items-center justify-center pointer-events-auto rounded-2xl"
            onPointerDown={(e) => {
                e.preventDefault();
                if (!disabled) onClick();
            }}
            disabled={disabled}
        >
            <span className="text-2xl">{icon}</span>
        </Button>
    ),
);

export default function Snake() {
    const { TEXTS } = useLanguage();
    const [snake, setSnake] = useState<Point[]>([{ x: 1, y: 1 }]);
    const [food, setFood] = useState<Point>({ x: 10, y: 10 });

    const directionRef = useRef<Direction>("RIGHT");
    const nextDirectionRef = useRef<Direction>("RIGHT");

    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const [highScore, setHighScore] = useState(() => {
        return parseInt(localStorage.getItem("snake_highscore") || "0");
    });

    const gameLoopRef = useRef<number | null>(null);

    const spawnFood = useCallback(() => {
        let newFood: Point;
        let safetyCounter = 0;
        while (safetyCounter < 500) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
            const onSnake = snake.some((s) => s.x === newFood.x && s.y === newFood.y);
            if (!onSnake) {
                setFood(newFood);
                return;
            }
            safetyCounter++;
        }
    }, [snake]);

    const resetGame = () => {
        setSnake([{ x: 1, y: 1 }]);
        directionRef.current = "RIGHT";
        nextDirectionRef.current = "RIGHT";
        setScore(0);
        setIsGameOver(false);
        setIsPlaying(true);
        spawnFood();
    };

    const changeDirection = useCallback((newDir: Direction) => {
        const currentDir = directionRef.current;

        if (currentDir === "UP" && newDir === "DOWN") return;
        if (currentDir === "DOWN" && newDir === "UP") return;
        if (currentDir === "LEFT" && newDir === "RIGHT") return;
        if (currentDir === "RIGHT" && newDir === "LEFT") return;

        nextDirectionRef.current = newDir;
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
            }
            switch (e.key) {
                case "ArrowUp":
                case "w":
                case "W":
                    changeDirection("UP");
                    break;
                case "ArrowDown":
                case "s":
                case "S":
                    changeDirection("DOWN");
                    break;
                case "ArrowLeft":
                case "a":
                case "A":
                    changeDirection("LEFT");
                    break;
                case "ArrowRight":
                case "d":
                case "D":
                    changeDirection("RIGHT");
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [changeDirection]);

    useEffect(() => {
        if (!isPlaying || isGameOver) return;

        const moveSnake = () => {
            directionRef.current = nextDirectionRef.current;
            const dir = directionRef.current;

            setSnake((prevSnake) => {
                const head = prevSnake[0];
                const newHead = { ...head };

                switch (dir) {
                    case "UP":
                        newHead.y -= 1;
                        break;
                    case "DOWN":
                        newHead.y += 1;
                        break;
                    case "LEFT":
                        newHead.x -= 1;
                        break;
                    case "RIGHT":
                        newHead.x += 1;
                        break;
                }

                if (
                    newHead.x < 0 ||
                    newHead.x >= GRID_SIZE ||
                    newHead.y < 0 ||
                    newHead.y >= GRID_SIZE ||
                    prevSnake.some((s) => s.x === newHead.x && s.y === newHead.y)
                ) {
                    setIsGameOver(true);
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                if (newHead.x === food.x && newHead.y === food.y) {
                    const newScore = score + 1;
                    setScore(newScore);
                    if (newScore > highScore) {
                        setHighScore(newScore);
                        localStorage.setItem("snake_highscore", newScore.toString());
                    }
                    spawnFood();
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        };

        gameLoopRef.current = setInterval(moveSnake, SPEED);
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [food, isGameOver, isPlaying, spawnFood, score, highScore]);

    const renderGrid = () => {
        return Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnakeHead = snake[0].x === x && snake[0].y === y;
            const isSnakeBody = snake.slice(1).some((s) => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;

            let cellClass = "w-full h-full rounded-sm transition-all duration-100 ";

            if (isSnakeHead) cellClass += "bg-primary rounded-md z-10";
            else if (isSnakeBody) cellClass += "bg-primary/60";
            else if (isFood) cellClass += "bg-danger rounded-full scale-75 animate-pulse";
            else cellClass += "bg-secondary/30";

            return <div key={`${x}-${y}`} className={cellClass} />;
        });
    };

    return (
        <div className="flex flex-col items-center animate-fade-in w-full">
            <div className="flex justify-between items-center w-full max-w-[340px] mb-6">
                <h1 className="text-2xl font-bold text-text-main">{TEXTS.pages.snake.title}</h1>
                <Button to="/" variant="ghost" rounded leftIcon={<MdHome />} className="h-10 px-4">
                    {TEXTS.nav.home}
                </Button>
            </div>

            <div className="flex gap-4 w-full max-w-[340px] mb-4">
                <div className="flex-1 bg-background border border-border rounded-xl p-3 flex flex-col items-center">
                    <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">
                        {TEXTS.pages.snake.best}
                    </span>
                    <span className="text-xl font-mono font-bold text-text-main leading-none mt-1">
                        {highScore}
                    </span>
                </div>

                <div className="flex-1 bg-background border border-border rounded-xl p-3 flex flex-col items-center">
                    <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">
                        {TEXTS.pages.snake.score}
                    </span>
                    <span
                        className={`text-xl font-mono font-bold leading-none mt-1 ${isPlaying ? "text-primary" : "text-text-main"}`}
                    >
                        {score}
                    </span>
                </div>
            </div>

            <div className="relative p-3 bg-background border border-border rounded-3xl">
                <div
                    className="grid gap-0.5 bg-secondary/20 rounded-xl overflow-hidden w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]"
                    style={{
                        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    }}
                >
                    {renderGrid()}
                </div>

                {(!isPlaying || isGameOver) && (
                    <div className="absolute inset-0 bg-background/60 flex flex-col items-center justify-center rounded-3xl backdrop-blur-sm z-20 animate-fade-in">
                        {isGameOver && (
                            <div className="text-danger text-3xl font-bold mb-4 animate-scale-in">
                                {TEXTS.pages.snake.gameOver}
                            </div>
                        )}

                        <Button
                            variant="primary"
                            onClick={resetGame}
                            rounded
                            rightIcon={isGameOver ? <MdRefresh /> : <MdPlayArrow />}
                            className="px-8"
                        >
                            {isGameOver ? TEXTS.pages.snake.again : TEXTS.pages.snake.start}
                        </Button>

                        <p className="text-text-muted text-[10px] mt-6 opacity-75 uppercase tracking-wider text-center max-w-[200px]">
                            {TEXTS.pages.snake.controls}
                        </p>
                    </div>
                )}
            </div>

            <div
                className={`mt-8 grid grid-cols-3 gap-3 transition-all duration-500 ${isPlaying ? "opacity-100 translate-y-0" : "opacity-30 translate-y-4 pointer-events-none"}`}
            >
                <div />
                <ControlBtn
                    onClick={() => changeDirection("UP")}
                    icon={<MdArrowUpward />}
                    disabled={!isPlaying || isGameOver}
                />
                <div />

                <ControlBtn
                    onClick={() => changeDirection("LEFT")}
                    icon={<MdArrowBack />}
                    disabled={!isPlaying || isGameOver}
                />
                <ControlBtn
                    onClick={() => changeDirection("DOWN")}
                    icon={<MdArrowDownward />}
                    disabled={!isPlaying || isGameOver}
                />
                <ControlBtn
                    onClick={() => changeDirection("RIGHT")}
                    icon={<MdArrowForward />}
                    disabled={!isPlaying || isGameOver}
                />
            </div>
        </div>
    );
}
