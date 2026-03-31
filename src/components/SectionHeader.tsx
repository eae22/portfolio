type SectionHeaderProps = {
  title: string;
};

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div className="h-8 w-1 rounded-full bg-text-primary" />
      <h2 className="text-base font-bold tracking-wide text-text-primary">
        {title}
      </h2>
    </div>
  );
}
