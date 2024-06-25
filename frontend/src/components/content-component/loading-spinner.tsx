import React from 'react';
import './loading-spinner.scss'
import { CircularProgress } from '@mui/material';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner-overlay">
      {/* Adapted From https://github.com/mui/material-ui/issues/9496#issuecomment-959408221 */}
        <React.Fragment>
          <svg width={0} height={0}>
            <defs>
              <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(37, 244, 238)" />
                <stop offset="100%" stopColor="rgb(254, 44, 85)" />
              </linearGradient>
            </defs>
          </svg>
          <CircularProgress 
            className='custom-circular-progress'
            sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} 
            thickness={5}
            size={100}
            />
        </React.Fragment>
    </div>
  );
};

export default LoadingSpinner;
