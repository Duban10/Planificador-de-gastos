import { v4 as uuidv4 } from 'uuid'
import { DraftExpense, Expense } from "../types"

export type BudgetActions = 
    { type: 'add-budget', payload: {budget: number}} |
    { type: "show-modal"} |
    { type: "close-modal"} |
    { type: 'add-expense', payload: { expense: DraftExpense}} |
    { type: 'remove-expense', payload: { id: string}} |
    { type: "add-id-edit-expense", payload: { id: Expense['id'] }} |
    { type: 'update-expense', payload: { id: string, expense: DraftExpense }} |
    { type: 'reset-app' } |
    { type: 'get-id-filter-category', payload: { id: string }}

export type BudgetState = {
    budget: number
    modal: boolean
    expense: Expense[]
    editExpense?: string
    idFilterCategory?: string
}

const localStorageBudget = localStorage.getItem('budget')
const localStorageExpense = localStorage.getItem('expense')

export const initialState : BudgetState = {
    budget: localStorageBudget ? +localStorageBudget : 0,
    modal: false,
    expense: localStorageExpense ? JSON.parse(localStorageExpense) : [],
    editExpense: '',
    idFilterCategory: ''
}

const createExpense = (draftExpense: DraftExpense) : Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const BudgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {

    if (action.type === "add-budget") {

        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === "show-modal") {

        return {
            ...state,
            modal: true
        }
    }

    if (action.type === "close-modal") {

        return {
            ...state,
            modal: false,
            editExpense: ''
        }
    }

    if (action.type === "add-expense") {
        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            // expense: [...state.expense, action.payload.expense]
            expense: [...state.expense, expense ]
        }
    }

    if (action.type === "remove-expense") {
        return {
            ...state,
            expense: state.expense.filter(exp => exp.id !== action.payload.id)
        }
    }
    if (action.type === "add-id-edit-expense") {
        console.log("actualizar-expense", action.payload.id);        
        return {
            ...state,
            editExpense: action.payload.id,
            modal: true
        }        
    }
    if (action.type === "update-expense") {
        const updatedExpenses = state.expense.map(exp => 
            exp.id === action.payload.id 
                ? { ...createExpense(action.payload.expense), id: action.payload.id }
                : exp
        )
        return {
            ...state,
            expense: updatedExpenses,
            editExpense: '',
            modal: false
        }
    }
    if (action.type === "reset-app") {
        return {
            ...state,
            budget: 0,
            modal: false,
            expense: [],
            editExpense: ''
        }
    }
    if (action.type === "get-id-filter-category") {        
        return {
            ...state,
            idFilterCategory: action.payload.id
        }
    }
    

    return state
}