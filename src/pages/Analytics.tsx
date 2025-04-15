
import { Layout } from "@/components/layout/Layout";

export default function Analytics() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">View insights and metrics for your CSR initiatives</p>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-csr-light rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-csr-primary">
            <path d="M3 3v18h18"></path>
            <path d="m19 9-5 5-4-4-3 3"></path>
          </svg>
        </div>
        <h2 className="text-xl font-medium text-gray-900 mb-2">Analytics Dashboard</h2>
        <p className="text-gray-500 text-center max-w-md mb-6">
          This page will display interactive charts and visualizations for project metrics, budget allocation, impact assessment, and regional performance.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
          <div className="border border-dashed border-gray-300 rounded p-4 flex flex-col items-center justify-center h-32">
            <div className="text-csr-primary mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v8"></path>
                <circle cx="12" cy="14" r="8"></circle>
              </svg>
            </div>
            <p className="text-sm text-gray-600">Project Impact</p>
          </div>
          <div className="border border-dashed border-gray-300 rounded p-4 flex flex-col items-center justify-center h-32">
            <div className="text-csr-primary mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 12h-6.5a2 2 0 1 0 0 4H12"></path>
                <path d="M10 8h6.5a2 2 0 1 1 0 4H14"></path>
              </svg>
            </div>
            <p className="text-sm text-gray-600">Budget Utilization</p>
          </div>
          <div className="border border-dashed border-gray-300 rounded p-4 flex flex-col items-center justify-center h-32">
            <div className="text-csr-primary mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 7 8 20l-5-5"></path>
                <path d="M21 11 8 24l-5-5"></path>
                <path d="m21 3-5.5 5.5"></path>
                <path d="M14 6.5 8 12.5l-5-5"></path>
                <path d="M14 10.5 8 16.5l-5-5"></path>
              </svg>
            </div>
            <p className="text-sm text-gray-600">Milestones</p>
          </div>
          <div className="border border-dashed border-gray-300 rounded p-4 flex flex-col items-center justify-center h-32">
            <div className="text-csr-primary mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m7.5 4.27 9 5.15"></path>
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                <path d="m3.3 7 8.7 5 8.7-5"></path>
                <path d="M12 22V12"></path>
              </svg>
            </div>
            <p className="text-sm text-gray-600">Reports Overview</p>
          </div>
          <div className="border border-dashed border-gray-300 rounded p-4 flex flex-col items-center justify-center h-32">
            <div className="text-csr-primary mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="10" x="3" y="8" rx="1"></rect>
                <path d="M7 8v10"></path>
                <path d="M17 8v10"></path>
                <path d="m3 12 4-2"></path>
                <path d="m3 16 4-2"></path>
                <path d="m21 12-4-2"></path>
                <path d="m21 16-4-2"></path>
                <path d="M7 6h10"></path>
                <path d="M9 4h6"></path>
              </svg>
            </div>
            <p className="text-sm text-gray-600">Regional Distribution</p>
          </div>
          <div className="border border-dashed border-gray-300 rounded p-4 flex flex-col items-center justify-center h-32">
            <div className="text-csr-primary mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" x2="12" y1="16" y2="12"></line>
                <line x1="12" x2="12.01" y1="8" y2="8"></line>
              </svg>
            </div>
            <p className="text-sm text-gray-600">Impact Overview</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
