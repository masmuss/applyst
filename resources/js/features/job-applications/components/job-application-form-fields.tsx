import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { JobApplicationStatusSelectOptions } from '@/features/job-applications/components/job-application-status';
import type {
    JobApplicationStatus,
    JobApplicationStatusLabels,
} from '@/features/job-applications/types';

type JobApplicationFormErrors = {
    company_name?: string;
    position?: string;
    status?: string;
    applied_at?: string;
    source?: string;
    job_url?: string;
    notes?: string;
};

type JobApplicationFormDefaults = {
    company_name?: string;
    position?: string;
    status?: JobApplicationStatus;
    applied_at?: string;
    source?: string | null;
    job_url?: string | null;
    notes?: string | null;
};

type Props = {
    statuses: JobApplicationStatusLabels;
    errors: JobApplicationFormErrors;
    defaults?: JobApplicationFormDefaults;
    idSuffix?: string;
    requireCoreFields?: boolean;
};

function normalizeDateInput(value?: string): string | undefined {
    if (!value) {
        return undefined;
    }

    return value.includes('T') ? value.split('T')[0] : value;
}

export function JobApplicationFormFields({
    statuses,
    errors,
    defaults,
    idSuffix = '',
    requireCoreFields = false,
}: Props) {
    return (
        <FieldGroup className="grid gap-4 md:grid-cols-2">
            <Field>
                <FieldContent>
                    <FieldLabel htmlFor={`company_name${idSuffix}`}>
                        Company name
                    </FieldLabel>
                    <Input
                        id={`company_name${idSuffix}`}
                        name="company_name"
                        defaultValue={defaults?.company_name}
                        placeholder="Nusantara Tech"
                        autoComplete="organization"
                        required={requireCoreFields}
                        aria-invalid={Boolean(errors.company_name)}
                    />
                    <FieldError>{errors.company_name}</FieldError>
                </FieldContent>
            </Field>

            <Field>
                <FieldContent>
                    <FieldLabel htmlFor={`position${idSuffix}`}>
                        Position
                    </FieldLabel>
                    <Input
                        id={`position${idSuffix}`}
                        name="position"
                        defaultValue={defaults?.position}
                        placeholder="Frontend Engineer"
                        autoComplete="off"
                        required={requireCoreFields}
                        aria-invalid={Boolean(errors.position)}
                    />
                    <FieldError>{errors.position}</FieldError>
                </FieldContent>
            </Field>

            <Field>
                <FieldContent>
                    <FieldLabel htmlFor={`status${idSuffix}`}>
                        Status
                    </FieldLabel>
                    <Select
                        name="status"
                        defaultValue={defaults?.status}
                        required={requireCoreFields}
                        aria-invalid={Boolean(errors.status)}
                    >
                        <SelectTrigger
                            id={`status${idSuffix}`}
                            className="w-full"
                        >
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <JobApplicationStatusSelectOptions
                                statuses={statuses}
                            />
                        </SelectContent>
                    </Select>
                    <FieldError>{errors.status}</FieldError>
                </FieldContent>
            </Field>

            <Field>
                <FieldContent>
                    <FieldLabel htmlFor={`applied_at${idSuffix}`}>
                        Applied at
                    </FieldLabel>
                    <Input
                        id={`applied_at${idSuffix}`}
                        name="applied_at"
                        type="date"
                        defaultValue={normalizeDateInput(defaults?.applied_at)}
                        aria-invalid={Boolean(errors.applied_at)}
                    />
                    <FieldError>{errors.applied_at}</FieldError>
                </FieldContent>
            </Field>

            <Field>
                <FieldContent>
                    <FieldLabel htmlFor={`source${idSuffix}`}>
                        Source
                    </FieldLabel>
                    <Input
                        id={`source${idSuffix}`}
                        name="source"
                        defaultValue={defaults?.source ?? ''}
                        placeholder="LinkedIn, referral, company site"
                        aria-invalid={Boolean(errors.source)}
                    />
                    <FieldError>{errors.source}</FieldError>
                </FieldContent>
            </Field>

            <Field>
                <FieldContent>
                    <FieldLabel htmlFor={`job_url${idSuffix}`}>
                        Job URL
                    </FieldLabel>
                    <Input
                        id={`job_url${idSuffix}`}
                        name="job_url"
                        type="url"
                        defaultValue={defaults?.job_url ?? ''}
                        placeholder="https://..."
                        aria-invalid={Boolean(errors.job_url)}
                    />
                    <FieldError>{errors.job_url}</FieldError>
                </FieldContent>
            </Field>

            <Field className="md:col-span-2">
                <FieldContent>
                    <FieldLabel htmlFor={`notes${idSuffix}`}>Notes</FieldLabel>
                    <Textarea
                        id={`notes${idSuffix}`}
                        name="notes"
                        defaultValue={defaults?.notes ?? ''}
                        placeholder="Follow-up date, contact name, interview notes, and so on."
                        className="min-h-28"
                    />
                    <FieldError>{errors.notes}</FieldError>
                </FieldContent>
            </Field>
        </FieldGroup>
    );
}
