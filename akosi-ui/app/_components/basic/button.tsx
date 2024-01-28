export type ButtonThemes = "light" | "dark";
export type ButtonSizes = "sm" | "md" | "lg";

export type ALVButtonParams = {
  children: any;
  theme?: ButtonThemes;
  size?: ButtonSizes;
};

export default function ALVButton({
  children,
  theme = "light",
  size = "md",
}: ALVButtonParams) {
  const themeClasses =
    theme === "light"
      ? "bg-white text-black border-black-500 hover:bg-gray-300"
      : "bg-black text-white border-black-500 hover:bg-gray-700";
  const sizeClasses =
    size === "sm"
      ? "text-sm px-2 py-1 border-sm"
      : size === "md"
      ? "text-base px-2.5 py-1 border-md"
      : "text-lg px-3 py-1 border-lg";

  return (
    <button className={`rounded-full border ${themeClasses} ${sizeClasses}`}>
      {children}
    </button>
  );
}
