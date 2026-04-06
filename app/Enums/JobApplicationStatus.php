<?php

namespace App\Enums;

enum JobApplicationStatus: string
{
    case Applied = 'applied';
    case Interview = 'interview';
    case Offering = 'offering';
    case Accepted = 'accepted';
    case Rejected = 'rejected';

    public function label(): string
    {
        return match ($this) {
            self::Applied => 'Applied',
            self::Interview => 'Interview',
            self::Offering => 'Offering',
            self::Accepted => 'Accepted',
            self::Rejected => 'Rejected',
        };
    }

    /**
     * @return array<string, string>
     */
    public static function options(): array
    {
        return array_reduce(self::cases(), static function (array $options, self $status): array {
            $options[$status->value] = $status->label();

            return $options;
        }, []);
    }

    public static function labelFor(?string $status): ?string
    {
        return $status === null
            ? null
            : self::tryFrom($status)?->label() ?? $status;
    }
}
