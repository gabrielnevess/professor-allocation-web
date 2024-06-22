import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Stack,
    useToast
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import z from 'zod';
import Page from '../../components/Page';
import { formatTime } from '../../utils/date-format.util';
import env from '../../utils/env';

interface Professor {
    id: number;
    name: string;
}

interface Course {
    id: number;
    name: string;
}

const schema = z.object({
    dayOfWeek: z.string().min(1),
    startHour: z.string().min(1),
    endHour: z.string().min(1),
    professorId: z.number().min(1),
    courseId: z.number().min(1),
});

export default function AllocationForm() {
    const { id } = useParams();
    const { data: allocation } = useSWR(id ? `allocations/${id}` : null);
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
        if (allocation) {
            setValue('dayOfWeek', allocation.dayOfWeek);
            setValue('startHour', formatTime(allocation.startHour));
            setValue('endHour', formatTime(allocation.endHour));
            setValue('professorId', allocation?.professor?.id);
            setValue('courseId', allocation?.course?.id);
        }
    }, [allocation]);

    async function onSubmit(form: any) {
        const allocationForm = {
            ...form,
            startHour: formatTime(form.startHour),
            endHour: formatTime(form.endHour)
        };

        const response = await fetch(
            `${env.VITE_BACKEND_URL}/allocations${id ? `/${id}` : ''}`,
            {
                body: JSON.stringify(allocationForm),
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
            description: `${id ? 'Updated' : 'Created'} allocation`,
            title: 'Your request is completed successfully',
            status: 'success',
        });

        navigate('/allocation');
    }

    const { data: professors = [] } = useSWR<Professor[]>('professors');
    const { data: courses = [] } = useSWR<Course[]>('courses');
    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

    return (
        <Page title={`${id ? 'Update' : 'Create'} Allocation`}>
            <Stack gap={41}>
                <FormControl isRequired>
                    <FormLabel>Day Of Week</FormLabel>
                    <Select
                        placeholder='Select...'
                        {...register('dayOfWeek')}
                        isInvalid={!!errors.dayOfWeek}
                    >
                        {daysOfWeek.map((dayOfWeek, index) => (
                            <option key={index} value={dayOfWeek}>
                                {dayOfWeek}
                            </option>
                        ))}
                    </Select>
                    <FormErrorMessage>{errors?.dayOfWeek?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.startHour}>
                    <FormLabel>Start Hour</FormLabel>
                    <Input type='time' {...register('startHour')} />
                    <FormErrorMessage>{errors?.startHour?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.endHour}>
                    <FormLabel>End Hour</FormLabel>
                    <Input type='time' {...register('endHour')} />
                    <FormErrorMessage>{errors?.endHour?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Professor</FormLabel>
                    <Select
                        placeholder='Select...'
                        {...register('professorId', { valueAsNumber: true })}
                        isInvalid={!!errors.professorId}
                    >
                        {professors.map((professor, index) => (
                            <option key={index} value={professor.id}>
                                {professor.name}
                            </option>
                        ))}
                    </Select>
                    <FormErrorMessage>{errors?.professorId?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Course</FormLabel>
                    <Select
                        placeholder='Select...'
                        {...register('courseId', { valueAsNumber: true })}
                        isInvalid={!!errors.courseId}
                    >
                        {courses.map((course, index) => (
                            <option key={index} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </Select>
                    <FormErrorMessage>{errors?.courseId?.message}</FormErrorMessage>
                </FormControl>

                <Stack display='flex' flexDirection='row'>
                    <Button as={Link} to='/allocation'>
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
