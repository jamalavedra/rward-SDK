export default function getRabbitholeData(address?: string): Promise<{
    level: number;
    score: number;
    tasksCompleted: string[];
} | {
    level?: undefined;
    score?: undefined;
    tasksCompleted?: undefined;
}>;
