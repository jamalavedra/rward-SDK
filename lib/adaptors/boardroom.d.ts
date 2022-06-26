export default function getBoardroomData(address: string): Promise<{
    totalVotes: number;
    daos: string[];
    votes: {
        dao: string;
        vote: string;
        proposalLink: string;
    }[];
}>;
