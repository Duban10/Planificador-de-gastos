import { createContext, ReactNode, useEffect, useMemo, useReducer } from "react"
import { BudgetActions, BudgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"


type BudgetContextProps = {
    state: BudgetState
    dispatch: React.Dispatch<BudgetActions>,
    AmountDisponible: number,
    AmountGastado: number
}

type BudgetProviderProps = {
    children: ReactNode
}


export const BudgetContext = createContext<BudgetContextProps>(null!)

// DONDE VIENES LOS DATOS ES EN EL PROVIDER
export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [ state, dispatch ] = useReducer(BudgetReducer, initialState)

    useEffect(() => {
        localStorage.setItem('expense', JSON.stringify(state.expense))
    }, [state.expense])

    
  const AmountGastado = useMemo(() => state.expense.reduce((total, exp) => total + exp.amount, 0), [state.expense])
  const AmountDisponible = state.budget - AmountGastado

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                AmountDisponible,
                AmountGastado
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}