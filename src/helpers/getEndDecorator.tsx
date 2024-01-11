import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export const getEndDecorator = (show: boolean, toggleHandler: () => void) => {
  return show ? (
    <VisibilityOffIcon
      className='input_hide'
      onClick={toggleHandler}
      onTouchStart={(e) => e.preventDefault()}
    />
  ) : (
    <RemoveRedEyeIcon
      className='input_hide'
      onClick={toggleHandler}
      onTouchStart={(e) => e.preventDefault()}
    />
  );
};