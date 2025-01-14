import { useBuget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"


const BudgetTracker = () => {
  const { state: { budget }, AmountDisponible, AmountGastado, dispatch } = useBuget()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <div className="w-56 h-56">
          <CircularProgressbar
            styles={buildStyles({
              pathColor: AmountGastado >= budget ? '#DC2626' : '#172554',
              trailColor: '#F5F5F5',
              textColor: AmountGastado >= budget ? '#DC2626' : '#172554',
              textSize: '10px',
              pathTransitionDuration: 0.5,
              strokeLinecap: 'round'
            })}
            value={(AmountGastado / budget) * 100}
            text={`${Math.round((AmountGastado / budget) * 100)}% Gastado`}
            maxValue={100}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
            type="button"
            className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
            onClick={() => dispatch({ type: 'reset-app'})}
        >
            Resetear App
        </button>
        <AmountDisplay 
            label="Presupuesto"
            amount={budget}
        />
        <AmountDisplay 
            label="Disponible"
            amount={AmountDisponible}
        />
        <AmountDisplay 
            label="Gastado"
            amount={AmountGastado}
        />
      </div>
    </div>
  )
}

export default BudgetTracker
