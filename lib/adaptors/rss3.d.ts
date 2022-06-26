import { Dictionary } from '../types';
export default function getRss3Data(address: string): Promise<{
    profile: Dictionary<string>;
    backlinks: Dictionary<string>[];
    accounts: Dictionary<string>[];
    links: Dictionary<string>[];
}>;
