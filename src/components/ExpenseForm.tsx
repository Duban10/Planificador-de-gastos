import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { useEffect, useState } from "react";
// import { Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBuget } from "../hooks/useBudget";



const ExpenseForm = () => {
    const [expense, setExpense] = useState({
        expenseName: '',
        amount: '',
        category: '',
        date: new Date() as Date | null
    })
    const [ error, setError] = useState('')
    const { dispatch, state, AmountDisponible } = useBuget()
    
    useEffect(() => {
        if (state.editExpense) {
            const expenseToEdit = state.expense.find(exp => exp.id === state.editExpense)
            if (expenseToEdit) {
                setExpense({
                    expenseName: expenseToEdit.expenseName,
                    amount: String(expenseToEdit.amount),
                    category: expenseToEdit.category,
                    date: expenseToEdit.date
                })
            }
        }
    }, [state.editExpense])
    

    


    const handleChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        
        if (name === 'amount') {
            // Solo permitir números para el campo amount
            if (/^\d*$/.test(value)) {
                setExpense({
                    ...expense,
                    [name]: value
                })
            }
        } else {
            setExpense({
                ...expense,
                [name]: value
            })
        }     
    }
    const handleChangeDate = (value: Date | null) => {
        setExpense({
            ...expense,
            date: value
        })        
    }
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            // Convertir amount a número para la validación
            const expenseData = {
                ...expense,
                amount: expense.amount === '' ? 0 : parseFloat(expense.amount)
            }
            
            if (Object.values(expenseData).includes('') || expenseData.amount === 0) {
                setError('Por favor, complete todos los campos')
                return
            }

            // Verificar si el gasto excede el presupuesto disponible
            if (state.editExpense) {
                // Obtener el gasto original que se está editando
                const originalExpense = state.expense.find(exp => exp.id === state.editExpense)
                if (originalExpense) {
                    // Calcular la diferencia entre el nuevo monto y el original
                    const difference = Number(expenseData.amount) - Number(originalExpense.amount)
                    // Verificar si la diferencia más el disponible excede el presupuesto
                    if (difference > AmountDisponible) {
                        setError('El gasto excede el presupuesto disponible')
                        return
                    }
                }
            } else {
                // Para nuevos gastos, verificar directamente contra el disponible
                if (Number(expenseData.amount) > AmountDisponible) {
                    setError('El gasto excede el presupuesto disponible')
                    return
                }
            }

            if (state.editExpense) {
                // Si estamos editando
                dispatch({
                    type: 'update-expense',
                    payload: {
                        id: state.editExpense,
                        expense: {
                            ...expenseData,
                            amount: Number(expenseData.amount)
                        }
                    }
                })
            } else {
                // Si es un nuevo gasto
                dispatch({
                    type: 'add-expense',
                    payload: {
                        expense: {
                            ...expenseData,
                            amount: Number(expenseData.amount)
                        }
                    }
                })
            }
            console.log("con submit");
           // Resetear el formulario
           setExpense({
            expenseName: '',
            amount: '',
            category: '',
            date: new Date()
           })

           // Cerrar el modal
           dispatch({type: "close-modal"})
           
    }
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-900 py-2"> {state.editExpense ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {error && <ErrorMessage>{error}</ErrorMessage> }
        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">Nombre gasto:</label>
            <input 
                type="text" 
                id="expenseName"
                placeholder="Agrega el nombre del gasto"
                className="bg-slate-100 p-2" 
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">Cantidad:</label>
            <input 
                type="text"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Añade la cantidad del gasto"
                value={expense.amount}
                name="amount"
                onChange={handleChange}
                style={{ appearance: 'textfield' }}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl">Categoria:</label>
            <select 
                id="category"
                className="bg-slate-100 p-2" 
                name="category"
                value={expense.category}
                onChange={handleChange}
            >
                <option value="">----  Seleccione  ----</option>
                {categories.map(categ => (
                    <option
                        value={categ.id}
                        key={categ.id}
                    >{categ.name}</option>
                ))}
            </select>
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">Fecha gasto:</label>
            <DatePicker 
                className="bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={(value) => handleChangeDate(value as Date)}
            />
        </div>
        <input 
            type="submit" 
            className="bg-blue-900 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={`${state.editExpense ? 'Guardar Cambios' : 'Registrar Gasto'}`}
        />
    </form>
  )
}

export default ExpenseForm
