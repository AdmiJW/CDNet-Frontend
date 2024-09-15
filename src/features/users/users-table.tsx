import { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { axios } from '@core/axios';
import { Table, useTable, type MRT_ColumnDef, type MRT_SortingState } from '@core/components/table';
import { Title, Content } from '@core/components/page';
import { Badges } from '@core/components/badges';
import { IconTrash, IconEdit, IconUsers, IconPlus } from '@tabler/icons-react';
import { useTitle } from '@core/hooks';
import { type PaginatedList } from '@core/paginated-list';
import { type User } from './user';
import { CreateUser } from './create';
import { UpdateUser } from './update';
import { DeleteUser } from './delete';

export function UsersTable() {
    useTitle('Users');

    const { t: tc } = useTranslation(undefined, { keyPrefix: 'common' });
    const { t } = useTranslation(undefined, { keyPrefix: 'users' });

    // Search, pagination, and sorting
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const firstSorting = sorting.length ? sorting[0] : { id: 'id', desc: false };
    const { id: sort, desc } = firstSorting;
    const { pageIndex: page, pageSize } = pagination;

    // CRUD Modals
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [updateUserID, setUpdateUserID] = useState<number | null>(null);
    const [deleteUser, setDeleteUser] = useState<User | null>(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ['users', search, sort, desc, page, pageSize],
        queryFn: async () => {
            const res = await axios.get<PaginatedList<User>>('/users', {
                params: { search, sort, desc, page: page + 1, pageSize },
            });
            const data = res.data;
            return data;
        },
    });

    useEffect(() => {
        if (!error) return;
        notifications.show({ message: t('errorGetUsers'), color: 'red' });
    }, [error, t]);

    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            { header: tc('id'), accessorKey: 'id' },
            { header: tc('username'), accessorKey: 'username' },
            { header: tc('email'), accessorKey: 'email' },
            { header: tc('phone'), accessorKey: 'phone' },
            {
                header: tc('skills'),
                accessorKey: 'skills',
                enableSorting: false,
                Cell: ({ row }) => (
                    <Badges values={row.original.skills} badgeProps={{ color: 'blue' }} />
                ),
            },
            {
                header: tc('hobbies'),
                accessorKey: 'hobbies',
                enableSorting: false,
                Cell: ({ row }) => (
                    <Badges values={row.original.hobbies} badgeProps={{ color: 'green' }} />
                ),
            },
        ],
        [tc]
    );
    const table = useTable({
        columns,
        data: data?.items || [],
        state: { isLoading, globalFilter: search, sorting, pagination },
        rowCount: data?.totalCount || 0,
        onGlobalFilterChange: setSearch,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        renderTopToolbarCustomActions: () => (
            <Button
                className="mr-auto"
                variant="subtle"
                onClick={() => setCreateOpen(true)}
                leftSection={<IconPlus size={18} />}
            >
                {tc('create')}
            </Button>
        ),
        renderRowActionMenuItems: ({ row }) => (
            <>
                <Menu.Item
                    onClick={() => setUpdateUserID(row.original.id)}
                    leftSection={<IconEdit size={18} />}
                >
                    {tc('update')}
                </Menu.Item>
                <Menu.Item
                    onClick={() => setDeleteUser(row.original)}
                    color="red"
                    leftSection={<IconTrash size={18} />}
                >
                    {tc('delete')}
                </Menu.Item>
            </>
        ),
    });

    return (
        <>
            <Title>
                <IconUsers style={{ marginRight: 5 }} />
                {tc('users')}
            </Title>
            <Content>
                <Table table={table} />
            </Content>

            <CreateUser onClose={() => setCreateOpen(false)} opened={isCreateOpen} />
            <UpdateUser onClose={() => setUpdateUserID(null)} userID={updateUserID} />
            <DeleteUser onClose={() => setDeleteUser(null)} user={deleteUser} />
        </>
    );
}
