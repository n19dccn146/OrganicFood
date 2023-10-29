import { IconAlertCircle } from '@tabler/icons';
import React from 'react';
import { FieldError } from 'react-hook-form';
import Flex from '../flex';

type Props = {
  text: string | React.ReactNode | FieldError | any;
};

const ErrorText = ({ text }: Props) => {
  return (
    <Flex className="mt-[10px] gap-1" alignItem="center">
      <IconAlertCircle className="text-error" size={18} />
      <p className="text-[14px] text-error">{text}</p>
    </Flex>
  );
};

export default ErrorText;
