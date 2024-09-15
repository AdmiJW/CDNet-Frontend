import { Badge, type BadgeProps } from '@mantine/core';

type ContainerProps = React.ComponentProps<'div'>;

type BadgesProps = {
    values: string[];
    take?: number;
    badgeProps?: BadgeProps;
    containerProps?: ContainerProps;
};

export function Badges({ values, take = 3, badgeProps, containerProps }: BadgesProps) {
    const top = values.slice(0, take);
    const rest = values.slice(take);
    const title = rest.join(', ');

    return (
        <div className="flex flex-wrap gap-1" {...containerProps}>
            {top.map((value) => (
                <Badge key={value} {...badgeProps}>
                    {value}
                </Badge>
            ))}
            {!!rest.length && (
                <Badge title={title} {...badgeProps}>
                    +{rest.length}
                </Badge>
            )}
        </div>
    );
}
