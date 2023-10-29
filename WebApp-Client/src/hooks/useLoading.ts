import React from 'react';

const useLoading = () => {
  const [loading, setLoading] = React.useState(false);

  const showUILoading = (time: number) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, time);
  };

  return {
    loading,
    setLoading,
    showUILoading,
  };
};

export default useLoading;
