import { useMemo, useState } from "react"
import { useBuget } from "../hooks/useBudget"


const BudgetForm = () => {
    const [budget, setBudget] = useState('')
    const { dispatch } = useBuget()

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      // Solo permitir números
      if (/^\d*$/.test(value)) {
        setBudget(value)
      }
    }

    const isValid = useMemo(() => {
        const budgetNumber = Number(budget)
        return budget === '' || budgetNumber <= 0
    } , [budget])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const budgetNumber = Number(budget)
      dispatch({type:"add-budget", payload: {budget: budgetNumber}})
      localStorage.setItem('budget', budgetNumber.toString()) 
      localStorage.setItem('expense', JSON.stringify([]))
    }
        
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">Definir presupuesto</label>
            <input 
                id="budget"
                type="text" 
                className="w-full bg-white border border-gray-200 p-2" 
                placeholder="Defina tu presupuesto"
                name="budget"
                value={budget}
                onChange={handleChange}
                style={{ appearance: 'textfield' }}
            />
        </div>
        <input 
            type="submit"
            value="Definir Presupuesto"
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
            disabled={isValid}
        />
    </form>
  )
}

export default BudgetForm
