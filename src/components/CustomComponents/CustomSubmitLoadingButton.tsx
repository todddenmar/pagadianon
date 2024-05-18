import { LoaderCircleIcon } from 'lucide-react';
import React from 'react';
import CustomButton from './CustomButton';
import { Button } from '../ui/button';

function CustomSubmitLoadingButton({
  isLoading,
  setClose,
  text,
}: {
  isLoading: boolean;
  setClose: () => void;
  text: string;
}) {
  return isLoading ? (
    <div className="w-full h-[50px] flex flex-col items-center justify-center pt-5">
      <span>
        <LoaderCircleIcon className="animate-spin" />
      </span>
    </div>
  ) : (
    <div className="w-full grid grid-cols-2 gap-5 pt-5">
      <Button
        onClick={(e) => {
          e.preventDefault();
          setClose();
        }}
        variant={'secondary'}
      >
        Cancel
      </Button>
      <CustomButton
        className="bg-highlight hover:bg-highlight_hover"
        type="submit"
      >
        {text}
      </CustomButton>
    </div>
  );
}

export default CustomSubmitLoadingButton;
