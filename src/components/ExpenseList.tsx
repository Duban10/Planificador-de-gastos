import { useMemo } from "react"
import { useBuget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

const ExpenseList = () => {

    const {state: {idFilterCategory, expense}} = useBuget()
    
    const expenses = useMemo(() => 
        idFilterCategory ? expense.filter(exp => exp.category === idFilterCategory) : expense
    , [expense, idFilterCategory])
    
    const isEmpty = useMemo(() => expenses.length === 0, [expenses])
    
  return (
    <div className="mt-5 w-full max-w-3xl mx-auto px-5 flex flex-col bg-white shadow-lg p-5 rounded-lg">
        {
            isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay Gastos</p> :
            ( 
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5 ">Listado de Gastos</p>
                    {
                        expenses && expenses.map(exp => 
                            <ExpenseDetail key={exp.id} expense={exp} /> 
                        )
                    }
                </>
            )
        }
    </div>
  )
}

export default ExpenseList
