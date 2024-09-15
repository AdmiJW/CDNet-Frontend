import {
    MRT_Localization,
    MRT_Row,
    useMantineReactTable,
    type MRT_RowData,
} from 'mantine-react-table';
import { useLang, type Lang } from '@core/i18next';
import { MRT_Localization_ZH_HANS } from './zh';

type UseTableProps<T extends MRT_RowData> = Parameters<typeof useMantineReactTable<T>>[0] & {
    rowActions?: (row: MRT_Row<T>) => React.ReactNode;
};

const localizations: Record<Lang, MRT_Localization | undefined> = {
    en: undefined,
    zh: MRT_Localization_ZH_HANS,
};

export { type MRT_ColumnDef, type MRT_SortingState } from 'mantine-react-table';

export function useTable<T extends MRT_RowData>({ ...rest }: UseTableProps<T>) {
    const lang = useLang();
    const localization = localizations[lang];

    return useMantineReactTable<T>({
        localization,
        enableColumnResizing: true,
        enableFullScreenToggle: false,
        enableColumnPinning: true,
        enableColumnOrdering: true,
        enableColumnFilters: false,
        autoResetPageIndex: false,
        enableRowActions: true,
        layoutMode: 'grid',
        positionActionsColumn: 'first',
        displayColumnDefOptions: {
            'mrt-row-actions': { header: '', size: 0 },
            'mrt-row-expand': { size: 0 },
        },
        manualFiltering: true,
        manualSorting: true,
        manualPagination: true,
        mantineTopToolbarProps: { className: 'p-3' },
        mantineTableContainerProps: { style: { overflow: 'auto', maxWidth: '100%' } },
        renderTopToolbarCustomActions: () => <div className="flex-1"></div>,
        ...rest,
    });
}
