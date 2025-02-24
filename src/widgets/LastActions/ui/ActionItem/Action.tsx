import Row from '@components/Row';
import { format } from 'date-fns';
import React from 'react'

interface ActionItemProps {
  date: number;
  message: string;
}

export const ActionItem: React.FC<ActionItemProps> = ({
  date,
  message
}) => {
  const currentDate = new Date(date)
  const stringDate = format(currentDate, 'd MMMM')
  const stringTime = currentDate.toLocaleTimeString()
  return (
    <Row alignItems='center' className='text-sm justify-end'>
        <span className='font-bold'>{stringDate}</span>
        <span className='font-bold text-[#269ACF]'>{stringTime}</span>
        <span className='text-[#313E44]'>{message}</span>
    </Row>
  )
}
