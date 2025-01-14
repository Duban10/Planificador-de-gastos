declare module 'react-swipeable-list' {
    import { ReactNode } from 'react';
    
    interface SwipeableListProps {
        children: ReactNode;
        fullWidth?: boolean;
        threshold?: number;
        type?: string;
    }

    interface SwipeableListItemProps {
        children: ReactNode;
        leadingActions?: ReactNode;
        trailingActions?: ReactNode;
        blockSwipe?: boolean;
        fullSwipe?: boolean;
        swipeLeft?: object;
        swipeRight?: object;
        onSwipeEnd?: () => void;
        onSwipeProgress?: (progress: number) => void;
        onSwipeStart?: () => void;
    }

    interface SwipeActionProps {
        children: ReactNode;
        onClick?: () => void;
        destructive?: boolean;
    }

    interface LeadingActionsProps {
        children: ReactNode;
    }

    interface TrailingActionsProps {
        children: ReactNode;
    }

    export function SwipeableList(props: SwipeableListProps): JSX.Element;
    export function SwipeableListItem(props: SwipeableListItemProps): JSX.Element;
    export function LeadingActions(props: LeadingActionsProps): JSX.Element;
    export function TrailingActions(props: TrailingActionsProps): JSX.Element;
    export function SwipeAction(props: SwipeActionProps): JSX.Element;
}
