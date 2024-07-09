import workInprogress from '@/public/Images/Time_atack_duotone.svg';
import rightIcon from '@/public/Images/Done_round_duotone.svg';
import wrongIcon from '@/public/Images/close_ring_duotone.svg';
import teaIcon from '@/public/Images/tea1.png'
import laptopIcon from '@/public/Images/laptop.png'
import messageIcon from '@/public/Images/message.png'
import gymIcon from '@/public/Images/gym.png'
import bookIcon from '@/public/Images/book.png'
import clockIcon from '@/public/Images/clock.png'

export const getStatusInfo = (status: string) => {
    switch (status) {
        case 'IN_PROGRESS':
            return { label: 'Task In Progress', src: workInprogress };
        case 'COMPLETED':
            return { label: 'Task Completed', src: rightIcon };
        case 'WONT_DO':
            return { label: "Task Won't do", src: wrongIcon };
            
        default:
            return { label: 'Task To Do', src: '' }; 
    }
};

export const getIconInfo = (icon: string) => {
    switch (icon) {
        case 'COFFEE_CUP':
            return { label: 'Tea', src: teaIcon };
        case 'OFFICE_WORK':
            return { label: 'Working on Laptop', src: laptopIcon };
        case 'MESSAGE':
            return { label: 'Message', src: messageIcon };
        case 'WEIGHT_LIFT':
            return { label: 'Gym', src: gymIcon };
        case 'BOOK':
            return { label: 'Book', src: bookIcon };
        case 'ALARM_CLOCK':
            return { label: 'Clock', src: clockIcon };
        default:
            return { label: 'Task To Do', src: '' }; 
    }
}