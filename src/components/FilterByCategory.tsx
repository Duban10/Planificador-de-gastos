import { categories } from '../data/categories'
import { useBuget } from '../hooks/useBudget'

const FilterByCategory = () => {

    const { dispatch } = useBuget()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value
        dispatch({
            type: "get-id-filter-category",
            payload: { id }
        })        
    }
    
  return (
    <div className='mt-5 w-full max-w-3xl mx-auto px-5 flex gap-7 bg-white shadow-lg p-5 rounded-lg'>
        <label htmlFor="category">Filtrar Gastos por Categoria</label>
        <select name="category" id="category" onChange={handleChange} className='flex-1'>
            <option value="">-- Todas las Categorias --</option>
            {
                categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))  
            }
        </select>
    </div>
  )
}

export default FilterByCategory