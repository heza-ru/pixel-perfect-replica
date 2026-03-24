import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import DashboardContent from "@/components/DashboardContent";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <DashboardContent />
      </div>
    </div>
  );
};

export default Index;
