import './CloseButton.scss';
import CloseIcon from '@mui/icons-material/Close';

export const CloseButton = () => {
  return (
    <div className='close_button'>
      <CloseIcon className='close_button__icon' />
    </div>
  )
}