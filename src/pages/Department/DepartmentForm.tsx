import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    useToast
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import z from 'zod';
import Page from '../../components/Page';
import env from '../../utils/env';

const schema = z.object({
    name: z.string().min(3),
});

export default function DepartmentForm() {
    const { id } = useParams();
    const { data: department } = useSWR(id ? `departments/${id}` : null);
    const navigate = useNavigate();
    const toast = useToast();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (department) {
            setValue('name', department.name);
        }
    }, [department]);

    async function onSubmit(form: any) {
        const response = await fetch(
            `${env.VITE_BACKEND_URL}/departments${id ? `/${id}` : ''}`,
            {
                body: JSON.stringify(form),
                headers: { 'Content-Type': 'application/json' },
                method: id ? 'PUT' : 'POST',
            }
        );

        if (!response.ok) {
            return toast({
                status: 'error',
                title: `Something went wrong`,
                description: `Was not possible to complete your request`,
            });
        }

        toast({
            description: `${id ? 'Updated' : 'Created'} department`,
            title: 'Your request is completed successfully',
            status: 'success',
        });

        navigate('/department');
    }

    return (
        <Page title={`${id ? 'Update' : 'Create'} Department`}>
            <Stack gap={41}>
                <FormControl isRequired isInvalid={!!errors.name}>
                    <FormLabel>Department Name</FormLabel>
                    <Input type='text' {...register('name')} />
                    <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
                </FormControl>

                <Stack display='flex' flexDirection='row'>
                    <Button as={Link} to='/department'>
                        Cancel
                    </Button>
                    <Button colorScheme='facebook' onClick={handleSubmit(onSubmit)}>
                        Save
                    </Button>
                </Stack>
            </Stack>
        </Page>
    );
}
