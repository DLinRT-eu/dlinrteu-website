import React, { useEffect } from 'react';
import dataService from '@/services/DataService';
import { useChartData } from '@/hooks/useChartData';
import { useCompanyData } from '@/hooks/useCompanyData';
import { LOCATION_COLORS } from '@/utils/chartColors';
import { captureAllDashboardCharts } from '@/utils/chartImageCapture';

// Import all chart components
import TaskDistributionChart from '@/components/dashboard/TaskDistributionChart';
import LocationDistributionChart from '@/components/dashboard/LocationDistributionChart';
import ModalityDistributionChart from '@/components/dashboard/ModalityDistributionChart';
import CompanyDistributionChart from '@/components/dashboard/CompanyDistributionChart';
import CertificationDistributionChart from '@/components/dashboard/CertificationDistributionChart';
import EvidenceImpactScatterChart from '@/components/dashboard/EvidenceImpactScatterChart';
import StructuresChart from '@/components/dashboard/StructuresChart';
import StructureTypeDistributionChart from '@/components/dashboard/StructureTypeDistributionChart';

interface OffscreenChartRendererProps {
  onReady: (chartImages: Record<string, string>) => void;
}

const OffscreenChartRenderer: React.FC<OffscreenChartRendererProps> = ({ onReady }) => {
  const products = dataService.getAllProducts();
  const locationColors = Object.values(LOCATION_COLORS);
  
  const {
    taskData,
    totalModels,
    locationData,
    totalLocations,
    modalityData,
    totalModalities,
    certificationData,
    totalCertified,
    structureData,
    structureTypeData,
    filteredProducts
  } = useChartData(products, 'all', 'all', 'all', 'products');

  const { companyData, totalCompanies } = useCompanyData(undefined, filteredProducts);

  useEffect(() => {
    // Wait for Recharts to finish rendering SVGs
    const timer = setTimeout(async () => {
      try {
        const images = await captureAllDashboardCharts();
        onReady(images);
      } catch (e) {
        console.warn('Offscreen chart capture failed:', e);
        onReady({});
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onReady]);

  const noop = () => {};

  return (
    <div
      style={{
        position: 'fixed',
        left: '-9999px',
        top: 0,
        width: '1200px',
        height: 'auto',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -1,
      }}
      aria-hidden="true"
    >
      <TaskDistributionChart
        taskData={taskData}
        totalModels={totalModels}
        countingMode="products"
        selectedTask="all"
        selectedLocation="all"
        selectedModality="all"
        onTaskClick={noop}
      />
      <LocationDistributionChart
        locationData={locationData}
        totalLocations={totalLocations}
        countingMode="products"
        selectedLocation="all"
        selectedTask="all"
        selectedModality="all"
        onLocationClick={noop}
        colors={locationColors}
      />
      <ModalityDistributionChart
        modalityData={modalityData}
        totalModalities={totalModalities}
        countingMode="products"
        selectedModality="all"
        selectedTask="all"
        selectedLocation="all"
        onModalityClick={noop}
      />
      <CompanyDistributionChart
        companyData={companyData}
        totalCompanies={totalCompanies}
        countingMode="products"
        selectedTask="all"
        selectedLocation="all"
        selectedModality="all"
      />
      <CertificationDistributionChart
        certificationData={certificationData}
        totalCertified={totalCertified}
        countingMode="products"
        selectedTask="all"
        selectedLocation="all"
        selectedModality="all"
      />
      <EvidenceImpactScatterChart
        filteredProducts={filteredProducts}
      />
      {structureData.length > 0 && (
        <StructuresChart structureData={structureData} />
      )}
      {structureTypeData.length > 0 && (
        <StructureTypeDistributionChart structureTypeData={structureTypeData} />
      )}
    </div>
  );
};

export default OffscreenChartRenderer;
