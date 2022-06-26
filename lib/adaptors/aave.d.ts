import { ComputeConfig } from '../types';
export default function getAaveData(address: string, computeConfig: ComputeConfig): Promise<{
    totalHf: number;
    mainMarket: {
        totalCollateralETH: string;
        totalDebtETH: string;
        availableBorrowsETH: string;
        currentLiquidationThreshold: string;
        ltv: string;
        healthFactor: number;
    } | {
        healthFactor: boolean;
        totalCollateralETH?: undefined;
        totalDebtETH?: undefined;
        availableBorrowsETH?: undefined;
        currentLiquidationThreshold?: undefined;
        ltv?: undefined;
    } | {
        totalCollateralETH: number;
        totalDebtETH: number;
        availableBorrowsETH: number;
        currentLiquidationThreshold: number;
        ltv: number;
        healthFactor: number;
    };
    ammMarket: {
        totalCollateralETH: string;
        totalDebtETH: string;
        availableBorrowsETH: string;
        currentLiquidationThreshold: string;
        ltv: string;
        healthFactor: number;
    } | {
        healthFactor: boolean;
        totalCollateralETH?: undefined;
        totalDebtETH?: undefined;
        availableBorrowsETH?: undefined;
        currentLiquidationThreshold?: undefined;
        ltv?: undefined;
    } | {
        totalCollateralETH: number;
        totalDebtETH: number;
        availableBorrowsETH: number;
        currentLiquidationThreshold: number;
        ltv: number;
        healthFactor: number;
    };
    polygonMarket: {
        totalCollateralETH: string;
        totalDebtETH: string;
        availableBorrowsETH: string;
        currentLiquidationThreshold: string;
        ltv: string;
        healthFactor: number;
    } | {
        healthFactor: boolean;
        totalCollateralETH?: undefined;
        totalDebtETH?: undefined;
        availableBorrowsETH?: undefined;
        currentLiquidationThreshold?: undefined;
        ltv?: undefined;
    } | {
        totalCollateralETH: number;
        totalDebtETH: number;
        availableBorrowsETH: number;
        currentLiquidationThreshold: number;
        ltv: number;
        healthFactor: number;
    };
    avalancheMarket: {
        totalCollateralETH: string;
        totalDebtETH: string;
        availableBorrowsETH: string;
        currentLiquidationThreshold: string;
        ltv: string;
        healthFactor: number;
    } | {
        healthFactor: boolean;
        totalCollateralETH?: undefined;
        totalDebtETH?: undefined;
        availableBorrowsETH?: undefined;
        currentLiquidationThreshold?: undefined;
        ltv?: undefined;
    } | {
        totalCollateralETH: number;
        totalDebtETH: number;
        availableBorrowsETH: number;
        currentLiquidationThreshold: number;
        ltv: number;
        healthFactor: number;
    };
}>;
