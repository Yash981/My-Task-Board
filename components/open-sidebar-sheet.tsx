import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetOverlay, SheetTitle } from './ui/sheet'
import { useOpenSidebar } from './use-open-sidebar';
import TaskDetails from './TaskDetails';
import Image from 'next/image';
import XIcon from '@/public/Images/close_ring_duotone-1.svg'
import { useRouter } from 'next/navigation';

type Props = {}

export const OpenSidebarSheet = (props: Props) => {
    const { isOpen, onClose } = useOpenSidebar();
    const router = useRouter();
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
        router.push(`/`);

        return () => {
            setIsMounted(false);
        }

    }, [router])
    const handleClose = () => {
        onClose();
        router.push(`/`);
    }
    return (
        <>
            <Sheet open={isOpen} onOpenChange={handleClose} >
                <SheetContent className='overflow-y-auto'>
                    <TaskDetails/>
                </SheetContent>
            </Sheet>
        </>
    )
}

