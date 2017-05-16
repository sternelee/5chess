import React, { Component } from 'react';
import './App.css';

import Chessi from './components/chessi';
import Chess from './components/chess';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isWhite: false,
      idx: 0,
      count:0,
      chessis: new Array(256).fill(0),
      chessData: new Array(225).fill(0),
      totalData: [Object.assign({},new Array(225).fill(0))]
    }
  }
  componentDidUpdate(){
    const {idx, isWhite, chessData} = this.state;
    this.judge(isWhite,idx, chessData);
  }
  playChess(e){
    const {isWhite,count, idx, chessData, totalData} = this.state;
    if(chessData[e]) return;
    let cloneData = [];
    for(let i = 0; i < chessData.length; i++){
      if(e === i){
        if(isWhite) cloneData.push(2);
        else cloneData.push(1);
      }else{
        cloneData.push(chessData[i]);
      }
    }
    let _totalData = [];
    if(totalData.length > count + 1){
      _totalData = totalData.filter((item,i) => {return i<count+1});
    }else{
    	_totalData = totalData;
    }
    this.setState({
      isWhite: !isWhite,
      chessData: cloneData,
      idx:e,
      count: count + 1,
      totalData: [..._totalData, {isWhite,idx,cloneData}]
    });
  }
  judge(isWhite,idx,chessData){
    if(!chessData[idx]) return;
    //判断该局棋盘是否赢了
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    //左右判断
    for (let i = idx; i > idx-6;) {
        if (chessData[i] !== chessData[idx]) {
            break;
        }
        i -= 1;
        count1++;
    }
    for (let i = idx; i < idx+6;) {
        i += 1;
        if (chessData[i] !== chessData[idx]) {
            break;
        }
        count1++;
    }
    //上下判断
    for (let i = idx; i >= 0;) {
        if (chessData[i] !== chessData[idx]) {
            break;
        }
        i -= 15;
        count2++;
    }
    for (let i = idx; i < 225;) {
        i += 15;
        if (chessData[i] !== chessData[idx]) {
            break;
        }
        count2++;
    }
    //左上右下判断
    for (let i = idx; i >= 0;) {
        if (chessData[i] !== chessData[idx]) {
            break;
        }
        i -= 16;
        count3++;
    }
    for (let i = idx; i < 225;) {
        i +=  16;
        if (chessData[i] !== chessData[idx]) {
            break;
        }
        count3++;
    }
    //右上左下判断
    for (let i = idx; i >= 0;) {
        if (chessData[i] !== chessData[idx]) {
            break;
        }
        i -= 14;
        count4++;
    }
    for (let i = idx; i < 225;) {
        i += 14;
        if (chessData[i] !== chessData[idx]) {
            break;
        }
        count4++;
    }
    if(count1 >= 5 || count2 >= 5 || count3 >= 5 || count4 >= 5 ){
      if(isWhite){
        alert('白子玩家赢了啦');
      }else{
        alert('黑子玩家赢了啦');
      }
    }
  }
  backGame(){
    const {count,totalData,isWhite} = this.state;
    if(count < 2) return;
    let _totalData = totalData;
    // let _totalData = totalData.filter((item,i) => {return i<count+1});
    this.setState({
      count: count - 1,
      idx: totalData[count].idx,
      chessData: totalData[count-1].cloneData,
      isWhite: !isWhite,
    });
  }
  regainGame(){
    const {count,totalData,isWhite} = this.state;
    if(count >= totalData.length - 1) return;
    let _totalData = totalData;
    this.setState({
      count: count + 1,
      idx: totalData[count+1].idx,
      chessData: totalData[count+1].cloneData,
      isWhite: !isWhite
    });
  }
  beginGame(){
    this.setState({
      isWhite: false,
      count: 0,
      idx: 0,
      chessData: new Array(225).fill(0),
      totalData: [Object.assign({},new Array(225).fill(0))]
    })
  }
  render() {
    const {chessis, chessData, isWhite} = this.state;
    return (
      <div className="App">
        <div className="tip">
            <span className={isWhite ? "black": "white"}>{ isWhite ? "黑子" : "白子"}</span>玩家下子 
        </div>
        <div className="sider">
        	<b onClick={this.backGame.bind(this)}>悔棋</b><br/><br/><br/><b onClick={this.regainGame.bind(this)}>恢复</b><br/><br/><br/><b onClick={this.beginGame.bind(this)}>重开</b>
        </div>
        <div className="game">
          <div className="bg">
            {
              chessis.map((item,i) => {
                return (
                    <Chessi key={i} />
                  )
              })
            }
          </div>
          <div className="box">
            {
              chessData.map((item,i) => {
                return(
                    <Chess key={i} cnIndex={item ? (item === 1 ? "w" : "b") : ""} playChess={this.playChess.bind(this,i)} />
                  )
              })
            }
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
