import React from "react"
import { LineChart, Line, Tooltip, YAxis, XAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import openGdaxWebsocket from "../gdax-websocket"

class App extends React.Component {

  state = {
    tickerMessages: []
  }

  componentDidMount() {
    this.websocket = openGdaxWebsocket("BTC-EUR", this.handleNewTickerMessage)
  }

  componentWillUnmount() {
    this.websocket.close()
  }

  handleNewTickerMessage = newTickerMessage => {
    this.setState(previousState => ({
      tickerMessages: previousState.tickerMessages.concat([newTickerMessage])
    }))
  }

  render() {
    return (
      <div id="bitcoinChart">
        <ResponsiveContainer width="100%" height={500} >
          <LineChart
            data={this.state.tickerMessages}>
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              name="Price"
              stroke="#7360FB"
              animationEasing="ease-in"
              activeDot={{ r: 7 }} />
            <CartesianGrid
              stroke="#ACC3A6"
              strokeDasharray="3 3" />
            <YAxis
              type="number"
              domain={["dataMin - 0.5", "dataMax + 0.5"]}
              allowDecimals={false} />
            <XAxis
              dataKey="time"
              tickFormatter="time" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

}

export default App
