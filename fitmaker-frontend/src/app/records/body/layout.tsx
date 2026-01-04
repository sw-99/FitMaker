import BodySubTabs from "./BodySubTabs";

export default function BodyLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <BodySubTabs />
            <div className="max-w-5xl mx-auto px-4 py-6">
                {children}
            </div>
        </div>
    );
}
