import PredictionsStats from './PredictionStats.js'
import prisma from './prismaClient.js'


const Owner = {

  async upcomingGames(ownerId, addDays = 0) {

    // for development, using April 11, 12, 13 for getting events
    // let startOfDay = new Date('2023-04-11T03:00:00.000Z')

    let startOfDay = new Date()
    startOfDay.setDate(startOfDay.getDate() + Number(addDays))
    startOfDay.setHours(0,0,0,0) // comment out for development
    let endOfDay = new Date(startOfDay.getTime())
    endOfDay.setHours(23,59,59,999)
    console.log('start and end: ', startOfDay, endOfDay)
    let histories = await prisma.ownerTeamHistory.findMany({
      where: {ownerId: ownerId, endDate: null},
      include: {
        team: {
          include: {
            homeGames: {
              where: {
                scheduledDate: {gte: startOfDay, lte: endOfDay},
              },
              orderBy: {scheduledDate: 'asc'},
              include: {awayTeam: true, predictions: {where: {ownerId: ownerId}}}
            },
            awayGames: {
              where: {
                scheduledDate: {gte: startOfDay, lte: endOfDay}
              },
              orderBy: {scheduledDate: 'asc'},
              include: {homeTeam: true, predictions: {where: {ownerId: ownerId}}}
            }
          }
        }
      }
    })

    let allGames = histories.reduce((all, history) => {
      let game = {}
      let startTime;
      let now = new Date()
      if (history.team.homeGames.length) {

        let gameId = history.team.homeGames[0].id
        let homeGame  = history.team.homeGames[0]
        startTime = history.team.homeGames[0].scheduledDate
        if ((all.hasOwnProperty(gameId) && startTime > now) && (!homeGame.predictions.length)) {
        // if ((all.hasOwnProperty(gameId)) && (!homeGame.predictions.length)) {
          let options = {
            ...all[gameId].options,
            [history.team.id + '-win']: `${history.team.name} to win`,
            [history.team.id + '-lose']: `${history.team.name} to lose`
          }
          return {...all, [gameId]: {...all[gameId], options}}
        }
        game = {
          homeTeam: history.team.name,
          awayTeam: history.team.homeGames[0].awayTeam.name,
          date: history.team.homeGames[0].scheduledDate,
          id: gameId
        }
        if (startTime > now) {
        // if (true) {
          game.options = {
            [history.team.id + '-win']: `${history.team.name} to win`, 
            [history.team.id + '-lose']: `${history.team.name} to lose` 
          }
        } 
        game.prediction = homeGame.predictions.length
        return {...all, [gameId]: game}

      } else if (history.team.awayGames.length) {

        let gameId = history.team.awayGames[0].id
        let awayGame = history.team.awayGames[0]
        startTime = history.team.awayGames[0].scheduledDate
        if ((all.hasOwnProperty(gameId) && startTime > now) && (!awayGame.predictions.length)) {
        // if ((all.hasOwnProperty(gameId)) && (!awayGame.predictions.length)) {
          let options = {
            ...all[gameId].options,
            [history.team.id + '-win']: `${history.team.name} to win`,
            [history.team.id + '-lose']: `${history.team.name} to lose`
          }
          return {...all, [gameId]: {...all[gameId], options}}
        }
        game = {
          homeTeam: history.team.awayGames[0].homeTeam.name,
          awayTeam: history.team.name,
          date: history.team.awayGames[0].scheduledDate,
          id: gameId
        }
        if (startTime > now) {
        // if (true) {
          game.options = {
            [history.team.id + '-win']: `${history.team.name} to win`, 
            [history.team.id + '-lose']: `${history.team.name} to lose` 
          }
        }
        game.prediction = awayGame.predictions.length
        return {...all, [gameId]: game}

      } else {

        return {...all}

      }

    }, {})
    return allGames

  },

  async createPredictions(ownerId, formData) {
    
    let data = []
    formData.forEach((value, eventId) => {
      if (value) {
        let [teamId, outcome] = value.split('-')
        data.push({
          ownerId,
          teamId: Number(teamId),
          eventId: Number(eventId),
          winPrediction: outcome === 'win'
        })
      }
    })

    if (data.length > 0) {
      try {
        return await prisma.prediction.createMany({
          data
        })
      } catch (error) {
        console.log('ERROR saving predictions: ', error)
        return {count: 'none, there was an error'}
      } 
    }

    return {count: 0}

  },

  async loadPredictions(ownerId, page) {

    let predictions = await this.fetchPredictions(ownerId, page)
    return this.mapPredictions(predictions)

  },

  async fetchPredictions(ownerId, page) {

    const limit = 10
    let predictions = await prisma.prediction.findMany({
      skip: page * limit,
      take: limit,
      orderBy: {id: 'desc'},
      where: {
        ownerId: ownerId
      },
      include: {
        event: {
          select: {
            eventStateId: true,
            homeTeam: true,
            awayTeam: true,
            scheduledDate: true,
            homeTeamScore: true,
            awayTeamScore: true
          }
        }
      }
    })
    return predictions
    
  },

  mapPredictions(predictions) {
    const wrong = '❌' // '&#x274C'
    const right = '✅' // '&#x2705'
    const notComplete = '⏳' // '&#x23F3'

    
    return predictions.map(prediction => {
      let teamName = (prediction.teamId === prediction.event.homeTeam.id) ?
        prediction.event.homeTeam.abbreviation :
        prediction.event.awayTeam.abbreviation

      let result = prediction.winPrediction === prediction.winOutcome ? right : wrong
      let finalScore = `${prediction.event.awayTeam.abbreviation}: ${prediction.event.awayTeamScore ?? '--'}\n${prediction.event.homeTeam.abbreviation}: ${prediction.event.homeTeamScore ?? '--'}`

      if (prediction.event.eventStateId !== 3) {
        result = notComplete  
      }  

      return {
        // date: prediction.event.scheduledDate.toDateString(),
        date: prediction.event.scheduledDate,
        prediction: `${teamName} to ${prediction.winPrediction ? 'win' : 'lose'}`,
        finalScore,
        result
      }
    })

  },

  //// Not in use ////
  async getRoster(ownerId) {
    let roster = await prisma.ownerTeamHistory.findMany({
      where: {ownerId: ownerId, endDate: null},
      select: {
        id: true,
        team: {
          select: {name: true}
        }
      }
    })

    return roster
  },

  async getRosters() {
    let ownersWithRosters = await prisma.owner.findMany({
      select: {
        id: true,
        name: true,
        ownerTeamHistory: {
          where: {endDate: null},
          select: {
            team: {
              select: {
                name: true,
                predictions: {where: {NOT: {winOutcome: null}}}
              }
            }
          }
        }
      }
    })

    for (let owner of ownersWithRosters) {
      owner.ownerTeamHistory = owner.ownerTeamHistory.map(history => {
        let newStats = new PredictionsStats({
          correct: history.team.predictions.filter(prediction => prediction.winPrediction === prediction.winOutcome).length,
          total: history.team.predictions.length
        })
        history.stats = newStats.returnParsable()
        return history
      })
    }

    return ownersWithRosters
  }

}

export default Owner