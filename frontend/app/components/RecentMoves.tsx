import React from 'react';


interface roundMoves {
    playerMove: string;
    computerMove: string;
    result: string;
  }

interface RecentMovesProps {
    updatedLast10moves: roundMoves[];
  }

const RecentMoves: React.FC<RecentMovesProps> = ({ updatedLast10moves }) => {

    return (
        <div>
            <h1>Recent Moves</h1>
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Computer</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
      
                    {updatedLast10moves.map((round, index) => (
                        <tr key={index}>
                            <td>{round.playerMove}</td>
                            <td>{round.computerMove}</td>
                            <td>{round.result}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    );
};

export default RecentMoves;