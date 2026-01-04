import RecordCategoryTabs from "./RecordCategoryTabs";

export default function RecordLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <RecordCategoryTabs />
            {children}
        </div>
    );
}
