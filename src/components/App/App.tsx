import css from './app.module.css';
import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOption/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';
import { type Votes, type VoteType } from '../../types/votes';
import { useState } from 'react';

export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  function handleVote(type: VoteType) {
    setVotes({ ...votes, [type]: votes[type] + 1 });
  }

  function resetVotes() {
    const reset = Object.keys(votes).reduce((acc, key) => {
      acc[key as VoteType] = 0;
      return acc;
    }, {} as Votes);

    setVotes(reset);
  }
  const totalVotes = votes.good + votes.neutral + votes.bad;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={(totalVotes > 0) as boolean}
      />
      {totalVotes === 0 ? (
        <Notification />
      ) : (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={
            totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0
          }
        />
      )}
    </div>
  );
}
