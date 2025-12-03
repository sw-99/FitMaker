interface SectionProps {
    title: string;
    children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
    return (
        <div className="space-y-3">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="space-y-3">{children}</div>
        </div>
    );
}
