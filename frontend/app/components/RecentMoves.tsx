import React from 'react';

const RecentMoves = () => {
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
                    <tr>
                        <td>Rock</td>
                        <td>Scissors</td>
                        <td>Player wins</td>
                    </tr>
                    <tr>
                        <td>Rock</td>
                        <td>Scissors</td>
                        <td>Player wins</td>
                    </tr>
                    <tr>
                        <td>Rock</td>
                        <td>Scissors</td>
                        <td>Player wins</td>
                    </tr>
                    <tr>
                        <td>Rock</td>
                        <td>Scissors</td>
                        <td>Player wins</td>
                    </tr>
                    <tr>
                        <td>Rock</td>
                        <td>Scissors</td>
                        <td>Player wins</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RecentMoves;