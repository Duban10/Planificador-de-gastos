import { useMemo } from "react"
import { 
    LeadingActions,
    TrailingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
} from "react-swipeable-list"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBuget } from "../hooks/useBudget"
import "react-swipeable-list/dist/styles.css"

type ExpenseDetailProps = {
    expense : Expense
}

const ExpenseDetail = ({expense} : ExpenseDetailProps) => {

    const { dispatch } = useBuget()
    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

    const leadingActions = useMemo(() => 
        (
            
        ) => (
            <LeadingActions>
                <SwipeAction
                    renderIcon={() => <img src="/icono_ellipsis.svg" alt="icono bot n" className="w-5 h-5 mr-2" />}
                    onClick={() => handleEditExpense()}
                >
                    <span className="text-white text-center">Actualizar</span>
                </SwipeAction>
            </LeadingActions>
        ),
        []
    )
    const trailingActions = useMemo(() => 
        (
            
        ) => (
            <TrailingActions>
                <SwipeAction
                    renderIcon={() => <img src="/icono_ellipsis.svg" alt="icono bot n" className="w-5 h-5 mr-2" />}
                    onClick={() => handleRemoveExpense()}                    
                    destructive={true}
                >
                    <span className="text-white text-center">Eliminar</span>
                </SwipeAction>
            </TrailingActions>
        ),
        []
    )

    const handleEditExpense = () => {
        dispatch({
            type: 'add-id-edit-expense',
            payload: {
                id: expense.id
            }
        })
    }

    const handleRemoveExpense = () => {
        dispatch({
            type: 'remove-expense',
            payload: {
                id: expense.id
            }
        })
    }

  return (
    <SwipeableList>
    <SwipeableListItem
        maxswipe={0.3}
        leadingActions={ leadingActions() }
        trailingActions={ trailingActions() }
    >
    <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center ">
        <div>
            <img src={`/icono_${categoryInfo.icon}.svg`} alt="icono gasto" className="w-20" />
        </div>
        <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">{ formatDate( expense.date!.toString() ) }</p>
        </div>
        <AmountDisplay 
            amount={expense.amount}
        />
    </div>
    </SwipeableListItem>
    </SwipeableList>
  )
}

export default ExpenseDetail
