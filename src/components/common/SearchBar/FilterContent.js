import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function FilterContent({ filters, selectedFilters, onFilterChange, onClearFilters, activeFiltersCount, removeFilter }) {
    const renderFilter = (filter) => {
        const currentValue = selectedFilters[filter.key]

        if (filter.type === 'checkbox') {
            return (
                <div className="space-y-2">
                    {filter.options?.map(option => (
                        <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                                id={`${filter.key}-${option.value}`}
                                checked={Array.isArray(currentValue) && currentValue.includes(option.value)}
                                onCheckedChange={(checked) => {
                                    const currentArray = Array.isArray(currentValue) ? currentValue : []
                                    const updated = checked
                                        ? [...currentArray, option.value]
                                        : currentArray.filter(v => v !== option.value)
                                    onFilterChange(filter.key, updated)
                                }}
                            />
                            <label htmlFor={`${filter.key}-${option.value}`} className="text-sm cursor-pointer">
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            )
        }

        if (filter.type === 'select') {
            return (
                <div className="space-y-2">
                    <Select
                        value={currentValue || ""}
                        onValueChange={(value) => onFilterChange(filter.key, value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={filter.placeholder || "Selecione..."} />
                        </SelectTrigger>
                        <SelectContent>
                            {filter.options?.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {currentValue && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                removeFilter(filter.key);
                            }}
                            className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                        >
                            Limpar este filtro
                        </Button>
                    )}
                </div>
            )
        }

        return null
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="font-medium">Filtros</h4>
                {activeFiltersCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                    >
                        Limpar todos
                    </Button>
                )}
            </div>

            {filters.map((filter, index) => (
                <div key={filter.key}>
                    <label className="text-sm font-medium mb-3 block">
                        {filter.label}
                    </label>
                    {renderFilter(filter)}
                    {index < filters.length - 1 && <Separator className="mt-4" />}
                </div>
            ))}
        </div>
    )
}