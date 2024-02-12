type message = { pollOptionId: string, votes: number }
type Subscriber = (message: message) => void

class VotingPubSub {
  private channels: Record<string, Subscriber[]> = {}

  subscribe(pollId: string, subscribe: Subscriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = []
    }

    this.channels[pollId].push(subscribe)
  }

  publish(pollId: string, message: message) {
    if (!this.channels[pollId]) {
      return
    }

    for (const subscriber of this.channels[pollId]) {
      subscriber(message)
    }
    // this.channels[pollId].forEach((subscriber) => {
    //   subscriber(message)
    // })
  }
}

export const voting = new VotingPubSub()