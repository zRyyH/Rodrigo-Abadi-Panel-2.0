// useSearchBarFilters.js
import { useState, useEffect, useMemo } from 'react'
import DirectusBaseService from '@/services/base'

export const useSearchBarFilters = (filterConfigs) => {
    const [filters, setFilters] = useState([])
    const [loading, setLoading] = useState(false)

    const configsKey = useMemo(() =>
        JSON.stringify(filterConfigs), [filterConfigs]
    )

    useEffect(() => {
        const loadAllFilters = async () => {
            if (!filterConfigs.length) {
                setFilters(prev => prev.length === 0 ? prev : [])
                return
            }

            setLoading(true)

            try {
                const loadedFilters = await Promise.all(
                    filterConfigs.map(async (config) => {
                        if (!config.collection) return config

                        const service = new DirectusBaseService(config.collection)

                        try {
                            const response = await service.readItems(
                                buildQueryParams(config)
                            )

                            return {
                                ...config,
                                options: processResponseData(response.data.data, config)
                            }
                        } catch (error) {
                            console.error(`Erro ao carregar opções para ${config.key}:`, error)
                            return { ...config, options: [] }
                        }
                    })
                )

                setFilters(loadedFilters)
            } catch (error) {
                console.error('Erro ao carregar filtros:', error)
                setFilters([])
            } finally {
                setLoading(false)
            }
        }

        loadAllFilters()
    }, [configsKey])

    return { filters, loading }
}

const buildQueryParams = (config) => {
    const baseParams = {
        fields: getFields(config),
        limit: -1,
        sort: config.sort ? [config.sort] : [config.labelField || config.valueField]
    }

    if (config.distinct) {
        return {
            ...baseParams,
            groupBy: [config.labelField],
            aggregate: { min: [config.valueField] }
        }
    }

    return baseParams
}

const getFields = (config) => {
    if (!config.labelField || config.labelField === config.valueField) {
        return [config.valueField]
    }
    return [config.valueField, config.labelField]
}

const processResponseData = (data, config) => {
    const filterField = config.distinct ? config.labelField : config.valueField
    const valueField = config.distinct ? config.labelField : config.valueField
    const labelField = config.distinct ? config.labelField : config.labelField

    return data
        .filter(item => item[filterField] != null && item[filterField] !== '')
        .map(item => ({
            value: item[valueField],
            label: item[labelField] || item[valueField]
        }))
}