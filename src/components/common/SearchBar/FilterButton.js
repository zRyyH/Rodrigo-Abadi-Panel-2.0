// FilterButton.js
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { FilterContent } from "./FilterContent"

export function FilterButton({ filters, selectedFilters, onFilterChange, onClearFilters, removeFilter }) {
    const activeFiltersCount = Object.values(selectedFilters).flat().length

    if (filters.length === 0) return null

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Filter className="h-4 w-4" />
                    {activeFiltersCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                            {activeFiltersCount}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
                <FilterContent
                    filters={filters}
                    selectedFilters={selectedFilters}
                    onFilterChange={onFilterChange}
                    onClearFilters={onClearFilters}
                    activeFiltersCount={activeFiltersCount}
                    removeFilter={removeFilter}
                />
            </PopoverContent>
        </Popover>
    )
}