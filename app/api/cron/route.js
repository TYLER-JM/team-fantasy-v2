import { NextResponse } from 'next/server';
import https from 'https'
import prisma from '@/lib/prismaClient';

export function GET() {
  
  let startTime = new Date()
  let endTime;
  let timeElapsed;
  let today = new Date()
  today.setDate(today.getDate()-1) // (-1) = yesterday
  let dateString = today.toLocaleDateString() // "3/23/2023" -- this format also works with the API

  const API_URL = `https://statsapi.web.nhl.com/api/v1/schedule?date=${dateString}&expand=schedule.linescore`


  /////// MAKE THE CALL
  https.get(API_URL, res => {
    console.log('making the call')
    let data = [];
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Date in Response header:', headerDate);
  
    res.on('data', chunk => {
      data.push(chunk);
    });
  
    res.on('end', () => {
      console.log('Response ended: ');
      const response = JSON.parse(Buffer.concat(data).toString());
      for(let game of response.dates[0].games) {
        prisma.event.update({
          where: {id: game.gamePk},
          data: {
            homeTeamScore: game.teams.home.score,
            awayTeamScore: game.teams.away.score,
            overtime: game.linescore.currentPeriod  > 3,
            eventStateId: 3 // completed
          }
        }).then(result => {
  
          let winningTeamId = result.awayTeamScore > result.homeTeamScore ? result.awayTeamId : result.homeTeamId 
          prisma.prediction.findMany({
            where: {eventId: result.id}
          }).then(predictions => {
  
            predictions.forEach(pred => {
              prisma.prediction.update({
                where: {id: pred.id},
                data: {winOutcome: pred.teamId == winningTeamId} 
              }).catch(error => {
                endTime = new Date()
                timeElapsed = Math.round((endTime - startTime) / 1000)
                return NextResponse.json({prisma: true, message: 'could not update prediction', error: error, elapsed: `It took ${timeElapsed} seconds`}, {status: 500})
              })
            })
  
          }).catch(error => {
            endTime = new Date()
            timeElapsed = Math.round((endTime - startTime) / 1000)
            return NextResponse.json({prisma: true, message: 'could not find prediction', error: error, elapsed: `It took ${timeElapsed} seconds`}, {status: 500})
          })
          // can't return here, because we are in a loop
          console.log(`updated Game ${result.id}: (${result.awayTeamId}) ${result.awayTeamScore} -- ${result.homeTeamScore} (${result.homeTeamId})`)
        }).catch(error => {
          endTime = new Date()
          timeElapsed = Math.round((endTime - startTime) / 1000)
          return NextResponse.json({prisma: true, message: 'error updating event', error: error, elapsed: `It took ${timeElapsed} seconds`}, {status: 500})
        })
      }
    });
  }).on('error', err => {
    endTime = new Date()
    timeElapsed = Math.round((endTime - startTime) / 1000)
    return NextResponse.json({prisma: false, error: err.message, elapsed: `It took ${timeElapsed} seconds`}, {status: 500})
    
  });
  /////// END OF CALL

}