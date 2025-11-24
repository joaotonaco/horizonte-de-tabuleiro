import type { Question } from "./types";

export const QUESTIONS: Question[] = [
	{
		question: "Qual é a capital do Brasil?",
		options: ["Rio de Janeiro", "São Paulo", "Salvador"],
		correct: "Brasília",
	},
	{
		question: "Qual a maior floresta tropical do mundo?",
		options: ["Pampas", "Pantanal", "Mata Atlântica"],
		correct: "Floresta Amazônica",
	},
	{
		question: "A que temperatura a água ferve?",
		options: ["200 ºC", "-10 ºC", "180 ºC"],
		correct: "100 ºC",
	},
	{
		question: "Quantos ossos temos no nosso corpo?",
		options: ["126", "18", "300"],
		correct: "206",
	},
	{
		question: "Qual o nome popular do cloreto de sódio?",
		options: ["Vinagre", "Fermento", "Papel"],
		correct: "Sal de cozinha",
	},
	{
		question: "Qual o planeta mais próximo do Sol?",
		options: ["Netuno", "Júpiter", "Marte"],
		correct: "Mercúrio",
	},
	{
		question: "Quantos continentes existem?",
		options: ["5", "1", "3"],
		correct: "6",
	},
	{
		question: "Qual o maior planeta do sistema solar?",
		options: ["Marte", "Saturno", "Terra"],
		correct: "Júpiter",
	},
	{
		question: "Quais são as fases da Lua?",
		options: [
			"Nova, cheia e superlua",
			"Penumbral, lunar parcial, lunar total e cheia",
			"Nova, cheia, minguante e lua de sangue",
		],
		correct: "Nova, crescente, cheia e minguante",
	},
	{
		question:
			"Quanto tempo a Terra demora para dar uma volta completa em torno dela mesma?",
		options: ["365 dias", "7 dias", "30 ou 31 dias"],
		correct: "24 horas",
	},
	{
		question: "Qual é o maior animal do mundo?",
		options: ["Elefante africano", "Lula colossal", "Girafa"],
		correct: "Baleia azul",
	},
	{
		question: "Que animal põe o maior ovo?",
		options: ["Galinha", "Pavão", "Tartaruga-gigante"],
		correct: "Avestruz",
	},
	{
		question: "Qual é o maior país do mundo em território?",
		options: ["Canadá", "Estados Unidos", "China"],
		correct: "Rússia",
	},
	{
		question: "Qual o país mais populoso do mundo?",
		options: ["China", "EUA", "Brasil"],
		correct: "Índia",
	},
	{
		question: "Quem escreveu Dom Casmurro?",
		options: ["Jorge Amado", "Clarice Lispector", "José de Alencar"],
		correct: "Machado de Assis",
	},
	{
		question: "Quantos planetas existem no sistema solar?",
		options: ["7", "9", "10"],
		correct: "8",
	},
	{
		question: "Quem pintou a Mona Lisa?",
		options: ["Van Gogh", "Picasso", "Michelangelo"],
		correct: "Leonardo Da Vinci",
	},
	{
		question: "Qual é o maior animal terrestre?",
		options: ["Baleia Azul", "Girafa", "Rinoceronte"],
		correct: "Elefante Africano",
	},
	{
		question: "Em que ano o homem pisou na lua?",
		options: ["1959", "1979", "1989"],
		correct: "1969",
	},
	{
		question: "Qual a cor da mistura de Azul com Amarelo?",
		options: ["Roxo", "Laranja", "Marrom"],
		correct: "Verde",
	},
	{
		question: "Quantos estados tem o Brasil? (Contando com o Distrito Federal)",
		options: ["24", "25", "26"],
		correct: "27",
	},
	{
		question: "Qual é o símbolo químico da água?",
		options: ["Ho2", "Ah2", "O2H"],
		correct: "H2O",
	},
].map((question, i) => ({ id: i + 1, ...question }));
