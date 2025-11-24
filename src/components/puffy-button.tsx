import { tv, type VariantProps } from "tailwind-variants";

const puffyButtonVariants = tv({
	base: "flex gap-2 justify-center items-center text-shadow-sm font-bold touch-manipulation will-change-transform border rounded-full text-white shadow-[inset_0_0_2px_1px_rgba(255,255,255,0.2),0_1px_4px_1px_rgba(0,0,0,0.1)] transition-all duration-200 ease-[cubic-bezier(0.55,1,0.15,1)] cursor-pointer focus:outline-none hover:scale-[1.02] active:scale-[0.96]",
	variants: {
		color: {
			indigo:
				"border-indigo-600 [background-color:var(--color-indigo-500)] bg-[radial-gradient(75%_25%_at_50%_5%,rgba(255,255,255,0.2),transparent)] hover:border-indigo-500 focus:border-indigo-500 active:border-indigo-600 active:bg-[radial-gradient(75%_25%_at_50%_95%,rgba(255,255,255,0.2),transparent)]",
			yellow:
				"border-yellow-600 [background-color:var(--color-yellow-400)] bg-[radial-gradient(75%_25%_at_50%_5%,rgba(255,255,255,0.5),transparent)] hover:border-yellow-500 focus:border-yellow-500 active:border-yellow-600 active:bg-[radial-gradient(75%_25%_at_50%_95%,rgba(255,255,255,0.5),transparent)]",
			blue: "border-blue-500 [background-color:var(--color-blue-500)] bg-[radial-gradient(75%_25%_at_50%_5%,rgba(255,255,255,0.2),transparent)] hover:border-blue-500 focus:border-blue-500 active:border-blue-600 active:bg-[radial-gradient(75%_25%_at_50%_95%,rgba(255,255,255,0.2),transparent)]",
			cyan: "border-cyan-500 [background-color:var(--color-cyan-500)] bg-[radial-gradient(75%_25%_at_50%_5%,rgba(255,255,255,0.2),transparent)] hover:border-cyan-500 focus:border-cyan-500 active:border-cyan-600 active:bg-[radial-gradient(75%_25%_at_50%_95%,rgba(255,255,255,0.2),transparent)]",
			white:
				"text-zinc-700 border-white-500 [background-color:var(--color-white-500)] bg-[radial-gradient(75%_25%_at_50%_5%,rgba(255,255,255,0.2),transparent)] hover:border-white-500 focus:border-white-500 active:border-white-600 active:bg-[radial-gradient(75%_25%_at_50%_95%,rgba(255,255,255,0.2),transparent)]",
		},
		size: {
			sm: "text-lg p-3",
			default: "text-2xl p-4",
		},
	},
	defaultVariants: {
		color: "indigo",
		size: "default",
	},
});

type PuffyButtonProps = VariantProps<typeof puffyButtonVariants> &
	React.ComponentProps<"button">;

export function PuffyButton({
	color,
	size,
	className,
	...props
}: PuffyButtonProps) {
	return (
		<button
			className={puffyButtonVariants({ color, size, className })}
			{...props}
		/>
	);
}
