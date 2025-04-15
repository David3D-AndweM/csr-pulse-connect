
import { Layout } from "@/components/layout/Layout";
import { mockRegions } from "@/data/mockData";

export default function Locations() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Locations</h1>
        <p className="text-gray-600 mt-1">Manage and explore project locations</p>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="p-6 flex flex-col items-center justify-center">
          <div className="bg-csr-light text-csr-primary p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 9 5 12 1.8-5.2L21 14Z"></path>
              <path d="M7.2 2.2 8 5.1"></path>
              <path d="m5.1 8-2.9-.7"></path>
              <path d="M14 4.1 12 2"></path>
              <path d="m5.3 13.8-2.1 1.8"></path>
              <path d="m9.9 5.3-1.4-4.2"></path>
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">Interactive Map</h2>
          <p className="text-gray-500 text-center max-w-md mb-6">
            This section will feature an interactive map showing all project locations with filters for region, project type, and status.
          </p>
          <div className="border border-dashed border-gray-300 w-full max-w-3xl h-96 rounded-lg flex items-center justify-center">
            <div className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                <path d="M2 12h20"></path>
              </svg>
              <p>Interactive Map Will Appear Here</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockRegions.map((region) => (
          <div key={region.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-900">{region.name}</h3>
              <span className="bg-csr-light text-csr-primary text-xs font-medium px-2 py-1 rounded">
                {region.projectCount} Projects
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {region.country}
            </p>
            <div className="flex justify-end">
              <button className="text-sm text-csr-primary hover:underline">View Projects</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
