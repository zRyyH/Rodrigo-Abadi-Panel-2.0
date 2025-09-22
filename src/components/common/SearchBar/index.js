// SearchBar.js
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FilterButton } from "@/components/common/SearchBar/FilterButton"
import { useSearchBarFilters } from "@/components/common/SearchBar/useSearchBarFilters"

export default function SearchBar({
    placeholder = "Pesquisar...",
    searchValue = "",
    onSearchChange,
    filterConfigs = [],
    selectedFilters = {},
    onFilterChange,
    onClearFilters,
    removeFilter
}) {
    const { filters, loading } = useSearchBarFilters(filterConfigs)

    return (
        <div className="w-full space-y-3">
            <div className="flex items-center gap-2">
                <FilterButton
                    filters={filters}
                    selectedFilters={selectedFilters}
                    onFilterChange={onFilterChange}
                    onClearFilters={onClearFilters}
                    removeFilter={removeFilter}
                />
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder={placeholder}
                        value={searchValue}
                        onChange={(e) => onSearchChange?.(e.target.value)}
                        className="pl-9"
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    )
}