import React, { useState, useEffect } from "react";
import Matrix from "matrix-component";
import "./App.css";
import {initList} from "./initList"

const Flag = () => <strong>{'|>'}</strong>
const Mine = () => <div style={{display: 'flex',alignItems: 'center', justifyContent: 'center',flexDirection: 'column', color:"red", height:'100%', width:'100%'}}>*</div>

function App() {
  const [lose, setLose] = useState(false);
  const [win, setWin] = useState(false);
  const [list, setList] = useState(
    initList()
  );
  const [flaged, setFlaged] = useState([]);
  const [selected, onSelect] = useState([]);

  useEffect(() => {}, [list, flaged, selected]);

  let params = {
    cells: {
      styles: {
        border: "2px solid black",
      },
    },
  };

  const isSelected = (rowIndex, cellIndex) => selected.some((el) => el[0]===rowIndex && el[1] === cellIndex);
  const isFlaged = (rowIndex, cellIndex) => flaged.some((el) => el[0]===rowIndex && el[1] === cellIndex);

  const select = (row, cell) => {
    if (list[row, cell] === 'mine'){
      setLose(true);
    }
    if(!isSelected(row, cell)){
      onSelect([...selected, [row, cell]])
    }
  }

  const flag = (row, cell) => {
    if(!isSelected(row, cell)){
      if(!isFlaged(row, cell)){
        setFlaged([...flaged, [row, cell]])
      }else{
        setFlaged(flaged.filter(([flagedRow, flagedCell]) => flagedRow===row && flagedCell === cell))
      }
    }
  }

  const viewList = list.map(
    (row, rowIndex) => (
      row.map(
        (cell, cellIndex) =>{
          if(isSelected(rowIndex, cellIndex))return {childs: (cell === 'mine') ? <Mine /> : cell}
          if(isFlaged(rowIndex, cellIndex)) return {childs: <Flag />}
          return {childs:<div style={{width:'100%', height:'100%'}} onClick={()=>select(rowIndex,cellIndex)}></div>}
        }
      )
    )
  )

  return(
    <>
      <header>
        <h1>Minesweeper Clone</h1>
      </header>
      <main
        style={{
          width: (99 * list[0].length) / list.length + "vmin",
          maxWidth: (700 * list[0].length) / list.length + "px",
        }}
      >
        <Matrix list={viewList} params={params} />
      </main>

   {win && <h1>You Win!</h1>}
   {lose && <h1>Game Over!</h1>}    </>)
}

export default App;
