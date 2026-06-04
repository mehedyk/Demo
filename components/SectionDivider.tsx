"use client";

interface SectionDividerProps {
  type?: "wave" | "diagonal" | "curve";
  inverted?: boolean;
  fill?: string;
  bg?: string;
}

export default function SectionDivider({
  type = "wave",
  inverted = false,
  fill = "var(--bg-secondary)",
  bg = "var(--bg-primary)",
}: SectionDividerProps) {
  return (
    <div
      className="w-full overflow-hidden leading-[0] relative z-10 select-none pointer-events-none"
      style={{ backgroundColor: bg }}
    >
      {type === "wave" ? (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[28px] md:h-[42px]"
          style={{ transform: inverted ? "rotate(180deg)" : "none" }}
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,55.05,16.22,83.1,22.07,135.6,33,190.43,39.8,245.83,39.8,271.74,39.8,296.6,37.83,321.39,56.44Z"
            style={{ fill: fill }}
          />
        </svg>
      ) : type === "diagonal" ? (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[24px] md:h-[36px]"
          style={{ transform: inverted ? "rotateY(180deg) rotateX(180deg)" : "none" }}
        >
          <path
            d="M1200,0L0,120H1200Z"
            style={{ fill: fill }}
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[24px] md:h-[36px]"
          style={{ transform: inverted ? "rotateX(180deg)" : "none" }}
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,741.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86C296.6,37.83,271.74,39.8,245.83,39.8c-55.4,0-110.23-6.8-162.73-17.73C55.05,16.22,26.9,8.75,0,0V120H1200V92.83Z"
            style={{ fill: fill }}
          />
        </svg>
      )}
    </div>
  );
}
