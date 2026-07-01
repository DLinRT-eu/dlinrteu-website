
import { useMemo } from 'react';
import { ProductDetails } from '@/types/productDetails';
import { countTotalModels } from '@/utils/modelCounting';
import { filterProducts } from '@/utils/productFiltering';
import { 
  transformTaskData, 
  transformLocationData, 
  transformModalityData,
  transformStructureData,
  transformStructureTypeData,
  transformCertificationData
} from '@/utils/chartDataTransformation';

export const useChartData = (
  products: ProductDetails[], 
  selectedTask: string, 
  selectedLocation: string,
  selectedModality: string,
  countingMode: 'models' | 'products' = 'models'
) => {
  // Apply all filters simultaneously
  const filteredProducts = useMemo(
    () => filterProducts(products, selectedTask, selectedLocation, selectedModality),
    [products, selectedTask, selectedLocation, selectedModality]
  );

  // Transform data for charts
  const taskData = useMemo(
    () => transformTaskData(products, filteredProducts, selectedTask, countingMode),
    [products, filteredProducts, selectedTask, countingMode]
  );
  const totalModels = useMemo(
    () => countTotalModels(filteredProducts, countingMode),
    [filteredProducts, countingMode]
  );
  const locationData = useMemo(
    () => transformLocationData(products, filteredProducts, selectedLocation, countingMode),
    [products, filteredProducts, selectedLocation, countingMode]
  );
  const totalLocations = useMemo(
    () => locationData.reduce((sum, item) => sum + item.value, 0),
    [locationData]
  );
  const modalityData = useMemo(
    () => transformModalityData(products, filteredProducts, selectedModality, countingMode),
    [products, filteredProducts, selectedModality, countingMode]
  );
  const totalModalities = useMemo(
    () => modalityData.reduce((sum, item) => sum + item.value, 0),
    [modalityData]
  );
  const certificationData = useMemo(
    () => transformCertificationData(products, filteredProducts, countingMode),
    [products, filteredProducts, countingMode]
  );
  const totalCertified = useMemo(
    () => certificationData.reduce((sum, item) => sum + item.value, 0),
    [certificationData]
  );

  const structureData = useMemo(
    () => transformStructureData(filteredProducts, selectedTask),
    [filteredProducts, selectedTask]
  );

  const structureTypeData = useMemo(
    () => transformStructureTypeData(filteredProducts, selectedTask),
    [filteredProducts, selectedTask]
  );

  return {
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
  };
};
