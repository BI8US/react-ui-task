import { MdArrowForward, MdCasino, MdGamepad, MdPieChart } from "react-icons/md";
import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";

export default function Home() {
    const { TEXTS } = useLanguage();
    return (
        <div className="max-w-6xl mx-auto animate-fade-in space-y-12 pt-6">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-main">
                    {TEXTS.pages.home.title}
                </h1>
                <p className="text-xl text-text-muted leading-relaxed">
                    {TEXTS.pages.home.subtitle}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Link
                    to="/coin"
                    className="group relative block h-80 rounded-3xl overflow-hidden bg-surface border border-border hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative h-full p-8 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <MdCasino className="text-5xl text-primary" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-text-main mb-2">
                                {TEXTS.pages.home.cards.coin.title}
                            </h3>
                            <p className="text-text-muted">{TEXTS.pages.home.cards.coin.desc}</p>
                        </div>

                        <div className="text-primary font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            Play Now <MdArrowForward />
                        </div>
                    </div>
                </Link>

                <Link
                    to="/snake"
                    className="group relative block h-80 rounded-3xl overflow-hidden bg-surface border border-border hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative h-full p-8 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <MdGamepad className="text-5xl text-primary" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-text-main mb-2">
                                {TEXTS.pages.home.cards.snake.title}
                            </h3>
                            <p className="text-text-muted">{TEXTS.pages.home.cards.snake.desc}</p>
                        </div>

                        <div className="text-primary font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            Play Now <MdArrowForward />
                        </div>
                    </div>
                </Link>

                <Link
                    to="/wheel"
                    className="group relative block h-80 rounded-3xl overflow-hidden bg-surface border border-border hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative h-full p-8 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center shadow-sm group-hover:rotate-180 transition-transform duration-700">
                            <MdPieChart className="text-5xl text-primary" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-text-main mb-2">
                                {TEXTS.pages.home.cards.wheel.title}
                            </h3>
                            <p className="text-text-muted">{TEXTS.pages.home.cards.wheel.desc}</p>
                        </div>

                        <div className="text-primary font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            Play Now <MdArrowForward />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
