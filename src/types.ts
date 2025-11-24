export type ScreenState = "home" | "game" | "score";
export type GameModeKey = "curto" | "medio" | "longo";
export type GameModes = Record<GameModeKey, GameModeConfig>;
export type PlayerColors = Record<number, string>;
export type FeedbackState = "correct" | "wrong" | null;

export interface Question {
	id: number,
	question: string;
	options: string[];
	correct: string;
}

export interface Player {
	id: number;
	name: string;
	score: number;
}

export interface GameModeConfig {
	label: string;
	rounds: number;
}
