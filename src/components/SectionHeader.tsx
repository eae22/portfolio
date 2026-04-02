type SectionHeaderProps = {
  title: string;
  accent?: "profile" | "contact" | "skills" | "experience";
};

const accentClassMap = {
  profile:
    "bg-linear-to-b from-cyan-100 via-sky-200 to-sky-300 shadow-[0_0_14px_rgba(125,211,252,0.16)]",
  contact:
    "bg-linear-to-b from-cyan-100 via-sky-200 to-sky-300 shadow-[0_0_14px_rgba(125,211,252,0.16)]",
  skills:
    "bg-linear-to-b from-sky-100 via-sky-200 to-blue-300 shadow-[0_0_14px_rgba(96,165,250,0.18)]",
  experience:
    "bg-linear-to-b from-violet-100 via-fuchsia-200 to-purple-300 shadow-[0_0_14px_rgba(192,132,252,0.18)]",
} satisfies Record<NonNullable<SectionHeaderProps["accent"]>, string>;

export default function SectionHeader({
  title,
  accent = "profile",
}: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div className={`h-8 w-1 rounded-full ${accentClassMap[accent]}`} />
      <h2 className="text-base font-bold tracking-wide text-text-primary">
        {title}
      </h2>
    </div>
  );
}
