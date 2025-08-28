class EventStats {
  constructor({wins, losses, ot, total}) {
    this.wins = wins,
    this.losses = losses,
    this.ot = ot,
    this.total = total
  }
  getTotalNhlPoints() {
    return (this.wins * 2) + this.ot
  }
  getWinPercentage() {
    return (this.wins / this.total).toFixed(3)
  }
  returnParsable() {
    return {
      wins: this.wins,
      losses: this.losses,
      ot: this.ot,
      total: this.total,
      totalNhlPoints: this.getTotalNhlPoints(),
      winPercentage: this.getWinPercentage()
    }
  }

}

export default EventStats