/*
 * File: CountVotes.js
 * -------------------
 * This program generates a report showing the popular and electoral vote
 * totals for a presidential election in the United States.
 */

"use strict";

/*
 * This program counts the popular and electoral votes from the structure
 * stored in the data parameter, which is supplied by the index.html file.
 */

function CountVotes(data) {
   console.log("Popular vote:");
   reportVoteTotals(countPopularVotes(data));
   console.log("Electoral vote:");
   reportVoteTotals(countElectoralVotes(data));
}

/*
 * Returns a map in which the keys are the parties and the values
 * are the corresponding popular vote totals.
 */

function countPopularVotes(electionData) {
   let popularVotes = { };
   for (let i = 0; i < electionData.length; i++) {
      let stateData = electionData[i];
      for (let party in stateData.popularVote) {
         if (popularVotes[party] === undefined) popularVotes[party] = 0;
         popularVotes[party] += stateData.popularVote[party];
      }
   }
   return popularVotes;
}

/*
 * Returns a map in which the keys are the parties and the values
 * are the corresponding electoral vote totals.
 */

function countElectoralVotes(electionData) {
   let electoralVotes = { };
   for (let i = 0; i < electionData.length; i++) {
      let stateData = electionData[i];
      let party = determineWinner(stateData.popularVote);
      if (electoralVotes[party] === undefined) electoralVotes[party] = 0;
      electoralVotes[party] += stateData.electoralVotes
   }
   return electoralVotes;
}

/*
 * Generates a report showing the vote totals for each party contained
 * in votes, which is a record in which the keys are parties and the
 * values are the vote counts. The report is sorted in decreasing order
 * by vote count.
 */

function reportVoteTotals(votes) {
   let array = [ ];
   for (let party in votes) {
      array.push({ party: party, votes: votes[party] });
   }
   array.sort(sortByDecreasingVoteCount);
   for (let i = 0; i < array.length; i++) {
      let entry = array[i];
      console.log("  " + entry.party + ": " + entry.votes);
   }

/*
 * Implementation notes:
 * ---------------------
 * This function implements the desired sort order for the displayed data.
 * The parameters are objects with two properties: "party" and "votes".
 * As with any comparison function, the return value is negative if e1 comes
 * before e2, positive if e1 comes after e2, and zero if the two entries are
 * the same.  This function ordinarily compares the vote counts but includes
 * a special check to ensure that a party named "Other" comes at the end.
 */

   function sortByDecreasingVoteCount(e1, e2) {
      if (e1.party === "Other" && e2.party !== "Other") return 1;
      if (e1.party !== "Other" && e2.party === "Other") return -1;
      return e2.votes - e1.votes;
   }

}

/*
 * Determines which party has the largest total in votes.  The argument is
 * a record in which the keys are parties and the values are vote counts.
 */

function determineWinner(votes) {
   let winner = undefined;
   let maxVotes = 0;
   for (let party in votes) {
      if (winner === undefined || votes[party] > maxVotes) {
         winner = party;
         maxVotes = votes[party];
      }
   }
   return winner;
}
