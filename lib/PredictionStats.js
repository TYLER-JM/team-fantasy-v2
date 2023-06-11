class PredictionsStats {
  constructor({correct, total}) {
      this.correct = correct
      this.total = total
    }
    getIncorrect = () => (this.total - this.correct)
    getPercentage = () => {
      if (this.total > 0) {
        return (this.correct / this.total).toFixed(3)
      }
      return '--'
    }
    getFantasyPoints = () => (this.correct * 2 - this.getIncorrect() * 2)

    returnParsable() {
      return {
        correct: this.correct,
        total: this.total,
        incorrect: this.getIncorrect(),
        percentage: this.getPercentage(),
        fantasyPoints: this.getFantasyPoints()
      }
    }
}

export default PredictionsStats