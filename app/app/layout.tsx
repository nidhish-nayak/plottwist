import { Sidebar } from "@/components/Sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full flex justify-start items-start min-h-[84vh]">
            <Sidebar />
            {children}
        </div>
    );
};

export default AppLayout;