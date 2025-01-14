import { useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBuget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

function App() {

  // Anteriormente se utilizaba de esta manera pasandole el dispatch al componente pero ahora dentro del componente hijo utilizaremos el custom hook
  const { state } = useBuget()
  // console.log('state::::', state)
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  return (
    <>
      <header className="bg-blue-950 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {
          isValidBudget ?  
          <BudgetTracker />
          :
          <BudgetForm 
            // dispatch={dispatch}
          />
        }
      </div>
      <main>
        {
           isValidBudget && 
            <>
              <FilterByCategory />
              <ExpenseList />
              <ExpenseModal />
            </>
        }
      </main>
    </>
  )
}

export default App
