/*
 * File: CountParliamentaryVotes.js
 * --------------------------------
 * This program generates a report showing the popular vote totals and
 * the number of constituencies won in a UK parliamentary election.
 * This file defines only a new entry point to ensure that the labels are
 * correct; the code for the other methods is shared with CountVotes.js.
 */

"use strict";

/*
 * Counts the nationwide popular vote and the number of constituencies
 * won by the various parties in a UK parliamentary election.  The vote
 * tallies are stored in the data parameter, which must be loaded as a
 * script by the index.html file.
 */

function CountParliamentaryVotes(data) {
   console.log("Popular vote:");
   reportVoteTotals(countPopularVotes(data));
   console.log("Constituencies won:");
   reportVoteTotals(countElectoralVotes(data));
}
