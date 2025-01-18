import React, { useMemo } from 'react';
import useMyPet from '../../../hooks/useMyPet';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { flexRender } from '@tanstack/react-table';
import {
    useReactTable,
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const MyAddedPets = () => {
    const [myPets, refetch] = useMyPet();
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/pets/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "Your pet has been deleted.", "success");
                        }
                    })
                    .catch(err => {
                        Swal.fire("Error!", "An error occurred while deleting the pet.", "error");
                    });
            }
        });
    };

    const columns = useMemo(() => [
        columnHelper.accessor((_, index) => index + 1, {
            id: 'sl',
            header: 'Sl',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('imageUrl', {
            header: 'Pet Image',
            cell: info => (
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img src={info.getValue()} alt="Pet" />
                        </div>
                    </div>
                </div>
            ),
        }),
        columnHelper.accessor('name', {
            header: 'Pet Name',
        }),
        columnHelper.accessor('category', {
            header: 'Pet Category',
        }),
        columnHelper.accessor('adopted', {
            header: 'Adoption Status',
            cell: info => info.getValue() ? "Adopted" : "Available for Adoption",
        }),
        columnHelper.accessor('_id', {
            header: 'Action',
            cell: info => (
                <button onClick={() => handleDelete(info.getValue())} className="btn btn-ghost btn-lg">
                    <FaTrash className='text-red-500' />
                </button>
            ),
        }),
    ], []);

    const table = useReactTable({
        data: myPets,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <section>
            <SectionTitle
                heading="My Added Pets"
                subHeading="A Heartfelt Journey of Companionship and Care"
            />
            <div className="overflow-x-auto">
                <table className="table">
                <thead>
    {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    {header.isPlaceholder ? null : (
                        <>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <span>
                                {header.column.getIsSorted()
                                    ? header.column.getIsSorted() === 'desc'
                                        ? ' 🔽'
                                        : ' 🔼'
                                    : ''}
                            </span>
                        </>
                    )}
                </th>
            ))}
        </tr>
    ))}
</thead>

                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>{cell.renderCell()}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MyAddedPets;
