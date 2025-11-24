import { Award, HelpCircle, Play, RotateCcw, X } from "lucide-react";
import { useState } from "react";
import { PuffyButton } from "./components/puffy-button";
import { QUESTIONS } from "./questions";
import type {
	FeedbackState,
	GameModeKey,
	GameModes,
	Player,
	PlayerColors,
	Question,
	ScreenState,
} from "./types";
import { shuffleArray } from "./utils";

const GAME_MODES: GameModes = {
	curto: { label: "Curto", rounds: 3 },
	medio: { label: "Médio", rounds: 5 },
	longo: { label: "Longo", rounds: 10 },
};

const PLAYER_COLORS: PlayerColors = {
	0: "bg-purple-500 ring-purple-400",
	1: "bg-green-500 ring-green-400",
	2: "bg-yellow-500 ring-yellow-400",
	3: "bg-red-500 ring-red-400",
	4: "bg-blue-500 ring-blue-400",
	5: "bg-pink-500 ring-pink-400",
	6: "bg-orange-500 ring-orange-400",
	7: "bg-teal-500 ring-teal-400",
	8: "bg-amber-500 ring-amber-400",
	9: "bg-violet-500 ring-violet-400",
};

const App = () => {
	const [screen, setScreen] = useState<ScreenState>("home");
	const [showModal, setShowModal] = useState(false);

	const [playerCount, setPlayerCount] = useState(2);
	const [gameMode, setGameMode] = useState<GameModeKey>("curto");

	const [players, setPlayers] = useState<Player[]>([]);
	const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
	const [currentRound, setCurrentRound] = useState(1);
	const [totalRounds, setTotalRounds] = useState(3);
	const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
	const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
	const [feedback, setFeedback] = useState<FeedbackState>(null);
	const [pendingNames, setPendingNames] = useState<string[]>([]);

	const startGame = () => {
		const defaults = Array.from(
			{ length: playerCount },
			(_, i) => `Jogador ${i + 1}`,
		);
		setPendingNames(defaults);
		setScreen("setup");
	};

	const beginGameFromSetup = () => {
		const names = Array.from({ length: playerCount }, (_, i) => {
			const n = pendingNames[i];
			return (n && n.trim()) || `Jogador ${i + 1}`;
		});
		const newPlayers = names.map((name, i) => ({ id: i, name, score: 0 }));
		setPlayers(newPlayers);
		setTotalRounds(GAME_MODES[gameMode].rounds * playerCount);
		setCurrentRound(0);
		setCurrentPlayerIdx(0);
		nextQuestion([]);
		setScreen("game");
	};

	const nextQuestion = (answeredQuestions: number[]) => {
		const questions = QUESTIONS.filter(
			(q) => !answeredQuestions.includes(q.id),
		);
		const nextQuestion =
			questions[Math.floor(Math.random() * questions.length)];

		setCurrentQuestion({
			...nextQuestion,
			options: shuffleArray([...nextQuestion.options, nextQuestion.correct]),
		});
		setFeedback(null);
	};

	const handleAnswer = (option: string) => {
		if (!currentQuestion) return;
		const isCorrect = option === currentQuestion.correct;

		let answered = [...answeredQuestions, currentQuestion.id];
		if (answered.length >= QUESTIONS.length) {
			answered = answered.slice(Math.floor(answered.length / 2));
		}

		setFeedback(isCorrect ? "correct" : "wrong");
		setAnsweredQuestions(answered);

		// Aguarda um pouco para mostrar o feedback visual antes de trocar
		setTimeout(() => {
			if (isCorrect) {
				const updatedPlayers = [...players];
				updatedPlayers[currentPlayerIdx].score += 10;
				setPlayers(updatedPlayers);
			}

			const nextTurn = currentRound + 1;

			if (nextTurn >= totalRounds) {
				setScreen("score");
			} else {
				setCurrentRound(nextTurn);
				setCurrentPlayerIdx((prev) => (prev + 1) % playerCount);
				nextQuestion(answered);
			}
		}, 1000);
	};

	const resetGame = () => {
		setScreen("home");
		setPlayers([]);
	};

	const renderHome = () => (
		<div className="relative w-full h-full flex flex-col items-center justify-center p-6 overflow-hidden">
			{/* Fundo de 4 Quadrantes com Textura e Ícones */}
			<div className="absolute top-0 left-0 w-full h-full z-0">
				<div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#FCD34D] overflow-hidden" />
				<div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#3B82F6] overflow-hidden" />
				<div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#22C55E] overflow-hidden" />
				<div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#EF4444] overflow-hidden" />
			</div>

			{/* Conteúdo */}
			<div className="z-10 w-full max-w-md flex flex-col items-center gap-6">
				<h1 className="text-6xl md:text-7xl font-black font-playful text-center leading-none tracking-wide drop-shadow-xl mb-6">
					<span className="text-[#ff5c5c] puffy-text-red block">Horizonte</span>
					<p className="text-white puffy-text text-4xl md:text-5xl my-2">de</p>
					<span className="text-[#3B82F6] puffy-text-blue inline-block">
						Ta
					</span>
					<span className="text-[#22C55E] puffy-text-green inline-block">
						bu
					</span>
					<span className="text-[#FCD34D] puffy-text-yellow inline-block">
						leiro
					</span>
				</h1>

				{/* Painel de Configuração */}
				<div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl w-full space-y-4">
					<div>
						<label className="block text-gray-800 font-bold mb-1">
							Jogadores:
						</label>
						<select
							value={playerCount}
							onChange={(e) => setPlayerCount(Number(e.target.value))}
							className="w-full p-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 outline-none font-bold"
						>
							{[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
								<option key={n} value={n}>
									{n} Jogadores
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-gray-800 font-bold mb-1">
							Duração:
						</label>
						<div className="flex gap-2">
							{Object.entries(GAME_MODES).map(([key, val]) => (
								<label
									key={key}
									className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border-2 font-bold cursor-pointer ${gameMode === key ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
								>
									<input
										type="radio"
										name="game-mode"
										value={key}
										checked={gameMode === (key as GameModeKey)}
										onChange={(e) => setGameMode(e.target.value as GameModeKey)}
										className="sr-only"
									/>
									{val.label}
								</label>
							))}
						</div>
					</div>
				</div>

				<div className="w-full max-w-xs flex flex-col gap-4 mt-8">
					<PuffyButton onClick={startGame} color="blue">
						<Play size={32} fill="white" /> Jogar
					</PuffyButton>

					<PuffyButton onClick={() => setShowModal(true)} color="cyan">
						<HelpCircle size={28} /> Como jogar
					</PuffyButton>
				</div>
			</div>
		</div>
	);

	const renderGame = () => (
		<div className="w-full h-full bg-gray-100">
			<div className="max-w-md mx-auto flex flex-col p-4 pt-12">
				{/* Cabeçalho */}
				<div className="text-sm font-bold text-gray-500 mb-6">
					Turno: {currentRound + 1} / {totalRounds}
				</div>

				{/* Jogador */}
				<div
					className={`px-4 py-4 text-2xl rounded-2xl leading-none font-bold flex flex-col items-center mb-6 text-white ${PLAYER_COLORS[currentPlayerIdx]}`}
				>
					<span className="opacity-80 text-base leading-tighter font-semibold">
						Agora é a vez de:{" "}
					</span>
					{players[currentPlayerIdx].name}
				</div>

				{/* Pergunta */}
				<div className="bg-white p-8 rounded-3xl shadow-lg border-b-4 border-gray-200 mb-8 min-h-[200px] flex items-center justify-center text-center">
					<h2 className="text-2xl font-bold text-gray-800">
						{currentQuestion?.question}
					</h2>
				</div>

				{/* Opções */}
				<div className="grid grid-cols-1 gap-4">
					{currentQuestion?.options.map((opt, idx) => {
						let btnClass = `bg-white! ring-2 ${PLAYER_COLORS[currentPlayerIdx]} text-gray-800 hover:bg-zinc-100!`;
						if (feedback) {
							if (opt === currentQuestion.correct)
								btnClass = `bg-green-500 text-white border-green-600 ${feedback === "wrong" ? "opacity-50" : ""}`;
							else if (feedback === "wrong")
								btnClass = "bg-red-100 text-red-500 border-red-200 opacity-50";
							else btnClass = "bg-gray-100 text-gray-400 border-gray-200"; // Opções não selecionadas
						}
						return (
							<button
								key={idx}
								disabled={!!feedback}
								onClick={() => handleAnswer(opt)}
								className={`p-4 rounded-xl text-lg font-bold transition-all shadow-sm active:scale-95 ${btnClass}`}
							>
								{opt}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);

	const renderScore = () => {
		const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

		return (
			<div className="w-full h-full bg-blue-600 flex flex-col items-center justify-center p-6 text-white">
				<Award size={64} className="mb-4 text-yellow-400" />
				<h2 className="text-4xl font-black mb-8 text-center">Placar Final</h2>

				<div className="w-full max-w-md bg-white rounded-2xl overflow-hidden text-gray-800 shadow-2xl mb-8">
					{sortedPlayers.map((p, idx) => (
						<div
							key={idx}
							className={`flex justify-between p-4 border-b last:border-0 ${idx === 0 ? "bg-yellow-100" : ""}`}
						>
							<div className="flex items-center gap-3">
								<span
									className={`w-8 h-8 rounded-full ring-4 flex items-center justify-center text-white font-bold ${PLAYER_COLORS[idx]}`}
								>
									{idx + 1}
								</span>
								<span className="font-semibold text-lg">{p.name}</span>
							</div>
							<span className="font-bold text-xl">{p.score} pts</span>
						</div>
					))}
				</div>

				<button
					onClick={resetGame}
					className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 flex items-center gap-2"
				>
					<RotateCcw size={20} /> Jogar Novamente
				</button>
			</div>
		);
	};

	const renderSetup = () => (
		<div className="w-full h-full bg-gray-100">
			<div className="max-w-md mx-auto flex flex-col p-4 pt-12 gap-6">
				<h2 className="text-3xl font-black text-gray-800 text-center">
					Nomes dos Jogadores
				</h2>
				<div className="bg-white p-6 rounded-3xl shadow-lg border-b-4 border-gray-200 space-y-4">
					{Array.from({ length: playerCount }, (_, i) => (
						<div key={i} className="flex items-center gap-3">
							<span
								className={`w-8 h-8 rounded-full ring-4 flex items-center justify-center text-white font-bold ${PLAYER_COLORS[i]}`}
							>
								{i + 1}
							</span>
							<input
								type="text"
								value={pendingNames[i] ?? `Jogador ${i + 1}`}
								onChange={(e) => {
									setPendingNames((prev) => {
										const arr = [...prev];
										arr[i] = e.target.value;
										return arr;
									});
								}}
								className="flex-1 p-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 outline-none font-bold"
								placeholder={`Jogador ${i + 1}`}
							/>
						</div>
					))}
				</div>
				<div className="flex gap-3">
					<PuffyButton
						onClick={() => setScreen("home")}
						color="white"
						size="sm"
						className="w-full"
					>
						Voltar
					</PuffyButton>
					<PuffyButton
						onClick={beginGameFromSetup}
						size="sm"
						className="w-full"
					>
						Continuar
					</PuffyButton>
				</div>
			</div>
		</div>
	);

	const renderModal = () => {
		if (!showModal) return null;
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
				<div className="bg-white rounded-3xl max-w-sm w-full p-6 relative shadow-2xl animate-in fade-in zoom-in duration-300">
					<button
						onClick={() => setShowModal(false)}
						className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
					>
						<X size={24} />
					</button>

					<h3 className="text-2xl font-black text-blue-600 mb-4 flex items-center gap-2">
						<HelpCircle /> Como Jogar
					</h3>

					<div className="space-y-3 text-gray-600 text-sm leading-relaxed">
						<p>
							1. <strong>Reúna a galera:</strong> Junte de 2 a 10 amigos ao
							redor deste dispositivo.
						</p>
						<p>
							2. <strong>O Turno:</strong> O jogo avisará de quem é a vez. Passe
							o celular para essa pessoa.
						</p>
						<p>
							3. <strong>Responda:</strong> Leia a pergunta e escolha uma das 4
							opções.
						</p>
						<p>
							4. <strong>Pontue:</strong> Acertou? Ganha 10 pontos!
						</p>
						<p>
							5. <strong>Vencedor:</strong> Ao final das rodadas, quem tiver
							mais pontos ganha a coroa!
						</p>
					</div>

					<button
						onClick={() => setShowModal(false)}
						className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl mt-6 hover:bg-blue-700"
					>
						Entendi!
					</button>
				</div>
			</div>
		);
	};

	return (
		<div className="w-screen h-svh flex items-center justify-center font-sans">
			{screen === "home" && renderHome()}
			{screen === "setup" && renderSetup()}
			{screen === "game" && renderGame()}
			{screen === "score" && renderScore()}
			{renderModal()}
		</div>
	);
};

export default App;
