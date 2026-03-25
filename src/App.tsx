import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PortalSelect from "./pages/PortalSelect.tsx";

// MSS pages
import MSSLogin from "./pages/mss/MSSLogin.tsx";
import MSSLayout from "./pages/mss/MSSLayout.tsx";
import MSSDashboard from "./pages/mss/MSSDashboard.tsx";
import EmploymentInfo from "./pages/mss/EmploymentInfo.tsx";
import Plan from "./pages/mss/Plan.tsx";
import BenefitEstimate from "./pages/mss/BenefitEstimate.tsx";
import ServicePurchase from "./pages/mss/ServicePurchase.tsx";
import MSSRefundFlow from "./pages/mss/MSSRefundFlow.tsx";
import MSSRetirementFlow from "./pages/mss/MSSRetirementFlow.tsx";
import AnnualStatement from "./pages/mss/AnnualStatement.tsx";

// eSERS pages
import ESERSLogin from "./pages/esers/ESERSLogin.tsx";
import ESERSLayout from "./pages/esers/ESERSLayout.tsx";
import ESERSDashboard from "./pages/esers/ESERSDashboard.tsx";
import Organization from "./pages/esers/Organization.tsx";
import Employees from "./pages/esers/Employees.tsx";
import Enrollment from "./pages/esers/Enrollment.tsx";
import EmploymentChange from "./pages/esers/EmploymentChange.tsx";
import Meetings from "./pages/esers/Meetings.tsx";
import PayrollHeader from "./pages/esers/PayrollHeader.tsx";
import PayrollDetails from "./pages/esers/PayrollDetails.tsx";
import PayrollRemittances from "./pages/esers/PayrollRemittances.tsx";
import AgencyStatement from "./pages/esers/AgencyStatement.tsx";
import UploadFiles from "./pages/esers/UploadFiles.tsx";
import ProcessedFiles from "./pages/esers/ProcessedFiles.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortalSelect />} />
          <Route path="/admin" element={<Index />} />

          {/* MSS Routes */}
          <Route path="/mss/login" element={<MSSLogin />} />
          <Route path="/mss" element={<MSSLayout />}>
            <Route path="dashboard" element={<MSSDashboard />} />
            <Route path="employment-info" element={<EmploymentInfo />} />
            <Route path="plan" element={<Plan />} />
            <Route path="service-purchase" element={<ServicePurchase />} />
            <Route path="benefit-estimate" element={<BenefitEstimate />} />
            <Route path="refund" element={<MSSRefundFlow />} />
            <Route path="retirement" element={<MSSRetirementFlow />} />
            <Route path="annual-statement" element={<AnnualStatement />} />
          </Route>

          {/* eSERS Routes */}
          <Route path="/esers/login" element={<ESERSLogin />} />
          <Route path="/esers" element={<ESERSLayout />}>
            <Route path="dashboard" element={<ESERSDashboard />} />
            <Route path="organization" element={<Organization />} />
            <Route path="employees" element={<Employees />} />
            <Route path="enrollment" element={<Enrollment />} />
            <Route path="employment-change" element={<EmploymentChange />} />
            <Route path="meetings" element={<Meetings />} />
            <Route path="payroll-header" element={<PayrollHeader />} />
            <Route path="payroll-details" element={<PayrollDetails />} />
            <Route path="payroll-remittances" element={<PayrollRemittances />} />
            <Route path="agency-statement" element={<AgencyStatement />} />
            <Route path="upload" element={<UploadFiles />} />
            <Route path="processed-files" element={<ProcessedFiles />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
