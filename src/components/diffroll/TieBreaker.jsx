import React from "react";

const TieBreaker = ({ list, forWin, onClick }) => {
  const [selected, setSelected] = React.useState();

  function computeResult() {
    const result = list[Math.floor(Math.random() * list.length)];

    setSelected(result);
  }

  const sentence = forWin ? (
    <>
      have to roll for the win <i className="fa-solid fa-trophy" />
    </>
  ) : (
    <>
      have to decide who loses <i className="fa-solid fa-poo" />
    </>
  );

  function finish() {
    onClick(selected);
    setSelected(null);
  }

  return (
    <React.Fragment>
      <h2>
        TIEBREAK <i className="fa-solid fa-khanda" />
      </h2>

      {selected ? (
        <React.Fragment>
          <div>{`The ${forWin ? "winner" : "loser"} is`}</div>
          <div className={forWin ? "trophy" : "skull"}>
            <em>{selected?.name}</em>
          </div>
          <button onClick={finish}>OK</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div>
            {list.map(person => (
              <div key={person.id}>
                <em>{person.name}</em>
              </div>
            ))}
            <div>{sentence}</div>
          </div>

          <button onClick={computeResult}>
            Roll <i className="fa-solid fa-dice" />
          </button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TieBreaker;
