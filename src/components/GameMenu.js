import React, { Component } from 'react'
import '../GameMenu.css'

class EndGame extends Component {

  render() {
    return (
      <div className="game-menu-container">
        <div>
          <h4 className="game-menu-header">Select a Stage</h4>
          <div className="stage-container">
            <div className="stage-box">
              <div onClick={(event) => this.props.selectedStage(event)} className="desert-heat">

                <img className="desert-heat-img" src="desert-stage-images/desert-heat.jpg" alt="Desert Heat Stage"/>
                <h3 className="stage-title">Desert Heat</h3>
              </div>
              <div onClick={(event) => this.props.selectedStage(event)} className="night-sky">
                <img className="night-sky-img" src="night-stage-images/night-sky.jpg" alt="Night Sky Stage"/>
                <h3 className="stage-title">Night Sky</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default EndGame